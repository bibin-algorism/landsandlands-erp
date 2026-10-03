export interface ApiResponse<T = unknown> {
  success?: boolean
  data?: T
  message?: string
  error?: string
  statusCode?: number
}

export interface UserProfile {
  id: string
  identifier: string
  stakeholderType: string
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
  }
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  tempToken?: string
}

export interface ChangePasswordResponse {
  message: string
}
