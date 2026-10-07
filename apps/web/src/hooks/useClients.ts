import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clientService } from '../services/client.service'
import type { QueryClientsParams, CreateClientPayload } from '../api/types'

export const CLIENTS_QUERY_KEY = ['clients']

export function useClients(params?: QueryClientsParams) {
  return useQuery({
    queryKey: [...CLIENTS_QUERY_KEY, params],
    queryFn: () => clientService.getClients(params),
  })
}

export function useClientDetails(id?: string) {
  return useQuery({
    queryKey: [...CLIENTS_QUERY_KEY, 'detail', id],
    queryFn: () => clientService.getClientById(id!),
    enabled: Boolean(id),
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateClientPayload) => clientService.createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY })
    },
  })
}
