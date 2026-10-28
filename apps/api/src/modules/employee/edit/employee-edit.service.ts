import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChangeRequestStatus, EmployeeRole, Prisma, UserRole } from '@prisma/client';
import { AuditAction, AuditEntityType } from '@landsandlands/shared';
import type { SessionUser } from '../../../common/guards/session.guard';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';
import { FilesService } from '../../files/files.service';
import { DirectEditDto } from '../dto/direct-edit.dto';
import { EmployeeAggregate } from '../employee-aggregate';
import { EmployeeService, HR_EDITOR_ROLES } from '../employee.service';
import { isActive } from '../employee-view';
import {
  EMPLOYEE_FIELDS,
  EMPLOYEE_FIELD_MAP,
  FieldDefinition,
  isSameValue,
  newFileKeys,
} from '../fields/employee-fields';
import { FieldValueError } from '../fields/field-values';
import { systemRoleFor } from '../fields/system-role';

export type ChangeSource = 'DIRECT_HR_EDIT' | 'APPROVED_CHANGE_REQUEST';

export interface NormalizedChange {
  field: FieldDefinition;
  oldValue: unknown;
  newValue: unknown;
}

export interface ApplyContext {
  actorUserId: string;
  action: AuditAction;
  changeSource: ChangeSource;
  reason?: string | null;
  changeRequestId?: string;
  approvedById?: string;
}

/** Only RESTRICTED fields are hidden from TEAM viewers; everything else they may see. */
const isRestrictedField = (key: string) =>
  EMPLOYEE_FIELD_MAP.get(key)?.sensitivity === 'RESTRICTED' || key.startsWith('financial.');

/**
 * Validates and applies employee field changes (BR-08, BR-14, FR-20, FR-24, FR-38, FR-40).
 * Used by HR direct edits and by approved change requests.
 */
