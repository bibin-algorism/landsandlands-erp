import { apiClient } from '../api/client'
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  LoginCredentials,
  LoginResponse,
  RequestResetPayload,
  RequestResetResponse,
  ResetStatusResponse,
} from '../api/types'

export const authService = {
  /**
   * Authenticate employee with Employee Code & Password
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  /**
   * Submit password reset request with reason
   */
  async requestReset(payload: RequestResetPayload): Promise<RequestResetResponse> {
    const response = await apiClient.post<RequestResetResponse>('/auth/request-reset', payload)
    return response.data
  },

  /**
   * Check password reset status for login screen indicator
   */
  async getResetStatus(identifier: string): Promise<ResetStatusResponse> {
    const response = await apiClient.get<ResetStatusResponse>(`/auth/reset-status/${encodeURIComponent(identifier)}`)
    return response.data
  },

  /**
   * Change temporary password created by admin
   */
  async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
    const token = payload.tempToken || localStorage.getItem('access_token')
    const response = await apiClient.post<ChangePasswordResponse>(
      '/auth/change-password',
      {
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    )
    return response.data
  },
}
