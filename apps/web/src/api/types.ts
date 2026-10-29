export interface ApiResponse<T = unknown> {
  success?: boolean
  data?: T
  /** NestJS validation errors arrive as a list of messages. */
  message?: string | string[]
  error?: string
  statusCode?: number
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'HR_ADMIN' | 'VERTICAL_HEAD' | 'EMPLOYEE'

export interface UserProfile {
  id: string
  identifier: string
  stakeholderType: string
  role?: UserRole
  permissions?: string[]
  status?: string
}

export interface LoginCredentials {
  identifier: string
  password: string
}

export interface UserSummary {
  id: string
  identifier: string
  stakeholderType: string
  role?: UserRole
  permissions?: string[]
}

export interface LoginSuccessResponse {
  accessToken: string
  expiresAt: string
  user: UserSummary
  mustChangePassword?: false
}

export interface LoginMustChangePasswordResponse {
  mustChangePassword: true
  tempToken: string
  message: string
}

export type LoginResponse = LoginSuccessResponse | LoginMustChangePasswordResponse
export type LoginResponseData = LoginResponse

export interface RequestResetPayload {
  identifier: string
  reason: string
}

export interface RequestResetResponse {
  message: string
  requestId: string
}

export interface ResetStatusResponse {
  identifier: string
  status: 'AWAITING_RESET' | 'NONE'
}

export interface PasswordResetRequestData {
  id: string
  identifier: string
  reason: string
  requestedAt: string
  status: string
  user?: {
    id: string
    status: string
    profile?: {
      firstName?: string
      lastName?: string
      phone?: string
    }
    employee?: {
      designation?: string
      department?: string
    }
  }
}

export interface AdminActionResetPayload {
  requestId: string
  action: 'APPROVED' | 'REJECTED'
  note?: string
}

export interface AdminActionResetResponse {
  success: boolean
  message: string
  tempPassword?: string
  temporaryPassword?: string
  identifier?: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  tempToken?: string
  confirmPassword?: string
}

export interface ChangePasswordResponse {
  success?: boolean
  message: string
}

// ==========================================
// EMPLOYEE MODULE TYPES
// ==========================================

export type EmploymentStatus = 'ACTIVE' | 'TERMINATED'
export type EmployeeRoleType = 'MANAGING_DIRECTOR' | 'COO' | 'MANAGEMENT_ADMIN' | 'VERTICAL_HEAD' | 'EXECUTIVE'
export type JobType = 'PERMANENT' | 'TEMPORARY' | 'CONTRACT'
export type QualificationLevel = 'NONE' | 'TENTH' | 'TWELFTH' | 'UG_DEGREE' | 'PG_DEGREE'
export type PreviousOrgDocStatus = 'BOTH' | 'ONE' | 'NONE'
export type EmployeeBackground = 'EXPERIENCED' | 'FRESHER' | 'FREELANCER' | 'ENTREPRENEUR'

export interface EmergencyContactInput {
  name: string
  relationship: string
  phone: string
  isPrimary?: boolean
}

export interface CommunicationDetailSummary {
  officialEmail?: string
  officialPhone?: string
  personalEmail?: string
  personalPhone?: string
}

export interface EmploymentDetailSummary {
  vertical?: string
  role?: string
  jobType?: string
  joiningDate?: string
  reportsTo?: string
}

export interface EmployeeListItem {
  id: string
  userId?: string
  employeeId: string
  firstName: string
  lastName: string
  fullName?: string
  email?: string
  phone?: string
  vertical?: string
  role?: string
  jobType?: string
  employmentStatus: EmploymentStatus
  onboardingStatus?: 'Active' | 'Incomplete' | 'Terminated'
  /** A previous-organisation document is still due (FR-07). */
  isIncomplete?: boolean
  secondDocDueDate?: string | null
  communicationDetail?: CommunicationDetailSummary
  employmentDetail?: EmploymentDetailSummary
}

/** Request body for POST /employees (mirrors CreateEmployeeDto). Document fields hold storage keys. */
export interface CreateEmployeePayload {
  // 8.1 Personal Identity
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  maritalStatus: string
  fatherName: string

  // 8.2 Communication Details
  personalPhone: string
  secondaryPhone: string
  officialPhone: string
  personalEmail: string
  officialEmail: string
  currentAddress: string
  permanentAddress: string
  emergencyContacts: EmergencyContactInput[]

  // 8.3 Documentation
  aadhaarNumber: string
  aadhaarFrontUrl: string
  aadhaarBackUrl: string
  drivingLicenceNumber: string
  drivingLicenceFrontUrl: string
  drivingLicenceBackUrl: string
  highestQualification: QualificationLevel
  educationalDocuments: { qualificationLevel: QualificationLevel; frontImageUrl: string; backImageUrl: string }[]
  employeeBackground: EmployeeBackground
  previousOrgDocStatus?: Exclude<PreviousOrgDocStatus, 'NONE'>
  relievingExperienceUrl?: string
  salarySlipUrl?: string
  secondDocDueDate?: string
  recordOfIncomeUrl?: string

  // 8.4 Employment Details
  vertical: string
  role: EmployeeRoleType
  jobType: JobType
  joiningDate: string
  reportingAuthorityId?: string
  onProbation: boolean
  probationPeriod?: string
  financialAgreement?: string

  // 8.5 Financial Details (whole rupees)
  accountNumber: string
  accountHolderName: string
  ifscCode: string
  branchName: string
  takeHomePayTotal: number
  bankComponent: number
  cashComponent: number
  nextAppraisalWindow: string
}

export interface CreateEmployeeResponse {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  isIncomplete: boolean
  secondDocDueDate: string | null
  /** Shown once; the employee must change it at first login. */
  temporaryPassword: string
}

export interface UploadedFileResponse {
  key: string
  fileName: string
  size: number
}

// ==========================================
// EMPLOYEE DETAIL, EDIT & CHANGE REQUESTS
// ==========================================

export interface PersonRef {
  id: string
  employeeId: string
  firstName: string
  lastName: string
}

export interface EmployeeDocumentRef {
  document: string
  label: string
  restricted: boolean
}

/** GET /employees/:id — restricted sections are null when the viewer may not see them. */
export interface EmployeeView {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  employmentStatus: EmploymentStatus
  isIncomplete: boolean
  personal: {
    dateOfBirth: string | null
    gender: string
    bloodGroup: string
    maritalStatus: string
    fatherName: string
  } | null
  communication: {
    personalPhone: string
    secondaryPhone: string | null
    officialPhone: string
    personalEmail: string
    officialEmail: string
    currentAddress: string
    permanentAddress: string
    emergencyContacts: { name: string; relationship: string; phone: string; isPrimary: boolean }[]
  } | null
  documentation: {
    aadhaarNumber: string | null
    drivingLicenceNumber: string | null
    highestQualification: QualificationLevel
    employeeBackground: EmployeeBackground | null
    previousOrgDocStatus: PreviousOrgDocStatus | null
    secondDocDueDate: string | null
    isIncomplete: boolean
    documents: EmployeeDocumentRef[]
  } | null
  employment: {
    vertical: string
    role: EmployeeRoleType
    jobType: JobType
    joiningDate: string | null
    reportingAuthority: PersonRef | null
    exitDate: string | null
    exitReason: string | null
    probation: { probationPeriod: string; financialAgreement: string } | null
    transferHistory: { fromVertical: string; toVertical: string; transferredAt: string }[]
    promotionHistory: { fromRole: EmployeeRoleType; toRole: EmployeeRoleType; promotedAt: string }[]
  } | null
  financial: {
    accountHolderName: string
    accountNumber: string
    ifscCode: string
    branchName: string
    takeHomePayTotal: number | null
    bankComponent: number | null
    cashComponent: number | null
    nextAppraisalWindow: string | null
    payRevisions: { previousPay: number; newPay: number; effectiveDate: string | null }[]
    appraisals: { appraisalWindow: string; outcome: string; reviewedAt: string }[]
  } | null
  system: {
    createdAt: string
    createdBy: PersonRef | null
    onboardingCompletedAt: string | null
    updatedAt: string
    lastUpdatedBy: PersonRef | null
    statusChangedOn: string | null
  }
  access: {
    level: 'FULL' | 'TEAM'
    restrictedVisible: boolean
    canEdit: boolean
    canRequestChange: boolean
  }
}

export type FieldGroup = 'PERSONAL' | 'COMMUNICATION' | 'DOCUMENTATION' | 'EMPLOYMENT' | 'FINANCIAL'
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
  | 'appraisal'

export interface FieldMeta {
  key: string
  label: string
  group: FieldGroup
  type: FieldType
  options: { value: string; label: string }[] | null
  requiresProof: boolean
}

export interface EditableField extends FieldMeta {
  sensitivity: 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED'
  value: unknown
  hasOpenRequest: boolean
}

/** GET /employees/:id/editable-fields */
export interface EditableFieldsResponse {
  mode: 'DIRECT_EDIT' | 'CHANGE_REQUEST'
  employee: PersonRef
  updatedAt: string
  fields: EditableField[]
}

export interface DirectEditPayload {
  changes: Record<string, unknown>
  reason?: string
  expectedUpdatedAt: string
}

export interface HistoryEntry {
  id: string
  occurredAt: string
  action: string
  actor: { employeeId: string; name: string } | null
  reason: string | null
  changes: { field: string; label: string; old: unknown; new: unknown }[]
  changeSource: 'DIRECT_HR_EDIT' | 'APPROVED_CHANGE_REQUEST' | null
  changeRequestId: string | null
  document: string | null
}

export type ChangeRequestStatus = 'PENDING_REVIEW' | 'QUERY_SENT' | 'APPROVED' | 'REJECTED' | 'CANCELLED'

export interface ChangeRequestField {
  fieldKey: string
  label: string
  group: FieldGroup | null
  type: FieldType | null
  options: { value: string; label: string }[] | null
  requiresProof: boolean
  currentValue: unknown
  proposedValue: unknown
  proofFileKey: string | null
  isQueried: boolean
  /** Detail only: the value now, and whether it changed since the request was raised. */
  liveValue?: unknown
  isStale?: boolean
}

export interface ChangeRequest {
  id: string
  status: ChangeRequestStatus
  routedTo: 'HR' | 'MD'
  employee: PersonRef
  submittedAt: string
  reviewDueDate: string
  employeeReplyDueDate: string | null
  queryReason: string | null
  rejectionReason: string | null
  resolvedAt: string | null
  isOverdue: boolean
  fields: ChangeRequestField[]
}

export interface ChangeRequestFieldInput {
  fieldKey: string
  proposedValue: unknown
  proofFileKey?: string
}

/** GET /employees/onboarding/pending-documents (FR-07, FR-08) */
export interface PendingDocumentItem {
  employeeId: string
  employeeCode: string
  firstName: string
  lastName: string
  officialEmail: string | null
  officialPhone: string | null
  joiningDate: string
  daysSinceJoining: number
  secondDocDueDate: string | null
  daysRemaining: number | null
  isOverdue: boolean
  trigger29DayNotice: boolean
  missingDocument: 'RELIEVING_LETTER' | 'PAYSLIPS'
}

// Client Types & Payloads
export type ClientType = 'INDIVIDUAL' | 'CORPORATE'
export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'ARCHIVED'

export interface ClientProfile {
  id?: string
  firstName?: string
  lastName?: string
  companyName?: string
  panNumber?: string
  aadhaarNumber?: string
  gstNumber?: string
}

export interface ClientContact {
  id?: string
  primaryPhone: string
  secondaryPhone?: string
  email?: string
  currentAddress?: string
  permanentAddress?: string
}

export interface ClientListItem {
  id: string
  clientCode: string
  clientType: ClientType
  status: ClientStatus
  name: string
  acquiredBy?: {
    id: string
    employeeId: string
    firstName: string
    lastName: string
  }
  primaryRM?: {
    id: string
    employeeId: string
    firstName: string
    lastName: string
  }
  contact?: ClientContact
  profile?: ClientProfile
  createdAt?: string
}

export interface QueryClientsParams {
  search?: string
  clientType?: ClientType
  status?: ClientStatus
  acquiredById?: string
  primaryRMId?: string
  page?: number
  limit?: number
}

export interface CreateClientPayload {
  clientType: ClientType
  status?: ClientStatus
  firstName?: string
  lastName?: string
  companyName?: string
  panNumber?: string
  aadhaarNumber?: string
  gstNumber?: string
  primaryPhone: string
  secondaryPhone?: string
  email?: string
  currentAddress?: string
  permanentAddress?: string
  acquiredById?: string
  primaryRMId?: string
}

export interface PaginatedClientsResponse {
  data: ClientListItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
