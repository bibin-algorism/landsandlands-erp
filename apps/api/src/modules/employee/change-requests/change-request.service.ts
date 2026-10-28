import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ChangeRequestApprover,
  ChangeRequestStatus,
  EmploymentStatus,
  Prisma,
  UserRole,
} from '@prisma/client';
import { AuditAction, AuditEntityType } from '@landsandlands/shared';
import type { SessionUser } from '../../../common/guards/session.guard';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
import { FilesService } from '../../files/files.service';
import { EmployeeAccessService } from '../access/employee-access.service';
import { EMPLOYEE_AGGREGATE_INCLUDE, EmployeeAggregate } from '../employee-aggregate';
import { EmployeeEditService, NormalizedChange } from '../edit/employee-edit.service';
import { EMPLOYEE_FIELD_MAP, isSameValue, newFileKeys } from '../fields/employee-fields';
import {
  ChangeRequestFieldsDto,
  ListChangeRequestsQueryDto,
  QueryChangeRequestDto,
  RejectChangeRequestDto,
} from './change-request.dto';

/** FR-22: 24 hours for HR's review and for the employee's reply. */
const RESPONSE_WINDOW_MS = 24 * 60 * 60 * 1000;
const OPEN_STATUSES: ChangeRequestStatus[] = [ChangeRequestStatus.PENDING_REVIEW, ChangeRequestStatus.QUERY_SENT];

const REQUEST_INCLUDE = {
  requestedFields: { orderBy: { fieldKey: 'asc' } },
  employee: { select: { id: true, employeeId: true, firstName: true, lastName: true } },
} satisfies Prisma.EmployeeChangeRequestInclude;

type RequestWithFields = Prisma.EmployeeChangeRequestGetPayload<{ include: typeof REQUEST_INCLUDE }>;

const dueIn24h = () => new Date(Date.now() + RESPONSE_WINDOW_MS);

/**
 * Employee change requests (BRQ-07 to BRQ-11, FR-16 to FR-23, BR-14, BR-16).
 * The employee raises a request on their own record; HR — or the MD for HR's own record —
 * approves, queries or rejects it. Approved values are applied through EmployeeEditService.
 */
