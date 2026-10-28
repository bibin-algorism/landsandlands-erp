import { EmployeeRole, EmploymentStatus, JobType, Prisma } from '@prisma/client';
import {
  BLOOD_GROUPS,
  EMPLOYEE_VERTICALS,
  GENDERS,
  MARITAL_STATUSES,
} from '@landsandlands/shared';
import { EmployeeAggregate, toDateString } from '../employee-aggregate';
import * as v from './field-values';
import { FieldValueError } from './field-values';

/**
 * Catalogue of editable employee fields (BRD Section 8; docs/employee_edit_implementation_plan.md §3.1).
 * Every HR direct edit and every change request is validated and applied through these definitions.
 * Not listed, therefore never editable: Employee ID (BR-01), system data and metadata (BR-11),
 * employment status and exit details (exit flow), previous-organisation documents (second-document flow).
 */

export type FieldGroup = 'PERSONAL' | 'COMMUNICATION' | 'DOCUMENTATION' | 'EMPLOYMENT' | 'FINANCIAL';
export type Sensitivity = 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
export type FieldType =
  | 'text'
  | 'longText'
  | 'phone'
  | 'email'
  | 'date'
  | 'select'
  | 'aadhaar'
  | 'licence'
  | 'accountNumber'
  | 'ifsc'
  | 'employeeRef'
  | 'contacts'
  | 'documentPair'
  | 'education'
  | 'probation'
  | 'pay'
  | 'appraisal';

export interface FieldContext {
  db: Prisma.TransactionClient;
  employee: EmployeeAggregate;
}

export interface FieldDefinition {
  key: string;
  label: string;
  group: FieldGroup;
  sensitivity: Sensitivity;
  type: FieldType;
  options?: readonly { value: string; label: string }[];
  /** FR-24: HR may change it directly. */
  hrEditable: boolean;
  /** FR-16: the employee may request a change. */
  requestable: boolean;
  /** FR-17: a proof attachment is required with a change request. */
  requiresProof: boolean;
  /** Changing it recalculates the system access role. */
  affectsSystemRole?: boolean;
  read(employee: EmployeeAggregate): unknown;
  normalize(value: unknown, ctx: FieldContext): unknown;
  write(db: Prisma.TransactionClient, employee: EmployeeAggregate, value: any): Promise<void>;
  /** BR-08: dated history entry written alongside the change. */
  history?(db: Prisma.TransactionClient, employee: EmployeeAggregate, oldValue: any, newValue: any): Promise<void>;
  /** Whether the new value is a change at all (default: JSON equality). */
  isSame?(oldValue: any, newValue: any): boolean;
  /** Uploaded documents referenced by a value. */
  fileKeys?(value: any): string[];
}

// ------------------------------------------------------------------
// Writers
// ------------------------------------------------------------------

type DetailModel = 'employee' | 'personal' | 'communication' | 'document' | 'employment' | 'financial';

async function writeColumns(
  db: Prisma.TransactionClient,
  employee: EmployeeAggregate,
  model: DetailModel,
  data: Record<string, unknown>,
) {
  const where = { employeeId: employee.id };
  switch (model) {
    case 'employee':
      await db.employee.update({ where: { id: employee.id }, data: data as Prisma.EmployeeUpdateInput });
      return;
    case 'personal':
      await db.employeePersonalDetail.update({ where, data: data as Prisma.EmployeePersonalDetailUpdateInput });
      return;
    case 'communication':
      await db.employeeCommunicationDetail.update({
        where,
        data: data as Prisma.EmployeeCommunicationDetailUpdateInput,
      });
      return;
    case 'document':
      await db.employeeDocument.update({ where, data: data as Prisma.EmployeeDocumentUpdateInput });
      return;
    case 'employment':
      await db.employeeEmploymentDetail.update({
        where,
        data: data as Prisma.EmployeeEmploymentDetailUncheckedUpdateInput,
      });
      return;
    case 'financial':
      await db.employeeFinancialDetail.update({ where, data: data as Prisma.EmployeeFinancialDetailUpdateInput });
      return;
  }
}

const options = (values: readonly string[]) => values.map((value) => ({ value, label: value }));

