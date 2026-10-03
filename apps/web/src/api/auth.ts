import { apiClient } from './client'
import type { ApiResponse, LoginResponseData, UserProfile } from './types'

export const authApi = {
  async login(empCode: string, password: string): Promise<LoginResponseData> {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/login', {
      empCode,
      password,
    })
    return response.data.data!
  },

  async requestPasswordReset(empCode: string, reason: string): Promise<{ requestId: string }> {
    const response = await apiClient.post<ApiResponse<{ requestId: string }>>(
      '/auth/forgot-password',
      { empCode, reason }
    )
    return response.data.data!
  },

  async setNewPassword(tempPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/set-password', {
      tempPassword,
      newPassword,
    })
  },

  async getMe(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/auth/me')
    return response.data.data!
  },
}
