/**
 * Employee master-data option lists (BRD Employee Module v0.1, Section 8).
 * The web app mirrors these in apps/web/src/constants/employee.ts — keep both in sync.
 */
export const EMPLOYEE_BUSINESS_VERTICALS = [
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
] as const;

export const EMPLOYEE_FUNCTIONAL_VERTICALS = [
  'Marketing',
  'Sales',
  'Operations',
  'Human Resource',
  'Finance & Administration',
] as const;

export const EMPLOYEE_VERTICALS = [
  ...EMPLOYEE_BUSINESS_VERTICALS,
  ...EMPLOYEE_FUNCTIONAL_VERTICALS,
] as const;
export type EmployeeVertical = (typeof EMPLOYEE_VERTICALS)[number];

/** Employees in this vertical get the HR_ADMIN system role. */
export const HR_VERTICAL: EmployeeVertical = 'Human Resource';

export const GENDERS = ['Female', 'Male', 'Other'] as const;
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export const MARITAL_STATUSES = ['Single', 'Married', 'Other'] as const;
