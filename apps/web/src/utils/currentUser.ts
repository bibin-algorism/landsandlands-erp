import type { UserRole, UserSummary } from '../api/types'

/** The signed-in user saved at login (UI hints only — the API enforces access). */
export function getCurrentUser(): UserSummary | null {
  try {
    const raw = localStorage.getItem('user_info')
    return raw ? (JSON.parse(raw) as UserSummary) : null
  } catch {
    return null
  }
}

export function getCurrentRole(): UserRole {
  return getCurrentUser()?.role ?? 'EMPLOYEE'
}

/** FR-01 / FR-24: roles that onboard and directly edit employees. */
export const isHrEditor = (role: UserRole = getCurrentRole()) => role === 'HR_ADMIN' || role === 'SUPER_ADMIN'