@Injectable()
export class EmployeeEditService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly employees: EmployeeService,
    private readonly audit: AuditService,
    private readonly files: FilesService,
  ) {}

  /** Catalogue entries and current values for the edit (HR) or request-a-change (self) screen. */
  async editableFields(user: SessionUser, idOrCode: string) {
    const { viewer, employee } = await this.employees.loadForViewer(user, idOrCode);
    const isSelf = employee.id === viewer.employeeId;
    if (!isActive(employee)) throw new ForbiddenException('Former employees cannot be edited');

    let mode: 'DIRECT_EDIT' | 'CHANGE_REQUEST';
    if (!isSelf && HR_EDITOR_ROLES.includes(viewer.role)) mode = 'DIRECT_EDIT';
    else if (isSelf) mode = 'CHANGE_REQUEST';
    else throw new ForbiddenException('Only HR can edit another employee');

    const openFieldKeys = new Set<string>();
    if (mode === 'CHANGE_REQUEST') {
      const open = await this.prisma.changeRequestField.findMany({
        where: {
          changeRequest: {
            employeeId: employee.id,
            status: { in: [ChangeRequestStatus.PENDING_REVIEW, ChangeRequestStatus.QUERY_SENT] },
          },
        },
        select: { fieldKey: true },
      });
      open.forEach((f) => openFieldKeys.add(f.fieldKey));
    }

    return {
      mode,
      employee: {
        id: employee.id,
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
      },
      updatedAt: employee.updatedAt,
      fields: EMPLOYEE_FIELDS.filter((f) => (mode === 'DIRECT_EDIT' ? f.hrEditable : f.requestable)).map(
        (f) => ({
          key: f.key,
          label: f.label,
          group: f.group,
          sensitivity: f.sensitivity,
          type: f.type,
          options: f.options ?? null,
          requiresProof: mode === 'CHANGE_REQUEST' && f.requiresProof,
          value: f.read(employee),
          hasOpenRequest: openFieldKeys.has(f.key),
        }),
      ),
    };
  }

  /** FR-24 / BR-16: HR edits any other active employee; changes apply immediately. */
  async directEdit(user: SessionUser, idOrCode: string, dto: DirectEditDto) {
    const { viewer, employee } = await this.employees.loadForViewer(user, idOrCode);
    if (employee.id === viewer.employeeId) {
      throw new ForbiddenException('HR cannot edit their own record; raise a change request instead (BR-16)');
    }
    if (!isActive(employee)) throw new ForbiddenException('Former employees cannot be edited');
    if (employee.updatedAt.getTime() !== new Date(dto.expectedUpdatedAt).getTime()) {
      throw new ConflictException('This record was changed by someone else. Reload it and try again.');
    }

    const changes = await this.normalize(
      this.prisma,
      employee,
      Object.entries(dto.changes).map(([key, value]) => ({ key, value })),
      (field) => field.hrEditable,
    );
    if (!changes.length) throw new BadRequestException('Nothing has changed');

    await this.prisma.$transaction(async (tx) => {
      await this.files.attach(
        tx,
        changes.flatMap((c) => newFileKeys(c.field, c.oldValue, c.newValue)),
      );
      await this.apply(tx, employee, changes, {
        actorUserId: user.userId,
        action: AuditAction.EMPLOYEE_DIRECT_EDIT,
        changeSource: 'DIRECT_HR_EDIT',
        reason: dto.reason?.trim() || null,
      });
    });

    return this.employees.getEmployee(user, employee.id);
  }

  /**
   * Validate submitted values through the catalogue. Unchanged values are dropped.
   * Throws 400 with one message per invalid field.
   */
  async normalize(
    db: Prisma.TransactionClient,
    employee: EmployeeAggregate,
    entries: { key: string; value: unknown }[],
    allowed: (field: FieldDefinition) => boolean,
  ): Promise<NormalizedChange[]> {
    const errors: string[] = [];
    const changes: NormalizedChange[] = [];

    for (const { key, value } of entries) {
      const field = EMPLOYEE_FIELD_MAP.get(key);
      if (!field || !allowed(field)) {
        errors.push(`${key}: cannot be changed this way`);
        continue;
      }
      try {
        const newValue = await field.normalize(value, { db, employee });
        const oldValue = field.read(employee);
        if (!isSameValue(field, oldValue, newValue)) changes.push({ field, oldValue, newValue });
      } catch (err) {
        if (!(err instanceof FieldValueError)) throw err;
        errors.push(`${field.label} ${err.message}`);
      }
    }

    // BR-07: everyone except the MD has a reporting authority
    const valueOf = (key: string) => {
      const change = changes.find((c) => c.field.key === key);
      return change ? change.newValue : EMPLOYEE_FIELD_MAP.get(key)!.read(employee);
    };
    const role = valueOf('employment.role') as EmployeeRole | null;
    const changesManager = changes.some((c) => c.field.key === 'employment.reportingAuthorityId');
    const changesRole = changes.some((c) => c.field.key === 'employment.role');
    if (!changesManager && !changesRole) {
      // Reporting line untouched — nothing to check.
    } else if (role === EmployeeRole.MANAGING_DIRECTOR && changesManager) {
      errors.push('Reporting authority must be empty for the Managing Director');
    } else if (role && role !== EmployeeRole.MANAGING_DIRECTOR && !valueOf('employment.reportingAuthorityId')) {
      errors.push('Reporting authority is required unless the role is Managing Director');
    }

    if (errors.length) throw new BadRequestException(errors);
    return changes;
  }

  /** Write changes, history entries, metadata, audit row and outbox event in the caller's transaction. */
  async apply(
    tx: Prisma.TransactionClient,
    employee: EmployeeAggregate,
    changes: NormalizedChange[],
    ctx: ApplyContext,
  ): Promise<void> {
    for (const change of changes) {
      await change.field.write(tx, employee, change.newValue);
      await change.field.history?.(tx, employee, change.oldValue, change.newValue);
    }

    if (changes.some((c) => c.field.affectsSystemRole) && employee.user.role !== UserRole.SUPER_ADMIN) {
      const valueOf = (key: string) =>
        (changes.find((c) => c.field.key === key)?.newValue ?? EMPLOYEE_FIELD_MAP.get(key)!.read(employee)) as string;
      await tx.user.update({
        where: { id: employee.userId },
        data: { role: systemRoleFor(valueOf('employment.vertical'), valueOf('employment.role') as EmployeeRole) },
      });
    }

    await tx.employee.update({ where: { id: employee.id }, data: { lastUpdatedById: ctx.actorUserId } });

    const fieldChanges = changes.map((c) => ({ field: c.field.key, old: c.oldValue, new: c.newValue }));
    await this.audit.record(tx, {
      actorUserId: ctx.actorUserId,
      action: ctx.action,
      entityType: AuditEntityType.EMPLOYEE,
      entityId: employee.id,
      reason: ctx.reason ?? null,
      changes: fieldChanges,
      metadata: {
        changeSource: ctx.changeSource,
        ...(ctx.changeRequestId && { changeRequestId: ctx.changeRequestId }),
        ...(ctx.approvedById && { approvedBy: ctx.approvedById }),
      },
    });

    await tx.outboxEvent.create({
      data: {
        eventType: 'employee.updated',
        aggregateType: 'EMPLOYEE',
        aggregateId: employee.id,
        payload: {
          employeeId: employee.employeeId,
          fields: changes.map((c) => c.field.key),
          changeSource: ctx.changeSource,
          changeRequestId: ctx.changeRequestId ?? null,
          actorUserId: ctx.actorUserId,
        },
      },
    });
  }

  /**
   * Field and action history (BRQ-20, FR-38, FR-39). HR, MD, COO and the employee see everything;
   * a Vertical Head sees non-restricted fields of their team (implementation plan, decision 3).
   */
  async history(user: SessionUser, idOrCode: string, field?: string) {
    const { employee, level } = await this.employees.loadForViewer(user, idOrCode);
    if (field && level === 'TEAM' && isRestrictedField(field)) {
      throw new NotFoundException('History not found');
    }

    const rows = await this.audit.listForEntity(AuditEntityType.EMPLOYEE, employee.id, { field });
    const actorIds = [...new Set(rows.map((r) => r.actorUserId).filter((id): id is string => !!id))];
    const actors = await this.prisma.employee.findMany({
      where: { userId: { in: actorIds } },
      select: { userId: true, employeeId: true, firstName: true, lastName: true },
    });
    const actorOf = (userId: string | null) => {
      const actor = actors.find((a) => a.userId === userId);
      return actor ? { employeeId: actor.employeeId, name: `${actor.firstName} ${actor.lastName}` } : null;
    };

    return rows.flatMap((row) => {
      const metadata = (row.metadata ?? {}) as Record<string, unknown>;
      if (level === 'TEAM' && row.action === AuditAction.EMPLOYEE_DOCUMENT_VIEWED) return [];
      const allChanges = (Array.isArray(row.changes) ? row.changes : []) as {
        field: string;
        old: unknown;
        new: unknown;
      }[];
      const changes = allChanges
        .filter((c) => !field || c.field === field)
        .filter((c) => level === 'FULL' || !isRestrictedField(c.field))
        .map((c) => ({ ...c, label: EMPLOYEE_FIELD_MAP.get(c.field)?.label ?? c.field }));
      if (allChanges.length && !changes.length) return [];
      return [
        {
          id: row.id,
          occurredAt: row.occurredAt,
          action: row.action,
          actor: row.actorType === 'SYSTEM' ? null : actorOf(row.actorUserId),
          reason: row.reason,
          changes,
          changeSource: (metadata.changeSource as string) ?? null,
          changeRequestId: (metadata.changeRequestId as string) ?? null,
          document: (metadata.document as string) ?? null,
        },
      ];
    });
  }
}