const ROLE_OPTIONS = [
  { value: EmployeeRole.MANAGING_DIRECTOR, label: 'Managing Director' },
  { value: EmployeeRole.COO, label: 'COO' },
  { value: EmployeeRole.MANAGEMENT_ADMIN, label: 'Management (Administration team)' },
  { value: EmployeeRole.VERTICAL_HEAD, label: 'Vertical Head' },
  { value: EmployeeRole.EXECUTIVE, label: 'Executive' },
];

const JOB_TYPE_OPTIONS = [
  { value: JobType.PERMANENT, label: 'Permanent' },
  { value: JobType.TEMPORARY, label: 'Temporary' },
  { value: JobType.CONTRACT, label: 'Contract' },
];

interface ScalarSpec {
  key: string;
  label: string;
  group: FieldGroup;
  sensitivity: Sensitivity;
  type: FieldType;
  model: DetailModel;
  column: string;
  normalize: (value: unknown) => unknown;
  hrEditable?: boolean;
  requestable?: boolean;
  requiresProof?: boolean;
  options?: readonly { value: string; label: string }[];
  isDate?: boolean;
}

/** A field stored in one column of one detail table. */
function scalar(spec: ScalarSpec): FieldDefinition {
  const source = (e: EmployeeAggregate): Record<string, unknown> | null => {
    switch (spec.model) {
      case 'employee':
        return e as unknown as Record<string, unknown>;
      case 'personal':
        return e.personalDetail as Record<string, unknown> | null;
      case 'communication':
        return e.communicationDetail as Record<string, unknown> | null;
      case 'document':
        return e.documentDetail as Record<string, unknown> | null;
      case 'employment':
        return e.employmentDetail as Record<string, unknown> | null;
      case 'financial':
        return e.financialDetail as Record<string, unknown> | null;
    }
  };
  return {
    key: spec.key,
    label: spec.label,
    group: spec.group,
    sensitivity: spec.sensitivity,
    type: spec.type,
    options: spec.options,
    hrEditable: spec.hrEditable ?? true,
    requestable: spec.requestable ?? true,
    requiresProof: spec.requiresProof ?? false,
    read: (e) => {
      const raw = source(e)?.[spec.column];
      if (raw === undefined || raw === null) return null;
      return spec.isDate ? toDateString(raw as Date) : raw;
    },
    normalize: (value) => spec.normalize(value),
    write: (db, e, value) =>
      writeColumns(db, e, spec.model, { [spec.column]: spec.isDate ? new Date(value as string) : value }),
  };
}

/** Rejects a value already used by another employee (BRD Section 14: duplicate records). */
async function assertUnique(
  ctx: FieldContext,
  where: Prisma.EmployeeWhereInput,
  message: string,
): Promise<void> {
  const duplicate = await ctx.db.employee.findFirst({
    where: { AND: [where, { id: { not: ctx.employee.id } }] },
    select: { employeeId: true },
  });
  if (duplicate) throw new FieldValueError(`${message} (${duplicate.employeeId})`);
}

// ------------------------------------------------------------------
// Catalogue
// ------------------------------------------------------------------

