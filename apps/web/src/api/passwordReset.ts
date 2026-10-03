import { apiClient } from './client'
import type {
  AdminActionResetPayload,
  AdminActionResetResponse,
  PasswordResetRequestData,
} from './types'

export const passwordResetApi = {
  async getResetRequests(): Promise<PasswordResetRequestData[]> {
    const response = await apiClient.get<PasswordResetRequestData[]>('/auth/admin/reset-requests')
    return response.data || []
  },

  async adminActionReset(payload: AdminActionResetPayload): Promise<AdminActionResetResponse> {
    const response = await apiClient.post<AdminActionResetResponse>(
      '/auth/admin/reset-password',
      payload
    )
    return response.data
  },
}
