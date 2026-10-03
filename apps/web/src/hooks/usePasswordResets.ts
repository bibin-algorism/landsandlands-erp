import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { passwordResetApi } from '../api/passwordReset'
import type { AdminActionResetPayload, AdminActionResetResponse } from '../api/types'

export function usePasswordResets() {
  const query = useQuery({
    queryKey: ['password-reset-requests'],
    queryFn: () => passwordResetApi.getResetRequests(),
    refetchInterval: 10000, // Poll every 10 seconds for real-time updates
  })

  return {
    requests: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error?.message || null,
    refetch: query.refetch,
  }
}

export function useActionPasswordReset() {
  const queryClient = useQueryClient()

  const mutation = useMutation<AdminActionResetResponse, Error, AdminActionResetPayload>({
    mutationFn: (payload) => passwordResetApi.adminActionReset(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['password-reset-requests'] })
    },
  })

  return {
    actionReset: mutation.mutate,
    actionResetAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
  }
}
