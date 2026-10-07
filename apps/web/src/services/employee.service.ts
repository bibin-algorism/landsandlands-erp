import { apiClient } from '../api/client'
import type {
  CreateEmployeePayload,
  CreateEmployeeResponse,
  EmployeeListItem,
} from '../api/types'

export const employeeService = {
  async getEmployees(vertical?: string): Promise<EmployeeListItem[]> {
    const res = await apiClient.get<EmployeeListItem[]>('/employees', {
      params: { vertical },
    })
    return res.data
  },

  async getEmployeeById(id: string): Promise<EmployeeListItem & Record<string, any>> {
    const res = await apiClient.get<EmployeeListItem & Record<string, any>>(`/employees/${id}`)
    return res.data
  },

  async createEmployee(payload: CreateEmployeePayload): Promise<CreateEmployeeResponse> {
    const res = await apiClient.post<CreateEmployeeResponse>('/employees', payload)
    return res.data
  },
}
