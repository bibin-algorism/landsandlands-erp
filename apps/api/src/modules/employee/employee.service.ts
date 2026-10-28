import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PasswordHashService } from '../../common/security/password-hash.service';
import type { SessionUser } from '../../common/guards/session.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { SubmitSecondDocDto } from './dto/submit-second-doc.dto';
import {
  UserStatus,
  UserRole,
  EmployeeBackground,
  EmployeeRole,
  EmploymentStatus,
  PreviousOrgDocStatus,
  QualificationLevel,
  Prisma,
} from '@prisma/client';
import { AuditAction, AuditEntityType } from '@landsandlands/shared';
import { AuditService } from '../audit/audit.service';
import { FilesService } from '../files/files.service';
import { AccessLevel, EmployeeAccessService, Viewer } from './access/employee-access.service';
import { EMPLOYEE_AGGREGATE_INCLUDE, EmployeeAggregate, byIdOrCode } from './employee-aggregate';
import { employeeDocuments, isActive, toEmployeeView } from './employee-view';
import { systemRoleFor } from './fields/system-role';
import * as crypto from 'crypto';

/** FR-01 / FR-24: roles that onboard and directly edit employees. */
export const HR_EDITOR_ROLES: UserRole[] = [UserRole.HR_ADMIN, UserRole.SUPER_ADMIN];

const DAY_MS = 24 * 60 * 60 * 1000;

