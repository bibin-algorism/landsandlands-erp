import { useEffect } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

const APP_TITLE = 'L&L - ERP'

/** First match wins, so literal segments (e.g. /employees/new) sit above their :param siblings. */
const PAGE_TITLES: [pattern: string, title: string][] = [
  ['/', 'Login'],
  ['/login', 'Login'],
  ['/forgot-password', 'Forgot password'],
  ['/reset-password', 'Reset password'],
  ['/set-password', 'Set password'],
  ['/design-system', 'Design system'],
  ['/design-system/buttons', 'Buttons'],
  ['/dashboard', 'Dashboard'],
  ['/my-profile', 'My profile'],
  ['/my-profile/change-requests', 'My change requests'],
  ['/my-profile/change-requests/new', 'Request a change'],
  ['/employees/new', 'Add employee'],
  ['/employees/:employeeId/edit', 'Edit employee'],
  ['/employees', 'Employees'],
  ['/people/employees', 'Employees'],
  ['/employees/:employeeId', 'Employee details'],
  ['/people/employees/:employeeId', 'Employee details'],
  ['/approvals/change-requests', 'Change requests'],
  ['/approvals/change-requests/:id', 'Change request'],
  ['/approvals/password-resets', 'Password resets'],
  ['/approvals/pending-documents', 'Pending documents'],
  ['/clients/add', 'Add client'],
  ['/people/clients/add', 'Add client'],
  ['/clients', 'Clients'],
  ['/people/clients', 'Clients'],
  ['/clients/:clientId', 'Client details'],
  ['/people/clients/:clientId', 'Client details'],
]

/** Sets the browser tab title to "L&L - ERP | <page>" on every navigation. */
export default function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = PAGE_TITLES.find(([pattern]) => matchPath(pattern, pathname))?.[1]
    document.title = page ? `${APP_TITLE} | ${page}` : APP_TITLE
  }, [pathname])

  return null
}