@Injectable()
export class ChangeRequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly edit: EmployeeEditService,
    private readonly access: EmployeeAccessService,
    private readonly audit: AuditService,
    private readonly files: FilesService,
  ) {}

  // ------------------------------------------------------------------
  // Employee side
  // ------------------------------------------------------------------

  /** FR-16 to FR-18: raise a request on the caller's own record. */
  async raise(user: SessionUser, dto: ChangeRequestFieldsDto) {
    const employee = await this.ownActiveRecord(user);
    const changes = await this.validateRequestedFields(employee, dto);

    const open = await this.prisma.changeRequestField.findMany({
      where: {
        fieldKey: { in: changes.map((c) => c.field.key) },
        changeRequest: { employeeId: employee.id, status: { in: OPEN_STATUSES } },
      },
      select: { fieldKey: true },
    });
    if (open.length) {
      const labels = open.map((f) => EMPLOYEE_FIELD_MAP.get(f.fieldKey)?.label ?? f.fieldKey);
      throw new ConflictException(`An open request already covers: ${labels.join(', ')}`);
    }

    // BR-16: requests on an HR employee's own record are approved by the MD
    const routedTo = user.role === UserRole.HR_ADMIN ? ChangeRequestApprover.MD : ChangeRequestApprover.HR;
    const proofs = new Map(dto.fields.map((f) => [f.fieldKey, f.proofFileKey ?? null]));

    const request = await this.prisma.$transaction(async (tx) => {
      await this.files.attach(tx, this.uploadedKeys(changes, proofs));
      const created = await tx.employeeChangeRequest.create({
        data: {
          employeeId: employee.id,
          requestedById: user.userId,
          routedTo,
          reviewDueDate: dueIn24h(),
          requestedFields: {
            create: changes.map((c) => ({
              fieldKey: c.field.key,
              currentValue: c.oldValue as Prisma.InputJsonValue,
              proposedValue: c.newValue as Prisma.InputJsonValue,
              proofFileKey: proofs.get(c.field.key),
            })),
          },
        },
        include: REQUEST_INCLUDE,
      });
      await this.recordStep(tx, created, user.userId, AuditAction.EMPLOYEE_CHANGE_REQUEST_RAISED, null);
      return created;
    });

    return this.toView(request);
  }

  async listMine(user: SessionUser) {
    const requests = await this.prisma.employeeChangeRequest.findMany({
      where: { requestedById: user.userId },
      orderBy: { submittedAt: 'desc' },
      include: REQUEST_INCLUDE,
    });
    return requests.map((r) => this.toView(r));
  }

  /** FR-21: answer a query by updating the queried fields (value and/or proof) and resubmitting. */
  async reply(user: SessionUser, id: string, dto: ChangeRequestFieldsDto) {
    const request = await this.findRequest(id);
    if (request.requestedById !== user.userId) throw new NotFoundException('Change request not found');
    if (request.status !== ChangeRequestStatus.QUERY_SENT) {
      throw new ConflictException('Only a queried request can be resubmitted');
    }

    const queried = new Set(request.requestedFields.filter((f) => f.isQueried).map((f) => f.fieldKey));
    const notQueried = dto.fields.filter((f) => !queried.has(f.fieldKey)).map((f) => f.fieldKey);
    if (notQueried.length) {
      throw new BadRequestException(`Only queried fields can be updated: ${notQueried.join(', ')}`);
    }

    const employee = await this.ownActiveRecord(user);
    const changes = await this.validateRequestedFields(employee, dto);
    const proofs = new Map(dto.fields.map((f) => [f.fieldKey, f.proofFileKey ?? null]));

    const updated = await this.prisma.$transaction(async (tx) => {
      const previous = new Map(request.requestedFields.map((f) => [f.fieldKey, f]));
      // Keys already held by this request stay attached; only new uploads are attached now.
      const held = new Set(
        request.requestedFields.flatMap((f) => {
          const field = EMPLOYEE_FIELD_MAP.get(f.fieldKey);
          return [f.proofFileKey, ...(field?.fileKeys ? field.fileKeys(f.proposedValue) : [])];
        }),
      );
      await this.files.attach(
        tx,
        this.uploadedKeys(changes, proofs).filter((key) => !held.has(key)),
      );
      for (const change of changes) {
        await tx.changeRequestField.update({
          where: { requestId_fieldKey: { requestId: request.id, fieldKey: change.field.key } },
          data: {
            proposedValue: change.newValue as Prisma.InputJsonValue,
            proofFileKey: proofs.get(change.field.key) ?? previous.get(change.field.key)?.proofFileKey ?? null,
          },
        });
      }
      await tx.changeRequestField.updateMany({ where: { requestId: request.id }, data: { isQueried: false } });
      const resubmitted = await tx.employeeChangeRequest.update({
        where: { id: request.id },
        data: {
          status: ChangeRequestStatus.PENDING_REVIEW,
          reviewDueDate: dueIn24h(),
          employeeReplyDueDate: null,
        },
        include: REQUEST_INCLUDE,
      });
      await this.recordStep(tx, resubmitted, user.userId, AuditAction.EMPLOYEE_CHANGE_REQUEST_REPLIED, null);
      return resubmitted;
    });

    return this.toView(updated);
  }

  /** Withdraw an open request. */
  async cancel(user: SessionUser, id: string) {
    const request = await this.findRequest(id);
    if (request.requestedById !== user.userId) throw new NotFoundException('Change request not found');
    if (!OPEN_STATUSES.includes(request.status)) throw new ConflictException('This request is already closed');

    const cancelled = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.employeeChangeRequest.update({
        where: { id },
        data: { status: ChangeRequestStatus.CANCELLED, resolvedAt: new Date(), resolvedById: user.userId },
        include: REQUEST_INCLUDE,
      });
      await this.recordStep(tx, updated, user.userId, AuditAction.EMPLOYEE_CHANGE_REQUEST_CANCELLED, null);
      return updated;
    });
    return this.toView(cancelled);
  }

  // ------------------------------------------------------------------
  // Approver side (HR, or the MD for HR's own record)
  // ------------------------------------------------------------------

  /** Review queue (FR-18, FR-22). Open requests by default; overdue=true for those past 24 hours. */
  async queue(user: SessionUser, query: ListChangeRequestsQueryDto) {
    const routedTo = await this.approverQueues(user);
    const now = new Date();
    const requests = await this.prisma.employeeChangeRequest.findMany({
      where: {
        routedTo: { in: routedTo },
        status: query.status ? query.status : { in: OPEN_STATUSES },
        ...(query.overdue === 'true' && {
          OR: [
            { status: ChangeRequestStatus.PENDING_REVIEW, reviewDueDate: { lt: now } },
            { status: ChangeRequestStatus.QUERY_SENT, employeeReplyDueDate: { lt: now } },
          ],
        }),
      },
      orderBy: { reviewDueDate: 'asc' },
      include: REQUEST_INCLUDE,
    });
    return requests.map((r) => this.toView(r));
  }

  /** Request detail for its approver or the employee who raised it. */
  async detail(user: SessionUser, id: string) {
    const request = await this.findRequest(id);
    if (request.requestedById !== user.userId) await this.assertApprover(user, request);

    const employee = await this.loadEmployee(request.employeeId);
    return {
      ...this.toView(request),
      fields: this.toView(request).fields.map((f) => {
        const field = EMPLOYEE_FIELD_MAP.get(f.fieldKey);
        const liveValue = field ? field.read(employee) : null;
        return { ...f, liveValue, isStale: field ? !isSameValue(field, f.currentValue, liveValue) : false };
      }),
    };
  }

  /** FR-20: apply the proposed values; the old values move to history. */
  async approve(user: SessionUser, id: string) {
    const request = await this.findRequest(id);
    await this.assertApprover(user, request);
    if (request.status !== ChangeRequestStatus.PENDING_REVIEW) {
      throw new ConflictException('Only a request awaiting review can be approved');
    }

    const employee = await this.loadEmployee(request.employeeId);
    if (employee.employmentStatus !== EmploymentStatus.ACTIVE) {
      throw new ConflictException('Former employees cannot be edited');
    }

    // Concurrency: block if a value changed after the request was raised
    const stale = request.requestedFields.filter((f) => {
      const field = EMPLOYEE_FIELD_MAP.get(f.fieldKey)!;
      return !isSameValue(field, f.currentValue, field.read(employee));
    });
    if (stale.length) {
      const labels = stale.map((f) => EMPLOYEE_FIELD_MAP.get(f.fieldKey)?.label ?? f.fieldKey);
      throw new ConflictException(
        `These values changed after the request was raised: ${labels.join(', ')}. Query or reject the request.`,
      );
    }

    // Re-validate (e.g. an Aadhaar number taken by someone else since the request was raised)
    const changes: NormalizedChange[] = await this.edit.normalize(
      this.prisma,
      employee,
      request.requestedFields.map((f) => ({ key: f.fieldKey, value: f.proposedValue })),
      (field) => field.requestable,
    );

    const approved = await this.prisma.$transaction(async (tx) => {
      if (changes.length) {
        await this.edit.apply(tx, employee, changes, {
          actorUserId: user.userId,
          action: AuditAction.EMPLOYEE_CHANGE_REQUEST_APPROVED,
          changeSource: 'APPROVED_CHANGE_REQUEST',
          changeRequestId: request.id,
          approvedById: user.userId,
        });
      }
      const updated = await tx.employeeChangeRequest.update({
        where: { id },
        data: { status: ChangeRequestStatus.APPROVED, resolvedAt: new Date(), resolvedById: user.userId },
        include: REQUEST_INCLUDE,
      });
      await this.writeOutbox(tx, updated, 'employee.change_request.approved', user.userId);
      return updated;
    });
    return this.toView(approved);
  }

  /** FR-19 / FR-21: return named fields to the employee with a reason. */
  async query(user: SessionUser, id: string, dto: QueryChangeRequestDto) {
    const request = await this.findRequest(id);
    await this.assertApprover(user, request);
    if (request.status !== ChangeRequestStatus.PENDING_REVIEW) {
      throw new ConflictException('Only a request awaiting review can be queried');
    }
    const fieldKeys = new Set(request.requestedFields.map((f) => f.fieldKey));
    const unknown = dto.fieldKeys.filter((key) => !fieldKeys.has(key));
    if (unknown.length) throw new BadRequestException(`Not part of this request: ${unknown.join(', ')}`);

    const queried = await this.prisma.$transaction(async (tx) => {
      await tx.changeRequestField.updateMany({
        where: { requestId: id, fieldKey: { in: dto.fieldKeys } },
        data: { isQueried: true },
      });
      const updated = await tx.employeeChangeRequest.update({
        where: { id },
        data: {
          status: ChangeRequestStatus.QUERY_SENT,
          queryReason: dto.reason,
          employeeReplyDueDate: dueIn24h(),
        },
        include: REQUEST_INCLUDE,
      });
      await this.recordStep(tx, updated, user.userId, AuditAction.EMPLOYEE_CHANGE_REQUEST_QUERIED, dto.reason);
      return updated;
    });
    return this.toView(queried);
  }

  /** FR-19: refuse the request with a reason. */
  async reject(user: SessionUser, id: string, dto: RejectChangeRequestDto) {
    const request = await this.findRequest(id);
    await this.assertApprover(user, request);
    if (!OPEN_STATUSES.includes(request.status)) throw new ConflictException('This request is already closed');

    const rejected = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.employeeChangeRequest.update({
        where: { id },
        data: {
          status: ChangeRequestStatus.REJECTED,
          rejectionReason: dto.reason,
          resolvedAt: new Date(),
          resolvedById: user.userId,
        },
        include: REQUEST_INCLUDE,
      });
      await this.recordStep(tx, updated, user.userId, AuditAction.EMPLOYEE_CHANGE_REQUEST_REJECTED, dto.reason);
      return updated;
    });
    return this.toView(rejected);
  }

  /** Stream a proof or a proposed document of a request, for its approver or requester. */
  async openFile(user: SessionUser, id: string, key: string) {
    const request = await this.findRequest(id);
    if (request.requestedById !== user.userId) await this.assertApprover(user, request);
    const referenced = request.requestedFields.flatMap((f) => {
      const field = EMPLOYEE_FIELD_MAP.get(f.fieldKey);
      return [
        f.proofFileKey,
        ...(field?.fileKeys ? field.fileKeys(f.proposedValue) : []),
        ...(field?.fileKeys && f.currentValue ? field.fileKeys(f.currentValue) : []),
      ];
    });
    if (!referenced.includes(key)) throw new NotFoundException('Document not found');
    return this.files.open(key);
  }

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  private async ownActiveRecord(user: SessionUser): Promise<EmployeeAggregate> {
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.userId },
      include: EMPLOYEE_AGGREGATE_INCLUDE,
    });
    if (!employee) throw new NotFoundException('No employee record is linked to this account');
    if (employee.employmentStatus !== EmploymentStatus.ACTIVE) {
      throw new ForbiddenException('Former employees cannot request changes');
    }
    return employee;
  }

  private loadEmployee(id: string): Promise<EmployeeAggregate> {
    return this.prisma.employee.findUniqueOrThrow({ where: { id }, include: EMPLOYEE_AGGREGATE_INCLUDE });
  }

  private async findRequest(id: string): Promise<RequestWithFields> {
    const request = await this.prisma.employeeChangeRequest.findUnique({ where: { id }, include: REQUEST_INCLUDE });
    if (!request) throw new NotFoundException('Change request not found');
    return request;
  }

  /** FR-17: catalogue validation, no duplicates, a real change, proof where required. */
  private async validateRequestedFields(
    employee: EmployeeAggregate,
    dto: ChangeRequestFieldsDto,
  ): Promise<NormalizedChange[]> {
    const keys = dto.fields.map((f) => f.fieldKey);
    if (new Set(keys).size !== keys.length) throw new BadRequestException('Each field can appear only once');

    const changes = await this.edit.normalize(
      this.prisma,
      employee,
      dto.fields.map((f) => ({ key: f.fieldKey, value: f.proposedValue })),
      (field) => field.requestable,
    );

    const errors: string[] = [];
    for (const requested of dto.fields) {
      const field = EMPLOYEE_FIELD_MAP.get(requested.fieldKey)!;
      if (!changes.some((c) => c.field.key === requested.fieldKey)) {
        errors.push(`${field.label} is the same as the current value`);
      }
      if (field.requiresProof && !requested.proofFileKey) errors.push(`${field.label} needs a proof document`);
    }
    if (errors.length) throw new BadRequestException(errors);
    return changes;
  }

  private uploadedKeys(changes: NormalizedChange[], proofs: Map<string, string | null>): string[] {
    return [
      ...changes.flatMap((c) => newFileKeys(c.field, c.oldValue, c.newValue)),
      ...[...proofs.values()].filter((key): key is string => !!key),
    ];
  }

  /** Queues this user may decide; 403 for anyone who is not an approver. */
  private async approverQueues(user: SessionUser): Promise<ChangeRequestApprover[]> {
    const viewer = await this.access.viewer(user);
    if (viewer.role === UserRole.SUPER_ADMIN) return [ChangeRequestApprover.HR, ChangeRequestApprover.MD];
    const queues: ChangeRequestApprover[] = [];
    if (viewer.role === UserRole.HR_ADMIN) queues.push(ChangeRequestApprover.HR);
    if (viewer.isManagingDirector) queues.push(ChangeRequestApprover.MD);
    if (!queues.length) throw new ForbiddenException('Only HR and the MD review change requests');
    return queues;
  }

  /** BR-16: approvers act only on their queue, and no one decides their own request. */
  private async assertApprover(user: SessionUser, request: RequestWithFields): Promise<void> {
    const queues = await this.approverQueues(user).catch(() => [] as ChangeRequestApprover[]);
    if (!queues.includes(request.routedTo)) throw new NotFoundException('Change request not found');
    if (request.requestedById === user.userId) {
      throw new ForbiddenException('No one can decide a change request on their own record');
    }
  }

  /** FR-25 audit row + FR-23 notification event for one workflow step. */
  private async recordStep(
    tx: Prisma.TransactionClient,
    request: RequestWithFields,
    actorUserId: string,
    action: AuditAction,
    reason: string | null,
  ) {
    await this.audit.record(tx, {
      actorUserId,
      action,
      entityType: AuditEntityType.EMPLOYEE,
      entityId: request.employeeId,
      reason,
      metadata: {
        changeRequestId: request.id,
        fields: request.requestedFields.map((f) => f.fieldKey),
        ...(action === AuditAction.EMPLOYEE_CHANGE_REQUEST_QUERIED && {
          queriedFields: request.requestedFields.filter((f) => f.isQueried).map((f) => f.fieldKey),
        }),
      },
    });
    await this.writeOutbox(tx, request, action, actorUserId);
  }

  private async writeOutbox(
    tx: Prisma.TransactionClient,
    request: RequestWithFields,
    eventType: string,
    actorUserId: string,
  ) {
    await tx.outboxEvent.create({
      data: {
        eventType,
        aggregateType: 'EMPLOYEE_CHANGE_REQUEST',
        aggregateId: request.id,
        payload: {
          changeRequestId: request.id,
          employeeId: request.employee.employeeId,
          requestedById: request.requestedById,
          routedTo: request.routedTo,
          status: request.status,
          actorUserId,
        },
      },
    });
  }

  private toView(request: RequestWithFields) {
    const now = Date.now();
    const isOverdue =
      (request.status === ChangeRequestStatus.PENDING_REVIEW && request.reviewDueDate.getTime() < now) ||
      (request.status === ChangeRequestStatus.QUERY_SENT &&
        !!request.employeeReplyDueDate &&
        request.employeeReplyDueDate.getTime() < now);
    return {
      id: request.id,
      status: request.status,
      routedTo: request.routedTo,
      employee: request.employee,
      submittedAt: request.submittedAt,
      reviewDueDate: request.reviewDueDate,
      employeeReplyDueDate: request.employeeReplyDueDate,
      queryReason: request.queryReason,
      rejectionReason: request.rejectionReason,
      resolvedAt: request.resolvedAt,
      isOverdue,
      fields: request.requestedFields.map((f) => {
        const field = EMPLOYEE_FIELD_MAP.get(f.fieldKey);
        return {
          fieldKey: f.fieldKey,
          label: field?.label ?? f.fieldKey,
          group: field?.group ?? null,
          type: field?.type ?? null,
          options: field?.options ?? null,
          requiresProof: field?.requiresProof ?? false,
          currentValue: f.currentValue,
          proposedValue: f.proposedValue,
          proofFileKey: f.proofFileKey,
          isQueried: f.isQueried,
        };
      }),
    };
  }
}
