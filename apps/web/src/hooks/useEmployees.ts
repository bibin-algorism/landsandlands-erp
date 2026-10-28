import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { employeeService } from '../services/employee.service'
import type {
  CreateEmployeePayload,
  CreateEmployeeResponse,
  DirectEditPayload,
  EmployeeView,
  EmploymentStatus,
} from '../api/types'

export function useEmployees(params: { vertical?: string; status?: EmploymentStatus } = {}) {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => employeeService.getEmployees(params),
  })
}

/** Pass "me" for the signed-in user's own record. */
export function useEmployeeDetails(id?: string) {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => (id === 'me' ? employeeService.getMyProfile() : employeeService.getEmployeeById(id!)),
    enabled: !!id,
  })
}

export function useEditableFields(id?: string) {
  return useQuery({
    queryKey: ['employee', id, 'editable-fields'],
    queryFn: () => employeeService.getEditableFields(id!),
    enabled: !!id,
    staleTime: 0,
  })
}

export function useEmployeeHistory(id: string | undefined, field?: string, enabled = true) {
  return useQuery({
    queryKey: ['employee', id, 'history', field ?? null],
    queryFn: () => employeeService.getHistory(id!, field),
    enabled: !!id && enabled,
  })
}

export function useDirectEdit(id: string) {
  const queryClient = useQueryClient()
  return useMutation<EmployeeView, Error, DirectEditPayload>({
    mutationFn: (payload) => employeeService.directEdit(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee'] })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()

  const mutation = useMutation<CreateEmployeeResponse, Error, CreateEmployeePayload>({
    mutationFn: (payload) => employeeService.createEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })

  return {
    createEmployee: mutation.mutate,
    createEmployeeAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
  }
}
