import { apiClient } from '../api/client'
import type {
  PaginatedClientsResponse,
  QueryClientsParams,
  CreateClientPayload,
  ClientListItem,
} from '../api/types'

export const clientService = {
  getClients: async (params?: QueryClientsParams): Promise<PaginatedClientsResponse> => {
    const res = await apiClient.get<PaginatedClientsResponse>('/clients', { params })
    return res.data
  },

  getClientById: async (id: string): Promise<ClientListItem> => {
    const res = await apiClient.get<ClientListItem>(`/clients/${id}`)
    return res.data
  },

  createClient: async (payload: CreateClientPayload): Promise<ClientListItem> => {
    const res = await apiClient.post<ClientListItem>('/clients', payload)
    return res.data
  },

  updateClient: async (id: string, payload: Partial<CreateClientPayload>): Promise<ClientListItem> => {
    const res = await apiClient.put<ClientListItem>(`/clients/${id}`, payload)
    return res.data
  },
}
