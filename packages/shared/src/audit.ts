/**
 * Catalogue of business audit actions written to `audit_logs`.
 * Naming: `<module>.<subject>.<verb>` (past tense). Add new actions here instead of a DB enum.
 */
export const AuditEntityType = {
  EMPLOYEE: 'EMPLOYEE',
  CLIENT: 'CLIENT',
} as const;
export type AuditEntityType = (typeof AuditEntityType)[keyof typeof AuditEntityType];

export const AuditAction = {
  EMPLOYEE_ONBOARDED: 'employee.onboarded',
  EMPLOYEE_DIRECT_EDIT: 'employee.direct_edit',
  EMPLOYEE_CHANGE_REQUEST_RAISED: 'employee.change_request.raised',
  EMPLOYEE_CHANGE_REQUEST_QUERIED: 'employee.change_request.queried',
  EMPLOYEE_CHANGE_REQUEST_REPLIED: 'employee.change_request.replied',
  EMPLOYEE_CHANGE_REQUEST_APPROVED: 'employee.change_request.approved',
  EMPLOYEE_CHANGE_REQUEST_REJECTED: 'employee.change_request.rejected',
  EMPLOYEE_CHANGE_REQUEST_CANCELLED: 'employee.change_request.cancelled',
  EMPLOYEE_SECOND_DOCUMENT_SUBMITTED: 'employee.second_document.submitted',
  EMPLOYEE_DOCUMENT_VIEWED: 'employee.document.viewed',

  CLIENT_CREATED: 'client.created',
  CLIENT_UPDATED: 'client.updated',
  CLIENT_PRIMARY_RM_REASSIGNED: 'client.primary_rm.reassigned',
} as const;
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];

export interface AuditFieldChange {
  field: string;
  old: unknown;
  new: unknown;
}
