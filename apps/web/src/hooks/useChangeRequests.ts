import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeRequestService } from '../services/changeRequest.service'
import type { ChangeRequest, ChangeRequestFieldInput, ChangeRequestStatus } from '../api/types'

export function useMyChangeRequests() {
  return useQuery({ queryKey: ['change-requests', 'mine'], queryFn: () => changeRequestService.listMine() })
}

export function useChangeRequestQueue(params: { status?: ChangeRequestStatus; overdue?: boolean }) {
  return useQuery({
    queryKey: ['change-requests', 'queue', params],
    queryFn: () => changeRequestService.queue(params),
  })
}

export function useChangeRequest(id?: string) {
  return useQuery({
    queryKey: ['change-requests', 'detail', id],
    queryFn: () => changeRequestService.detail(id!),
    enabled: !!id,
  })
}

/** Every change-request mutation refreshes requests and employee data. */
function useChangeRequestMutation<TVars>(fn: (vars: TVars) => Promise<ChangeRequest>) {
  const queryClient = useQueryClient()
  return useMutation<ChangeRequest, Error, TVars>({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['change-requests'] })
      queryClient.invalidateQueries({ queryKey: ['employee'] })
    },
  })
}

export const useRaiseChangeRequest = () =>
  useChangeRequestMutation((fields: ChangeRequestFieldInput[]) => changeRequestService.raise(fields))

export const useReplyChangeRequest = () =>
  useChangeRequestMutation(({ id, fields }: { id: string; fields: ChangeRequestFieldInput[] }) =>
    changeRequestService.reply(id, fields),
  )

export const useCancelChangeRequest = () =>
  useChangeRequestMutation((id: string) => changeRequestService.cancel(id))

export const useApproveChangeRequest = () =>
  useChangeRequestMutation((id: string) => changeRequestService.approve(id))

export const useQueryChangeRequest = () =>
  useChangeRequestMutation(({ id, fieldKeys, reason }: { id: string; fieldKeys: string[]; reason: string }) =>
    changeRequestService.query(id, fieldKeys, reason),
  )

export const useRejectChangeRequest = () =>
  useChangeRequestMutation(({ id, reason }: { id: string; reason: string }) => changeRequestService.reject(id, reason))
