import { apiClient } from './client'
import type { ApiResponse, PasswordResetRequestData } from './types'

export const passwordResetApi = {
  async getResetRequests(): Promise<PasswordResetRequestData[]> {
    const response = await apiClient.get<ApiResponse<PasswordResetRequestData[]>>(
      '/people/password-resets'
    )
    return response.data.data || []
  },

  async generateTempPassword(requestId: string): Promise<{ tempPassword: string }> {
    const response = await apiClient.post<ApiResponse<{ tempPassword: string }>>(
      `/people/password-resets/${requestId}/generate-temp-password`
    )
    return response.data.data!
  },

  async rejectRequest(requestId: string, reason?: string): Promise<void> {
    await apiClient.post(`/people/password-resets/${requestId}/reject`, { reason })
  },
}
