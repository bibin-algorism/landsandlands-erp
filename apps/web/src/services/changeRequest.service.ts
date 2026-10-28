import { apiClient } from '../api/client'
import type { ChangeRequest, ChangeRequestFieldInput, ChangeRequestStatus } from '../api/types'
import { openProtectedFile } from './employee.service'

export const changeRequestService = {
  async raise(fields: ChangeRequestFieldInput[]): Promise<ChangeRequest> {
    const res = await apiClient.post<ChangeRequest>('/employees/me/change-requests', { fields })
    return res.data
  },

  async listMine(): Promise<ChangeRequest[]> {
    const res = await apiClient.get<ChangeRequest[]>('/employees/me/change-requests')
    return res.data
  },

  async reply(id: string, fields: ChangeRequestFieldInput[]): Promise<ChangeRequest> {
    const res = await apiClient.put<ChangeRequest>(`/employees/me/change-requests/${id}`, { fields })
    return res.data
  },

  async cancel(id: string): Promise<ChangeRequest> {
    const res = await apiClient.post<ChangeRequest>(`/employees/me/change-requests/${id}/cancel`)
    return res.data
  },

  async queue(params: { status?: ChangeRequestStatus; overdue?: boolean } = {}): Promise<ChangeRequest[]> {
    const res = await apiClient.get<ChangeRequest[]>('/employees/change-requests', {
      params: { status: params.status, overdue: params.overdue ? 'true' : undefined },
    })
    return res.data
  },

  async detail(id: string): Promise<ChangeRequest> {
    const res = await apiClient.get<ChangeRequest>(`/employees/change-requests/${id}`)
    return res.data
  },

  async approve(id: string): Promise<ChangeRequest> {
    const res = await apiClient.post<ChangeRequest>(`/employees/change-requests/${id}/approve`)
    return res.data
  },

  async query(id: string, fieldKeys: string[], reason: string): Promise<ChangeRequest> {
    const res = await apiClient.post<ChangeRequest>(`/employees/change-requests/${id}/query`, { fieldKeys, reason })
    return res.data
  },

  async reject(id: string, reason: string): Promise<ChangeRequest> {
    const res = await apiClient.post<ChangeRequest>(`/employees/change-requests/${id}/reject`, { reason })
    return res.data
  },

  openFile(id: string, key: string): Promise<void> {
    return openProtectedFile(`/employees/change-requests/${id}/files`, { key })
  },
}