/** Qualification levels in ascending order (FR-05). */
const QUALIFICATION_LADDER: QualificationLevel[] = [
  QualificationLevel.NONE,
  QualificationLevel.TENTH,
  QualificationLevel.TWELFTH,
  QualificationLevel.UG_DEGREE,
  QualificationLevel.PG_DEGREE,
];

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHashService: PasswordHashService,
    private readonly auditService: AuditService,
    private readonly files: FilesService,
    private readonly access: EmployeeAccessService,
  ) {}

  /**
   * Helper: Generate unique LL-XXXXX Employee ID
   */
  private async generateUniqueEmployeeCode(): Promise<string> {
    let isUnique = false;
    let code = '';
    while (!isUnique) {
      const randomSegment = crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 5);
      code = `LL-${randomSegment}`;
      const existing = await this.prisma.employee.findUnique({
        where: { employeeId: code },
      });
      if (!existing) {
        isUnique = true;
      }
    }
    return code;
  }

  /**
   * Helper: Generate a one-time temporary password the employee must change on first login.
   */
  private generateTemporaryPassword(): string {
    const sets = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnpqrstuvwxyz', '23456789', '@#$%&*!'];
    const all = sets.join('');
    const chars = sets.map((set) => set[crypto.randomInt(set.length)]);
    while (chars.length < 12) {
      chars.push(all[crypto.randomInt(all.length)]);
    }
    for (let i = chars.length - 1; i > 0; i--) {
      const j = crypto.randomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  }

  /**
   * Cross-field onboarding rules that DTO decorators cannot express (BR-05, BR-07, BR-09, FR-05).
   */
  private async assertOnboardingRules(dto: CreateEmployeeDto) {
    const errors: string[] = [];
    const joiningDate = new Date(dto.joiningDate);

    if (new Date(dto.dateOfBirth) >= joiningDate) {
      errors.push('dateOfBirth must be before the joining date');
    }

    // FR-05: documents for the highest qualification and every one below it
    const requiredLevels: QualificationLevel[] = QUALIFICATION_LADDER.slice(
      1,
      QUALIFICATION_LADDER.indexOf(dto.highestQualification) + 1,
    );
    const providedLevels: QualificationLevel[] = dto.educationalDocuments.map(
      (doc) => doc.qualificationLevel,
    );
    const missing = requiredLevels.filter((level) => !providedLevels.includes(level));
    const unexpected = providedLevels.filter(
      (level, i) => !requiredLevels.includes(level) || providedLevels.indexOf(level) !== i,
    );
    if (missing.length) errors.push(`educationalDocuments is missing: ${missing.join(', ')}`);
    if (unexpected.length) errors.push(`educationalDocuments has unexpected or duplicate entries: ${unexpected.join(', ')}`);

    // BR-05: previous organisation records
    const hasRelieving = !!dto.relievingExperienceUrl;
    const hasPayslips = !!dto.salarySlipUrl;
    if (dto.employeeBackground === EmployeeBackground.EXPERIENCED) {
      if (dto.previousOrgDocStatus === PreviousOrgDocStatus.BOTH && !(hasRelieving && hasPayslips)) {
        errors.push('Both the relieving letter and the payslips are required when previousOrgDocStatus is BOTH');
      }
      if (dto.previousOrgDocStatus === PreviousOrgDocStatus.ONE) {
        if (hasRelieving === hasPayslips) {
          errors.push('Exactly one of the relieving letter or payslips is required when previousOrgDocStatus is ONE');
        }
        const daysAfterJoining = (new Date(dto.secondDocDueDate!).getTime() - joiningDate.getTime()) / DAY_MS;
        if (daysAfterJoining < 14 || daysAfterJoining > 30) {
          errors.push('secondDocDueDate must be between 2 weeks and 1 month after the joining date');
        }
      }
    } else {
      if (hasRelieving || hasPayslips) {
        errors.push('Previous organisation documents apply only to an experienced employee');
      }
    }
    if (
      dto.recordOfIncomeUrl &&
      dto.employeeBackground !== EmployeeBackground.FREELANCER &&
      dto.employeeBackground !== EmployeeBackground.ENTREPRENEUR
    ) {
      errors.push('recordOfIncomeUrl applies only to a freelancer or entrepreneur');
    }

    // BR-09: bank + cash must add up to the take-home pay
    if (dto.bankComponent + dto.cashComponent !== dto.takeHomePayTotal) {
      errors.push('bankComponent + cashComponent must equal takeHomePayTotal');
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    // BR-07: reporting authority must be an existing, active employee
    if (dto.role === EmployeeRole.MANAGING_DIRECTOR) {
      dto.reportingAuthorityId = undefined;
    } else {
      const manager = await this.prisma.employee.findUnique({
        where: { id: dto.reportingAuthorityId },
        select: { employmentStatus: true },
      });
      if (!manager || manager.employmentStatus !== EmploymentStatus.ACTIVE) {
        throw new BadRequestException('reportingAuthorityId must be an active employee');
      }
    }

    // Risk mitigation (Section 14): no duplicate employee by Aadhaar or personal phone
    const duplicate = await this.prisma.employee.findFirst({
      where: {
        OR: [
          { documentDetail: { aadhaarNumber: dto.aadhaarNumber } },
          { communicationDetail: { personalPhone: dto.personalPhone } },
        ],
      },
      select: { employeeId: true },
    });
    if (duplicate) {
      throw new ConflictException(
        `An employee with this Aadhaar number or personal phone already exists (${duplicate.employeeId})`,
      );
    }
  }

  /**
   * Model 1: HR Direct Entry Onboarding (POST /api/v1/employees)
   * FR-03 to FR-10: every Section 8 field is captured at joining. HR-only access (FR-01) is
   * enforced by RolesGuard on the controller.
   */
  async createEmployee(dto: CreateEmployeeDto, actorUserId: string) {
    await this.assertOnboardingRules(dto);

    const employeeId = await this.generateUniqueEmployeeCode();
    const temporaryPassword = this.generateTemporaryPassword();
    const passwordHash = await this.passwordHashService.hashPassword(temporaryPassword);

    const isExperienced = dto.employeeBackground === EmployeeBackground.EXPERIENCED;
    const isIncomplete = isExperienced && dto.previousOrgDocStatus === PreviousOrgDocStatus.ONE;
    const secondDocDueDate = isIncomplete ? new Date(dto.secondDocDueDate!) : null;

    const employee = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          identifier: employeeId, // LL-XXXXX is the login identifier
          passwordHash,
          role: systemRoleFor(dto.vertical, dto.role),
          status: UserStatus.ACTIVE,
          mustChangePassword: true,
        },
      });

      const emp = await tx.employee.create({
        data: {
          userId: user.id,
          employeeId,
          firstName: dto.firstName,
          lastName: dto.lastName,
          onboardingCompletedAt: new Date(),
          createdById: actorUserId,
          lastUpdatedById: actorUserId,
          personalDetail: {
            create: {
              dateOfBirth: new Date(dto.dateOfBirth),
              gender: dto.gender,
              bloodGroup: dto.bloodGroup,
              maritalStatus: dto.maritalStatus,
              fatherName: dto.fatherName,
            },
          },
          communicationDetail: {
            create: {
              personalPhone: dto.personalPhone,
              secondaryPhone: dto.secondaryPhone,
              officialPhone: dto.officialPhone,
              personalEmail: dto.personalEmail,
              officialEmail: dto.officialEmail,
              currentAddress: dto.currentAddress,
              permanentAddress: dto.permanentAddress,
            },
          },
          emergencyContacts: {
            createMany: {
              data: dto.emergencyContacts.map((c, index) => ({
                name: c.name,
                relationship: c.relationship,
                phone: c.phone,
                isPrimary: index === 0,
              })),
            },
          },
          documentDetail: {
            create: {
              aadhaarNumber: dto.aadhaarNumber,
              aadhaarFrontUrl: dto.aadhaarFrontUrl,
              aadhaarBackUrl: dto.aadhaarBackUrl,
              drivingLicenceNumber: dto.drivingLicenceNumber,
              drivingLicenceFrontUrl: dto.drivingLicenceFrontUrl,
              drivingLicenceBackUrl: dto.drivingLicenceBackUrl,
              highestQualification: dto.highestQualification,
              employeeBackground: dto.employeeBackground,
              previousOrgDocStatus: isExperienced ? dto.previousOrgDocStatus : PreviousOrgDocStatus.NONE,
              relievingExperienceUrl: dto.relievingExperienceUrl ?? null,
              salarySlipUrl: dto.salarySlipUrl ?? null,
              secondDocDueDate,
              isIncompleteFlag: isIncomplete,
              recordOfIncomeUrl: dto.recordOfIncomeUrl ?? null,
            },
          },
          educationalDocuments: {
            createMany: {
              data: dto.educationalDocuments.map((doc) => ({
                qualificationLevel: doc.qualificationLevel,
                frontImageUrl: doc.frontImageUrl,
                backImageUrl: doc.backImageUrl,
              })),
            },
          },
          employmentDetail: {
            create: {
              vertical: dto.vertical,
              role: dto.role,
              jobType: dto.jobType,
              joiningDate: new Date(dto.joiningDate),
              reportingAuthorityId: dto.reportingAuthorityId ?? null,
            },
          },
          ...(dto.onProbation && {
            probationDetail: {
              create: {
                probationPeriod: dto.probationPeriod!,
                financialAgreement: dto.financialAgreement!,
              },
            },
          }),
          financialDetail: {
            create: {
              accountNumber: dto.accountNumber,
              accountHolderName: dto.accountHolderName,
              ifscCode: dto.ifscCode,
              branchName: dto.branchName,
              takeHomePayTotal: new Prisma.Decimal(dto.takeHomePayTotal),
              cashComponent: new Prisma.Decimal(dto.cashComponent),
              bankComponent: new Prisma.Decimal(dto.bankComponent),
              nextAppraisalWindow: new Date(dto.nextAppraisalWindow),
            },
          },
        },
        select: { id: true, employeeId: true, firstName: true, lastName: true },
      });

      // Uploads must be fresh (PENDING) and become owned by this record (BRD 8.7 #13)
      await this.files.attach(tx, [
        dto.aadhaarFrontUrl,
        dto.aadhaarBackUrl,
        dto.drivingLicenceFrontUrl,
        dto.drivingLicenceBackUrl,
        ...[dto.relievingExperienceUrl, dto.salarySlipUrl, dto.recordOfIncomeUrl].filter(
          (key): key is string => !!key,
        ),
        ...dto.educationalDocuments.flatMap((doc) => [doc.frontImageUrl, doc.backImageUrl]),
      ]);

      await this.auditService.record(tx, {
        actorUserId,
        action: AuditAction.EMPLOYEE_ONBOARDED,
        entityType: AuditEntityType.EMPLOYEE,
        entityId: emp.id,
        reason: 'Model 1 HR Direct Entry Onboarding Completed',
        metadata: { employeeCode: emp.employeeId, isIncomplete },
      });

      return emp;
    });

    // The temporary password is returned once and never stored in plain text.
    return { ...employee, isIncomplete, secondDocDueDate, temporaryPassword };
  }

  /**
   * Viewer-scoped list (BRQ-04, BRQ-14): HR/MD/COO see everyone, a Vertical Head their reporting
   * line, an employee themself. Former employees only with status=TERMINATED, for HR and the MD.
   */
  async listEmployees(user: SessionUser, query: { status?: EmploymentStatus; vertical?: string }) {
    const viewer = await this.access.viewer(user);
    const scope = await this.access.listScope(viewer, query.status ?? EmploymentStatus.ACTIVE);

    const employees = await this.prisma.employee.findMany({
      where: { AND: [scope, query.vertical ? { employmentDetail: { vertical: query.vertical } } : {}] },
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
      select: {
        id: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        employmentStatus: true,
        communicationDetail: { select: { officialEmail: true, officialPhone: true } },
        employmentDetail: { select: { vertical: true, role: true, jobType: true, joiningDate: true } },
        documentDetail: { select: { isIncompleteFlag: true, secondDocDueDate: true } },
      },
    });

    return employees.map(({ documentDetail, ...employee }) => ({
      ...employee,
      isIncomplete: documentDetail?.isIncompleteFlag ?? false,
      secondDocDueDate: documentDetail?.secondDocDueDate ?? null,
    }));
  }

  /** Load one employee the viewer may see, with their access level (404 otherwise). */
  async loadForViewer(user: SessionUser, idOrCode: string) {
    const viewer = await this.access.viewer(user);
    const employee = await this.prisma.employee.findFirst({
      where: byIdOrCode(idOrCode),
      include: EMPLOYEE_AGGREGATE_INCLUDE,
    });
    if (!employee) throw new NotFoundException('Employee not found');
    const level = await this.access.requireLevel(viewer, employee);
    return { viewer, employee, level };
  }

  /** Single employee (FR-11 to FR-14); restricted data only at FULL access. */
  async getEmployee(user: SessionUser, idOrCode: string) {
    const { viewer, employee, level } = await this.loadForViewer(user, idOrCode);
    return this.buildView(viewer, employee, level);
  }

  /** The signed-in user's own record (FR-11). */
  async getMyProfile(user: SessionUser) {
    const employee = await this.prisma.employee.findUnique({ where: { userId: user.userId }, select: { id: true } });
    if (!employee) throw new NotFoundException('No employee record is linked to this account');
    return this.getEmployee(user, employee.id);
  }

  async buildView(viewer: Viewer, employee: EmployeeAggregate, level: AccessLevel) {
    const userIds = [employee.createdById, employee.lastUpdatedById].filter((id): id is string => !!id);
    const people = await this.prisma.employee.findMany({
      where: { userId: { in: userIds } },
      select: { id: true, employeeId: true, firstName: true, lastName: true, userId: true },
    });
    const isSelf = employee.id === viewer.employeeId;
    const active = isActive(employee);
    return toEmployeeView(employee, level, {
      people: new Map(people.map(({ userId, ...p }) => [userId, p])),
      canEdit: active && !isSelf && HR_EDITOR_ROLES.includes(viewer.role),
      canRequestChange: active && isSelf,
    });
  }

  /**
   * Stream one document image. Restricted documents need FULL access (BR-13);
   * every view is written to the audit trail (BRD Section 14).
   */
  async openDocument(user: SessionUser, idOrCode: string, ref: { document?: string; key?: string }) {
    const { employee, level } = await this.loadForViewer(user, idOrCode);
    const doc = employeeDocuments(employee).find((d) =>
      ref.key ? d.key === ref.key : d.document === ref.document,
    );
    if (!doc || (doc.restricted && level !== 'FULL')) throw new NotFoundException('Document not found');

    await this.auditService.record(this.prisma, {
      actorUserId: user.userId,
      action: AuditAction.EMPLOYEE_DOCUMENT_VIEWED,
      entityType: AuditEntityType.EMPLOYEE,
      entityId: employee.id,
      metadata: { document: doc.document, restricted: doc.restricted },
    });
    return this.files.open(doc.key, `${employee.employeeId}-${doc.document}.${doc.key.split('.').pop()}`);
  }

  /**
   * Pending Onboarding Document Queue & 29-Day SLA Tracker (GET /api/v1/employees/onboarding/pending-documents)
   */
  async getPendingOnboardingDocuments() {
    const employees = await this.prisma.employee.findMany({
      where: {
        OR: [
          { documentDetail: { isIncompleteFlag: true } },
          { documentDetail: { secondDocDueDate: { not: null } } },
        ],
      },
      include: {
        documentDetail: true,
        employmentDetail: true,
        communicationDetail: true,
      },
    });

    const now = new Date();

    return employees.map((emp) => {
      const joiningDate = emp.employmentDetail?.joiningDate || emp.createdAt;
      const daysSinceJoining = Math.floor((now.getTime() - new Date(joiningDate).getTime()) / (1000 * 60 * 60 * 24));
      const dueDate = emp.documentDetail?.secondDocDueDate;
      const daysRemaining = dueDate
        ? Math.ceil((new Date(dueDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      return {
        employeeId: emp.id,
        employeeCode: emp.employeeId,
        firstName: emp.firstName,
        lastName: emp.lastName,
        officialEmail: emp.communicationDetail?.officialEmail,
        officialPhone: emp.communicationDetail?.officialPhone,
        joiningDate,
        daysSinceJoining,
        secondDocDueDate: dueDate,
        daysRemaining,
        isOverdue: daysRemaining !== null && daysRemaining < 0,
        trigger29DayNotice: daysSinceJoining >= 29 && emp.documentDetail?.isIncompleteFlag,
        documentDetailStatus: emp.documentDetail?.previousOrgDocStatus,
      };
    });
  }

  /**
   * Submit the missing previous-organisation document (BR-05, FR-07): completes the record.
   */
  async submitSecondDocument(idOrCode: string, dto: SubmitSecondDocDto, actorUserId: string) {
    const employee = await this.prisma.employee.findFirst({
      where: byIdOrCode(idOrCode),
      include: { documentDetail: true },
    });
    if (!employee?.documentDetail) throw new NotFoundException('Employee not found');

    const doc = employee.documentDetail;
    if (!doc.isIncompleteFlag || doc.previousOrgDocStatus !== PreviousOrgDocStatus.ONE) {
      throw new BadRequestException('This employee has no pending previous-organisation document');
    }
    const column = doc.relievingExperienceUrl ? 'salarySlipUrl' : 'relievingExperienceUrl';

    await this.prisma.$transaction(async (tx) => {
      await this.files.attach(tx, [dto.documentUrl]);
      await tx.employeeDocument.update({
        where: { employeeId: employee.id },
        data: {
          [column]: dto.documentUrl,
          previousOrgDocStatus: PreviousOrgDocStatus.BOTH,
          isIncompleteFlag: false,
          secondDocDueDate: null,
        },
      });
      await tx.employee.update({ where: { id: employee.id }, data: { lastUpdatedById: actorUserId } });
      await this.auditService.record(tx, {
        actorUserId,
        action: AuditAction.EMPLOYEE_SECOND_DOCUMENT_SUBMITTED,
        entityType: AuditEntityType.EMPLOYEE,
        entityId: employee.id,
        reason: 'Previous organisation document submitted',
        changes: [
          { field: 'documentation.previousOrgDocStatus', old: doc.previousOrgDocStatus, new: PreviousOrgDocStatus.BOTH },
          { field: `documentation.${column === 'salarySlipUrl' ? 'payslips' : 'relievingLetter'}`, old: null, new: dto.documentUrl },
        ],
      });
    });

    return { success: true, isIncomplete: false };
  }
}
