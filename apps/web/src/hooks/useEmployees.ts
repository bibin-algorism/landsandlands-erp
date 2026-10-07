import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { employeeService } from '../services/employee.service'
import type { CreateEmployeePayload, CreateEmployeeResponse } from '../api/types'

export function useEmployees(vertical?: string) {
  return useQuery({
    queryKey: ['employees', vertical],
    queryFn: () => employeeService.getEmployees(vertical),
  })
}

export function useEmployeeDetails(id?: string) {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeeService.getEmployeeById(id!),
    enabled: !!id,
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
