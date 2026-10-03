import { Navigate, Outlet } from 'react-router-dom'
import type { UserRole, UserSummary } from '../../api/types'

interface ProtectedRouteProps {
  children?: React.ReactNode
  allowedRoles?: UserRole[]
  requiredPermission?: string
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  requiredPermission,
}: ProtectedRouteProps) {
  const token = localStorage.getItem('access_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const currentUser: UserSummary | null = (() => {
    try {
      const raw = localStorage.getItem('user_info')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })()

  const userRole: UserRole = currentUser?.role || 'EMPLOYEE'
  const userPermissions = currentUser?.permissions || []

  // Super Admin / Wildcard has access to all routes
  const isSuperAdmin = userRole === 'SUPER_ADMIN' || userPermissions.includes('*')

  if (!isSuperAdmin) {
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" replace />
    }

    if (requiredPermission && !userPermissions.includes(requiredPermission)) {
      if (!allowedRoles || !allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard" replace />
      }
    }
  }

  return children ? <>{children}</> : <Outlet />
}
