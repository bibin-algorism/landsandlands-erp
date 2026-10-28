import { apiClient } from '../api/client'
import type {
  CreateEmployeePayload,
  CreateEmployeeResponse,
  DirectEditPayload,
  EditableFieldsResponse,
  EmployeeListItem,
  EmployeeView,
  EmploymentStatus,
  HistoryEntry,
} from '../api/types'

/** Fetch a protected file with the session token and open it in a new tab. */
export async function openProtectedFile(path: string, params?: Record<string, string>): Promise<void> {
  // Open synchronously so popup blockers allow it, then point it at the downloaded blob.
  const tab = window.open('', '_blank')
  try {
    const res = await apiClient.get<Blob>(path, { params, responseType: 'blob' })
    const url = URL.createObjectURL(res.data)
    if (tab) tab.location.href = url
    else window.location.href = url
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  } catch (err) {
    tab?.close()
    throw err
  }
}

export const employeeService = {
  async getEmployees(params: { vertical?: string; status?: EmploymentStatus } = {}): Promise<EmployeeListItem[]> {
    const res = await apiClient.get<EmployeeListItem[]>('/employees', { params })
    return res.data
  },

  async getEmployeeById(id: string): Promise<EmployeeView> {
    const res = await apiClient.get<EmployeeView>(`/employees/${id}`)
    return res.data
  },

  async getMyProfile(): Promise<EmployeeView> {
    const res = await apiClient.get<EmployeeView>('/employees/me')
    return res.data
  },

  async createEmployee(payload: CreateEmployeePayload): Promise<CreateEmployeeResponse> {
    const res = await apiClient.post<CreateEmployeeResponse>('/employees', payload)
    return res.data
  },

  async getEditableFields(id: string): Promise<EditableFieldsResponse> {
    const res = await apiClient.get<EditableFieldsResponse>(`/employees/${id}/editable-fields`)
    return res.data
  },

  async directEdit(id: string, payload: DirectEditPayload): Promise<EmployeeView> {
    const res = await apiClient.patch<EmployeeView>(`/employees/${id}`, payload)
    return res.data
  },

  async getHistory(id: string, field?: string): Promise<HistoryEntry[]> {
    const res = await apiClient.get<HistoryEntry[]>(`/employees/${id}/history`, { params: { field } })
    return res.data
  },

  openDocument(id: string, document: string): Promise<void> {
    return openProtectedFile(`/employees/${id}/documents/${document}`)
  },

  openDocumentByKey(id: string, key: string): Promise<void> {
    return openProtectedFile(`/employees/${id}/documents`, { key })
  },
}
