import { EmploymentStatus } from '@prisma/client';
import type { AccessLevel } from './access/employee-access.service';
import { EmployeeAggregate, toDateString } from './employee-aggregate';

export interface PersonRef {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
}

export interface EmployeeDocumentRef {
  /** Identifier used by GET /employees/:id/documents/:document */
  document: string;
  label: string;
  restricted: boolean;
  key: string;
}

const EDUCATION_LABELS: Record<string, string> = {
  TENTH: '10th mark sheet',
  TWELFTH: '12th mark sheet',
  UG_DEGREE: 'UG degree certificate',
  PG_DEGREE: 'PG degree certificate',
};

/** Every stored document image of an employee, with the access class it needs. */
export function employeeDocuments(e: EmployeeAggregate): EmployeeDocumentRef[] {
  const d = e.documentDetail;
  const docs: (EmployeeDocumentRef | null)[] = [
    d?.aadhaarFrontUrl ? { document: 'aadhaar-front', label: 'Aadhaar · front', restricted: true, key: d.aadhaarFrontUrl } : null,
    d?.aadhaarBackUrl ? { document: 'aadhaar-back', label: 'Aadhaar · back', restricted: true, key: d.aadhaarBackUrl } : null,
    d?.drivingLicenceFrontUrl ? { document: 'driving-licence-front', label: 'Driving licence · front', restricted: true, key: d.drivingLicenceFrontUrl } : null,
    d?.drivingLicenceBackUrl ? { document: 'driving-licence-back', label: 'Driving licence · back', restricted: true, key: d.drivingLicenceBackUrl } : null,
    ...e.educationalDocuments.flatMap((doc) => [
      { document: `education-${doc.qualificationLevel.toLowerCase()}-front`, label: `${EDUCATION_LABELS[doc.qualificationLevel] ?? doc.qualificationLevel} · front`, restricted: false, key: doc.frontImageUrl },
      { document: `education-${doc.qualificationLevel.toLowerCase()}-back`, label: `${EDUCATION_LABELS[doc.qualificationLevel] ?? doc.qualificationLevel} · back`, restricted: false, key: doc.backImageUrl },
    ]),
    d?.relievingExperienceUrl ? { document: 'relieving-letter', label: 'Relieving letter', restricted: false, key: d.relievingExperienceUrl } : null,
    d?.salarySlipUrl ? { document: 'payslips', label: "Last 3 months' payslips", restricted: false, key: d.salarySlipUrl } : null,
    d?.recordOfIncomeUrl ? { document: 'record-of-income', label: 'Record of income', restricted: false, key: d.recordOfIncomeUrl } : null,
  ];
  return docs.filter((doc): doc is EmployeeDocumentRef => !!doc);
}

/**
 * Detail response for one employee. Restricted data (BR-13: Aadhaar, driving licence,
 * bank, pay, appraisal) is only included at FULL access; storage keys are never exposed.
 */