export const EMPLOYEE_FIELDS: FieldDefinition[] = [
  // 8.1 Personal Identity
  scalar({ key: 'personal.firstName', label: 'First name', group: 'PERSONAL', sensitivity: 'INTERNAL', type: 'text', model: 'employee', column: 'firstName', normalize: v.text, requiresProof: true }),
  scalar({ key: 'personal.lastName', label: 'Last name', group: 'PERSONAL', sensitivity: 'INTERNAL', type: 'text', model: 'employee', column: 'lastName', normalize: v.text, requiresProof: true }),
  scalar({ key: 'personal.dateOfBirth', label: 'Date of birth', group: 'PERSONAL', sensitivity: 'CONFIDENTIAL', type: 'date', model: 'personal', column: 'dateOfBirth', normalize: v.date, isDate: true, requiresProof: true }),
  scalar({ key: 'personal.gender', label: 'Gender', group: 'PERSONAL', sensitivity: 'CONFIDENTIAL', type: 'select', model: 'personal', column: 'gender', normalize: v.oneOf(GENDERS), options: options(GENDERS) }),
  scalar({ key: 'personal.bloodGroup', label: 'Blood group', group: 'PERSONAL', sensitivity: 'CONFIDENTIAL', type: 'select', model: 'personal', column: 'bloodGroup', normalize: v.oneOf(BLOOD_GROUPS), options: options(BLOOD_GROUPS) }),
  scalar({ key: 'personal.maritalStatus', label: 'Marital status', group: 'PERSONAL', sensitivity: 'CONFIDENTIAL', type: 'select', model: 'personal', column: 'maritalStatus', normalize: v.oneOf(MARITAL_STATUSES), options: options(MARITAL_STATUSES) }),
  scalar({ key: 'personal.fatherName', label: "Father's name", group: 'PERSONAL', sensitivity: 'CONFIDENTIAL', type: 'text', model: 'personal', column: 'fatherName', normalize: v.text, requiresProof: true }),

  // 8.2 Communication Details
  {
    ...scalar({ key: 'communication.personalPhone', label: 'Personal phone', group: 'COMMUNICATION', sensitivity: 'CONFIDENTIAL', type: 'phone', model: 'communication', column: 'personalPhone', normalize: v.phone }),
    normalize: async (value, ctx) => {
      const phone = v.phone(value);
      await assertUnique(ctx, { communicationDetail: { personalPhone: phone } }, 'is already used by another employee');
      return phone;
    },
  },
  scalar({ key: 'communication.secondaryPhone', label: 'Secondary phone', group: 'COMMUNICATION', sensitivity: 'CONFIDENTIAL', type: 'phone', model: 'communication', column: 'secondaryPhone', normalize: v.phone }),
  scalar({ key: 'communication.officialPhone', label: 'Official phone', group: 'COMMUNICATION', sensitivity: 'INTERNAL', type: 'phone', model: 'communication', column: 'officialPhone', normalize: v.phone }),
  scalar({ key: 'communication.personalEmail', label: 'Personal email', group: 'COMMUNICATION', sensitivity: 'CONFIDENTIAL', type: 'email', model: 'communication', column: 'personalEmail', normalize: v.email }),
  scalar({ key: 'communication.officialEmail', label: 'Official email', group: 'COMMUNICATION', sensitivity: 'INTERNAL', type: 'email', model: 'communication', column: 'officialEmail', normalize: v.email }),
  scalar({ key: 'communication.currentAddress', label: 'Current address', group: 'COMMUNICATION', sensitivity: 'CONFIDENTIAL', type: 'longText', model: 'communication', column: 'currentAddress', normalize: v.text, requiresProof: true }),
  scalar({ key: 'communication.permanentAddress', label: 'Permanent address', group: 'COMMUNICATION', sensitivity: 'CONFIDENTIAL', type: 'longText', model: 'communication', column: 'permanentAddress', normalize: v.text, requiresProof: true }),
  {
    key: 'communication.emergencyContacts',
    label: 'Emergency contacts',
    group: 'COMMUNICATION',
    sensitivity: 'CONFIDENTIAL',
    type: 'contacts',
    hrEditable: true,
    requestable: true,
    requiresProof: false,
    read: (e) => e.emergencyContacts.map((c) => ({ name: c.name, relationship: c.relationship, phone: c.phone })),
    normalize: v.emergencyContacts,
    write: async (db, e, value: v.EmergencyContactValue[]) => {
      await db.emergencyContact.deleteMany({ where: { employeeId: e.id } });
      await db.emergencyContact.createMany({
        data: value.map((c, i) => ({ ...c, employeeId: e.id, isPrimary: i === 0 })),
      });
    },
  },

  // 8.3 Documentation
  {
    ...scalar({ key: 'documentation.aadhaarNumber', label: 'Aadhaar number', group: 'DOCUMENTATION', sensitivity: 'RESTRICTED', type: 'aadhaar', model: 'document', column: 'aadhaarNumber', normalize: v.aadhaar, requiresProof: true }),
    normalize: async (value, ctx) => {
      const aadhaar = v.aadhaar(value);
      await assertUnique(ctx, { documentDetail: { aadhaarNumber: aadhaar } }, 'is already used by another employee');
      return aadhaar;
    },
  },
  {
    key: 'documentation.aadhaarImages',
    label: 'Aadhaar images',
    group: 'DOCUMENTATION',
    sensitivity: 'RESTRICTED',
    type: 'documentPair',
    hrEditable: true,
    requestable: true,
    requiresProof: false,
    read: (e) =>
      e.documentDetail?.aadhaarFrontUrl && e.documentDetail.aadhaarBackUrl
        ? { front: e.documentDetail.aadhaarFrontUrl, back: e.documentDetail.aadhaarBackUrl }
        : null,
    normalize: v.documentPair,
    write: (db, e, value: v.DocumentPairValue) =>
      writeColumns(db, e, 'document', { aadhaarFrontUrl: value.front, aadhaarBackUrl: value.back }),
    fileKeys: (value: v.DocumentPairValue) => [value.front, value.back],
  },
  scalar({ key: 'documentation.drivingLicenceNumber', label: 'Driving licence number', group: 'DOCUMENTATION', sensitivity: 'RESTRICTED', type: 'licence', model: 'document', column: 'drivingLicenceNumber', normalize: v.licence, requiresProof: true }),
  {
    key: 'documentation.drivingLicenceImages',
    label: 'Driving licence images',
    group: 'DOCUMENTATION',
    sensitivity: 'RESTRICTED',
    type: 'documentPair',
    hrEditable: true,
    requestable: true,
    requiresProof: false,
    read: (e) =>
      e.documentDetail?.drivingLicenceFrontUrl && e.documentDetail.drivingLicenceBackUrl
        ? { front: e.documentDetail.drivingLicenceFrontUrl, back: e.documentDetail.drivingLicenceBackUrl }
        : null,
    normalize: v.documentPair,
    write: (db, e, value: v.DocumentPairValue) =>
      writeColumns(db, e, 'document', { drivingLicenceFrontUrl: value.front, drivingLicenceBackUrl: value.back }),
    fileKeys: (value: v.DocumentPairValue) => [value.front, value.back],
  },
  {
    key: 'documentation.education',
    label: 'Education',
    group: 'DOCUMENTATION',
    sensitivity: 'CONFIDENTIAL',
    type: 'education',
    hrEditable: true,
    requestable: true,
    requiresProof: false,
    read: (e) =>
      e.documentDetail
        ? {
            highestQualification: e.documentDetail.highestQualification,
            documents: e.educationalDocuments.map((d) => ({
              qualificationLevel: d.qualificationLevel,
              front: d.frontImageUrl,
              back: d.backImageUrl,
            })),
          }
        : null,
    normalize: v.education,
    write: async (db, e, value: v.EducationValue) => {
      await writeColumns(db, e, 'document', { highestQualification: value.highestQualification });
      await db.educationalDocument.deleteMany({ where: { employeeId: e.id } });
      await db.educationalDocument.createMany({
        data: value.documents.map((d) => ({
          employeeId: e.id,
          qualificationLevel: d.qualificationLevel,
          frontImageUrl: d.front,
          backImageUrl: d.back,
        })),
      });
    },
    fileKeys: (value: v.EducationValue) => value.documents.flatMap((d) => [d.front, d.back]),
  },

  // 8.4 Employment Details — HR decisions, not requestable
  {
    ...scalar({ key: 'employment.vertical', label: 'Vertical', group: 'EMPLOYMENT', sensitivity: 'INTERNAL', type: 'select', model: 'employment', column: 'vertical', normalize: v.oneOf(EMPLOYEE_VERTICALS), options: options(EMPLOYEE_VERTICALS), requestable: false }),
    affectsSystemRole: true,
    history: async (db, e, oldValue: string | null, newValue: string) => {
      await db.verticalTransferHistory.create({
        data: { employeeId: e.id, fromVertical: oldValue ?? '', toVertical: newValue },
      });
    },
  },
  {
    ...scalar({ key: 'employment.role', label: 'Role', group: 'EMPLOYMENT', sensitivity: 'INTERNAL', type: 'select', model: 'employment', column: 'role', normalize: v.oneOf(Object.values(EmployeeRole)), options: ROLE_OPTIONS, requestable: false }),
    affectsSystemRole: true,
    write: async (db, e, value: EmployeeRole) => {
      // BR-07: the MD has no reporting authority
      await writeColumns(db, e, 'employment', {
        role: value,
        ...(value === EmployeeRole.MANAGING_DIRECTOR && { reportingAuthorityId: null }),
      });
    },
    history: async (db, e, oldValue: EmployeeRole | null, newValue: EmployeeRole) => {
      if (!oldValue) return;
      await db.promotionHistory.create({ data: { employeeId: e.id, fromRole: oldValue, toRole: newValue } });
    },
  },
  scalar({ key: 'employment.jobType', label: 'Job type', group: 'EMPLOYMENT', sensitivity: 'INTERNAL', type: 'select', model: 'employment', column: 'jobType', normalize: v.oneOf(Object.values(JobType)), options: JOB_TYPE_OPTIONS, requestable: false }),
  scalar({ key: 'employment.joiningDate', label: 'Joining date', group: 'EMPLOYMENT', sensitivity: 'INTERNAL', type: 'date', model: 'employment', column: 'joiningDate', normalize: v.date, isDate: true, requestable: false }),
  {
    ...scalar({ key: 'employment.reportingAuthorityId', label: 'Reporting authority', group: 'EMPLOYMENT', sensitivity: 'INTERNAL', type: 'employeeRef', model: 'employment', column: 'reportingAuthorityId', normalize: v.uuid, requestable: false }),
    normalize: async (value, ctx) => {
      const managerId = v.uuid(value);
      if (managerId === ctx.employee.id) throw new FieldValueError('cannot be the employee themself');
      // BR-07: an existing, active employee — and not someone who reports to this employee
      let current: string | null = managerId;
      for (let depth = 0; current && depth < 50; depth++) {
        const manager: { employmentStatus: EmploymentStatus; employmentDetail: { reportingAuthorityId: string | null } | null } | null =
          await ctx.db.employee.findUnique({
            where: { id: current },
            select: { employmentStatus: true, employmentDetail: { select: { reportingAuthorityId: true } } },
          });
        if (!manager) throw new FieldValueError('must be an existing employee');
        if (depth === 0 && manager.employmentStatus !== EmploymentStatus.ACTIVE) {
          throw new FieldValueError('must be an active employee');
        }
        current = manager.employmentDetail?.reportingAuthorityId ?? null;
        if (current === ctx.employee.id) {
          throw new FieldValueError('cannot be someone who reports to this employee');
        }
      }
      return managerId;
    },
  },
  {
    key: 'employment.probation',
    label: 'Probation',
    group: 'EMPLOYMENT',
    sensitivity: 'CONFIDENTIAL',
    type: 'probation',
    hrEditable: true,
    requestable: false,
    requiresProof: false,
    read: (e) =>
      e.probationDetail
        ? {
            onProbation: true,
            probationPeriod: e.probationDetail.probationPeriod,
            financialAgreement: e.probationDetail.financialAgreement,
          }
        : { onProbation: false, probationPeriod: null, financialAgreement: null },
    normalize: v.probation,
    write: async (db, e, value: v.ProbationValue) => {
      if (!value.onProbation) {
        await db.employeeProbationDetail.deleteMany({ where: { employeeId: e.id } });
        return;
      }
      const data = { probationPeriod: value.probationPeriod!, financialAgreement: value.financialAgreement! };
      await db.employeeProbationDetail.upsert({
        where: { employeeId: e.id },
        create: { employeeId: e.id, ...data },
        update: data,
      });
    },
  },

  // 8.5 Financial Details — restricted
  scalar({ key: 'financial.accountHolderName', label: 'Account holder name', group: 'FINANCIAL', sensitivity: 'RESTRICTED', type: 'text', model: 'financial', column: 'accountHolderName', normalize: v.text, requiresProof: true }),
  scalar({ key: 'financial.accountNumber', label: 'Account number', group: 'FINANCIAL', sensitivity: 'RESTRICTED', type: 'accountNumber', model: 'financial', column: 'accountNumber', normalize: v.accountNumber, requiresProof: true }),
  scalar({ key: 'financial.ifscCode', label: 'IFSC', group: 'FINANCIAL', sensitivity: 'RESTRICTED', type: 'ifsc', model: 'financial', column: 'ifscCode', normalize: v.ifsc, requiresProof: true }),
  scalar({ key: 'financial.branchName', label: 'Branch name', group: 'FINANCIAL', sensitivity: 'RESTRICTED', type: 'text', model: 'financial', column: 'branchName', normalize: v.text, requiresProof: true }),
  {
    key: 'financial.takeHomePay',
    label: 'Take-home pay',
    group: 'FINANCIAL',
    sensitivity: 'RESTRICTED',
    type: 'pay',
    hrEditable: true,
    requestable: false,
    requiresProof: false,
    read: (e) =>
      e.financialDetail
        ? {
            takeHomePayTotal: e.financialDetail.takeHomePayTotal.toNumber(),
            bankComponent: e.financialDetail.bankComponent?.toNumber() ?? 0,
            cashComponent: e.financialDetail.cashComponent?.toNumber() ?? 0,
          }
        : null,
    normalize: v.pay,
    isSame: (oldValue: v.PayValue | null, newValue: v.PayValue) =>
      !!oldValue &&
      oldValue.takeHomePayTotal === newValue.takeHomePayTotal &&
      oldValue.bankComponent === newValue.bankComponent &&
      oldValue.cashComponent === newValue.cashComponent,
    write: (db, e, value: v.PayValue) =>
      writeColumns(db, e, 'financial', {
        takeHomePayTotal: new Prisma.Decimal(value.takeHomePayTotal),
        bankComponent: new Prisma.Decimal(value.bankComponent),
        cashComponent: new Prisma.Decimal(value.cashComponent),
      }),
    history: async (db, e, oldValue: v.PayValue | null, newValue: v.PayValue) => {
      await db.payRevisionHistory.create({
        data: {
          employeeId: e.id,
          previousPay: new Prisma.Decimal(oldValue?.takeHomePayTotal ?? 0),
          newPay: new Prisma.Decimal(newValue.takeHomePayTotal),
          effectiveDate: new Date(newValue.effectiveDate!),
        },
      });
    },
  },
  {
    key: 'financial.appraisal',
    label: 'Appraisal',
    group: 'FINANCIAL',
    sensitivity: 'RESTRICTED',
    type: 'appraisal',
    hrEditable: true,
    requestable: false,
    requiresProof: false,
    read: (e) =>
      e.financialDetail ? { nextAppraisalWindow: toDateString(e.financialDetail.nextAppraisalWindow) } : null,
    normalize: v.appraisal,
    isSame: (oldValue: v.AppraisalValue | null, newValue: v.AppraisalValue) =>
      !!oldValue && oldValue.nextAppraisalWindow === newValue.nextAppraisalWindow && !newValue.outcome,
    write: (db, e, value: v.AppraisalValue) =>
      writeColumns(db, e, 'financial', { nextAppraisalWindow: new Date(value.nextAppraisalWindow) }),
    history: async (db, e, _oldValue, newValue: v.AppraisalValue) => {
      if (!newValue.outcome) return;
      await db.appraisalHistory.create({
        data: { employeeId: e.id, appraisalWindow: newValue.completedWindow!, outcome: newValue.outcome },
      });
    },
  },
];

export const EMPLOYEE_FIELD_MAP = new Map(EMPLOYEE_FIELDS.map((field) => [field.key, field]));

export const isSameValue = (field: FieldDefinition, oldValue: unknown, newValue: unknown): boolean =>
  field.isSame ? field.isSame(oldValue, newValue) : JSON.stringify(oldValue) === JSON.stringify(newValue);

/** Uploaded documents in `newValue` that `oldValue` did not already reference. */
export const newFileKeys = (field: FieldDefinition, oldValue: unknown, newValue: unknown): string[] => {
  if (!field.fileKeys) return [];
  const existing = new Set(oldValue ? field.fileKeys(oldValue) : []);
  return field.fileKeys(newValue).filter((key) => !existing.has(key));
};
