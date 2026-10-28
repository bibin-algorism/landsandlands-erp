import { apiClient } from '../api/client'
import type { UploadedFileResponse } from '../api/types'

export const fileService = {
  async uploadEmployeeDocument(file: File): Promise<UploadedFileResponse> {
    const body = new FormData()
    body.append('file', file)
    const res = await apiClient.post<UploadedFileResponse>('/files/employee-documents', body, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    })
    return res.data
  },
}