export function toEmployeeView(
  e: EmployeeAggregate,
  level: AccessLevel,
  extra: {
    people: Map<string, PersonRef>;
    canEdit: boolean;
    canRequestChange: boolean;
  },
) {
  const full = level === 'FULL';
  const person = (userId: string | null) => (userId ? (extra.people.get(userId) ?? null) : null);
  const money = (value: { toNumber(): number } | null | undefined) => (value ? value.toNumber() : null);

  return {
    id: e.id,
    employeeId: e.employeeId,
    firstName: e.firstName,
    lastName: e.lastName,
    employmentStatus: e.employmentStatus,
    isIncomplete: e.documentDetail?.isIncompleteFlag ?? false,

    personal: e.personalDetail && {
      dateOfBirth: toDateString(e.personalDetail.dateOfBirth),
      gender: e.personalDetail.gender,
      bloodGroup: e.personalDetail.bloodGroup,
      maritalStatus: e.personalDetail.maritalStatus,
      fatherName: e.personalDetail.fatherName,
    },

    communication: e.communicationDetail && {
      personalPhone: e.communicationDetail.personalPhone,
      secondaryPhone: e.communicationDetail.secondaryPhone,
      officialPhone: e.communicationDetail.officialPhone,
      personalEmail: e.communicationDetail.personalEmail,
      officialEmail: e.communicationDetail.officialEmail,
      currentAddress: e.communicationDetail.currentAddress,
      permanentAddress: e.communicationDetail.permanentAddress,
      emergencyContacts: e.emergencyContacts.map((c) => ({
        name: c.name,
        relationship: c.relationship,
        phone: c.phone,
        isPrimary: c.isPrimary,
      })),
    },

    documentation: e.documentDetail && {
      aadhaarNumber: full ? e.documentDetail.aadhaarNumber : null,
      drivingLicenceNumber: full ? e.documentDetail.drivingLicenceNumber : null,
      highestQualification: e.documentDetail.highestQualification,
      employeeBackground: e.documentDetail.employeeBackground,
      previousOrgDocStatus: e.documentDetail.previousOrgDocStatus,
      secondDocDueDate: toDateString(e.documentDetail.secondDocDueDate),
      isIncomplete: e.documentDetail.isIncompleteFlag,
      documents: employeeDocuments(e)
        .filter((doc) => full || !doc.restricted)
        .map(({ document, label, restricted }) => ({ document, label, restricted })),
    },

    employment: e.employmentDetail && {
      vertical: e.employmentDetail.vertical,
      role: e.employmentDetail.role,
      jobType: e.employmentDetail.jobType,
      joiningDate: toDateString(e.employmentDetail.joiningDate),
      reportingAuthority: e.employmentDetail.reportingAuthority,
      exitDate: toDateString(e.employmentDetail.exitDate),
      exitReason: e.employmentDetail.exitReason,
      probation: e.probationDetail && {
        probationPeriod: e.probationDetail.probationPeriod,
        financialAgreement: e.probationDetail.financialAgreement,
      },
      transferHistory: e.transferHistories.map((t) => ({
        fromVertical: t.fromVertical,
        toVertical: t.toVertical,
        transferredAt: t.transferredAt,
      })),
      promotionHistory: e.promotionHistories.map((p) => ({
        fromRole: p.fromRole,
        toRole: p.toRole,
        promotedAt: p.promotedAt,
      })),
    },

    financial:
      full && e.financialDetail
        ? {
            accountHolderName: e.financialDetail.accountHolderName,
            accountNumber: e.financialDetail.accountNumber,
            ifscCode: e.financialDetail.ifscCode,
            branchName: e.financialDetail.branchName,
            takeHomePayTotal: money(e.financialDetail.takeHomePayTotal),
            bankComponent: money(e.financialDetail.bankComponent),
            cashComponent: money(e.financialDetail.cashComponent),
            nextAppraisalWindow: toDateString(e.financialDetail.nextAppraisalWindow),
            payRevisions: e.payRevisionHistories.map((p) => ({
              previousPay: p.previousPay.toNumber(),
              newPay: p.newPay.toNumber(),
              effectiveDate: toDateString(p.effectiveDate),
            })),
            appraisals: e.appraisalHistories.map((a) => ({
              appraisalWindow: a.appraisalWindow,
              outcome: a.outcome,
              reviewedAt: a.reviewedAt,
            })),
          }
        : null,

    // 8.7 metadata
    system: {
      createdAt: e.createdAt,
      createdBy: person(e.createdById),
      onboardingCompletedAt: e.onboardingCompletedAt,
      updatedAt: e.updatedAt,
      lastUpdatedBy: person(e.lastUpdatedById),
      statusChangedOn: e.statusChangedOn,
    },

    access: {
      level,
      restrictedVisible: full,
      canEdit: extra.canEdit,
      canRequestChange: extra.canRequestChange,
    },
  };
}

export type EmployeeView = ReturnType<typeof toEmployeeView>;

export const isActive = (e: { employmentStatus: EmploymentStatus }) =>
  e.employmentStatus === EmploymentStatus.ACTIVE;
