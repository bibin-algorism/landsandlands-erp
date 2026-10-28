import type {
  EmployeeBackground,
  EmployeeRoleType,
  JobType,
  QualificationLevel,
} from '../api/types'

/**
 * Employee option lists (BRD Employee Module v0.1, Section 8).
 * Mirrors packages/shared/src/employee.ts, which the API validates against — keep both in sync.
 */
export const BUSINESS_VERTICALS = [
  'Primary',
  'Secondary',
  'Plots',
  'B2B',
  'Commercial Rental',
  'Residential Rental',
  'Property Management',
  'Registration & Survey',
  'Liaison',
  'Projects',
] as const

export const FUNCTIONAL_VERTICALS = [
  'Marketing',
  'Sales',
  'Operations',
  'Human Resource',
  'Finance & Administration',
] as const

export const GENDERS = ['Female', 'Male', 'Other'] as const
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const
export const MARITAL_STATUSES = ['Single', 'Married', 'Other'] as const
export const RELATIONSHIPS = ['Father', 'Mother', 'Spouse', 'Sibling', 'Child', 'Friend', 'Other'] as const

export const ROLE_LABELS: Record<EmployeeRoleType, string> = {
  MANAGING_DIRECTOR: 'Managing Director',
  COO: 'COO',
  MANAGEMENT_ADMIN: 'Management (Administration team)',
  VERTICAL_HEAD: 'Vertical Head',
  EXECUTIVE: 'Executive',
}

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  PERMANENT: 'Permanent',
  TEMPORARY: 'Temporary',
  CONTRACT: 'Contract',
}

/** Ordered lowest to highest (FR-04). */
export const QUALIFICATION_LABELS: Record<QualificationLevel, string> = {
  NONE: 'No educational qualification',
  TENTH: '10th only',
  TWELFTH: '12th only',
  UG_DEGREE: 'UG degree',
  PG_DEGREE: 'PG degree',
}

export const BACKGROUND_LABELS: Record<EmployeeBackground, string> = {
  EXPERIENCED: 'Previous organisation',
  FRESHER: 'Fresher',
  FREELANCER: 'Freelancer',
  ENTREPRENEUR: 'Entrepreneur',
}

/** BR-05: the missing previous-organisation document is due 2 weeks to 1 month after joining. */
export const SECOND_DOC_MIN_DAYS = 14
export const SECOND_DOC_MAX_DAYS = 30
