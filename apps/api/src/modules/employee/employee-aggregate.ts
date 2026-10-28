import { Prisma } from '@prisma/client';

const PERSON_SUMMARY = { select: { id: true, employeeId: true, firstName: true, lastName: true } } as const;

/** Everything the detail view, edit engine and change requests read about one employee. */
export const EMPLOYEE_AGGREGATE_INCLUDE = {
  user: { select: { role: true } },
  personalDetail: true,
  communicationDetail: true,
  emergencyContacts: { orderBy: { createdAt: 'asc' } },
  documentDetail: true,
  educationalDocuments: { orderBy: { createdAt: 'asc' } },
  employmentDetail: { include: { reportingAuthority: PERSON_SUMMARY } },
  probationDetail: true,
  financialDetail: true,
  transferHistories: { orderBy: { transferredAt: 'desc' } },
  promotionHistories: { orderBy: { promotedAt: 'desc' } },
  payRevisionHistories: { orderBy: { effectiveDate: 'desc' } },
  appraisalHistories: { orderBy: { reviewedAt: 'desc' } },
} satisfies Prisma.EmployeeInclude;

export type EmployeeAggregate = Prisma.EmployeeGetPayload<{ include: typeof EMPLOYEE_AGGREGATE_INCLUDE }>;

/** Accepts the internal UUID or the LL-XXXXX employee code. */
export const byIdOrCode = (idOrCode: string): Prisma.EmployeeWhereInput => ({
  OR: [{ id: idOrCode }, { employeeId: idOrCode }],
});

export const toDateString = (value: Date | null | undefined): string | null =>
  value ? value.toISOString().slice(0, 10) : null;
