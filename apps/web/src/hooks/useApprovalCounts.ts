import { useQuery } from '@tanstack/react-query'
import { changeRequestService } from '../services/changeRequest.service'
import { employeeService } from '../services/employee.service'
import { passwordResetApi } from '../api/passwordReset'
import { getCurrentUser } from '../utils/currentUser'

export type ApprovalQueue = 'changeRequests' | 'passwordResets' | 'pendingDocuments'

const REFRESH_MS = 60_000

/**
 * Live counts for the Approvals menu. Each queue is only fetched for roles that can act on it;
 * a 403 (e.g. a COO with no MD queue) simply hides that badge.
 */
export function useApprovalCounts(): Partial<Record<ApprovalQueue, number>> {
  const user = getCurrentUser()
  const role = user?.role
  const isHr = role === 'HR_ADMIN' || role === 'SUPER_ADMIN'
  const canReviewChanges = isHr || role === 'ADMIN'
  const canResetPasswords =
    isHr || role === 'ADMIN' || (user?.permissions ?? []).some((p) => p === '*' || p === 'password_resets:read')

  const options = { refetchInterval: REFRESH_MS, retry: false } as const

  const changeRequests = useQuery({
    queryKey: ['change-requests', 'queue', {}],
    queryFn: () => changeRequestService.queue({}),
    enabled: canReviewChanges,
    ...options,
  })
  // Same key as usePasswordResets so the page and the badge share one request.
  const passwordResets = useQuery({
    queryKey: ['password-reset-requests'],
    queryFn: () => passwordResetApi.getResetRequests(),
    enabled: canResetPasswords,
    ...options,
  })
  const pendingDocuments = useQuery({
    queryKey: ['pending-documents'],
    queryFn: () => employeeService.getPendingDocuments(),
    enabled: isHr,
    ...options,
  })

  return {
    changeRequests: changeRequests.data?.length,
    passwordResets: passwordResets.data?.filter((r) => r.status === 'PENDING').length,
    pendingDocuments: pendingDocuments.data?.length,
  }
}
