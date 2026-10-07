export interface ApiResponse<T = unknown> {
  success?: boolean
  data?: T
  message?: string
  error?: string
  statusCode?: number
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'HR_ADMIN' | 'EMPLOYEE'

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
  communicationDetail?: CommunicationDetailSummary
  employmentDetail?: EmploymentDetailSummary
}

export interface CreateEmployeePayload {
  // Step 1: Personal
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  maritalStatus: string
  fatherName: string

  // Step 2: Communication
  personalPhone: string
  secondaryPhone?: string
  officialPhone: string
  personalEmail: string
  officialEmail: string
  currentAddress: string
  permanentAddress: string
  emergencyContacts: EmergencyContactInput[]

  // Step 3: Document & Background
  aadhaarNumber: string
  aadhaarFrontUrl?: string
  aadhaarBackUrl?: string
  panNumber?: string
  panFrontUrl?: string
  drivingLicenceNumber: string
  drivingLicenceFrontUrl?: string
  drivingLicenceBackUrl?: string
  highestQualification?: QualificationLevel | ''
  previousOrgDocStatus?: PreviousOrgDocStatus | ''
  relievingExperienceUrl?: string
  salarySlipUrl?: string
  secondDocDueDate?: string
  employeeBackground?: EmployeeBackground | ''
  recordOfIncomeUrl?: string
  documentFiles?: Record<string, { status: 'missing' | 'uploading' | 'uploaded' | 'verified'; fileName?: string; progress?: number }>

  // Step 4: Employment & Probation
  vertical: string
  role?: EmployeeRoleType | ''
  jobType?: JobType | ''
  joiningDate: string
  reportingAuthorityId?: string
  probationPeriod: string
  financialAgreement: string

  // Step 5: Financial
  accountNumber: string
  accountHolderName: string
  ifscCode: string
  branchName: string
  takeHomePayTotal: number
  cashComponent?: number
  bankComponent?: number
  nextAppraisalWindow: string

  // Initial Password setup
  initialPassword?: string
}

export interface CreateEmployeeResponse {
  id: string
  employeeId: string
  userId: string
  firstName: string
  lastName: string
  temporaryPassword?: string
  initialPassword?: string
  message?: string
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
