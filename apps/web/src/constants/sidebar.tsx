import React from 'react'
import type { UserRole } from '../api/types'
import type { ApprovalQueue } from '../hooks/useApprovalCounts'
import employeesIcon from '../assets/icons/employees-icon.svg'
import passwordResetIcon from '../assets/icons/password-reset-icon.svg'

export interface SubMenuItem {
  id: string
  label: string
  path: string
  badgeCount?: number
  /** Live count shown as the badge (Approvals menu). */
  badgeQueue?: ApprovalQueue
  icon?: React.ReactNode
  requiredRoles?: UserRole[]
  requiredPermission?: string
}

export interface MenuItem {
  id: string
  label: string
  path?: string
  icon?: React.ReactNode
  requiredRoles?: UserRole[]
  requiredPermission?: string
  children?: SubMenuItem[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 'sales',
    label: 'Sales & CRM',
    path: '#sales',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'finance',
    label: 'Finance',
    path: '#finance',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'people',
    label: 'People',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    children: [
      {
        id: 'employees',
        label: 'Employees',
        path: '/employees',
        requiredRoles: ['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN', 'VERTICAL_HEAD'],
        icon: <img src={employeesIcon} alt="" className="w-4 h-4 shrink-0" />,
      },
      {
        id: 'clients',
        label: 'Clients',
        path: '/clients',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    // Work waiting for a decision, separate from the People directory
    id: 'approvals',
    label: 'Approvals',
    requiredRoles: ['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN'],
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    children: [
      {
        id: 'change-requests',
        label: 'Change requests',
        path: '/approvals/change-requests',
        badgeQueue: 'changeRequests',
        requiredRoles: ['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN'],
        icon: <img src={employeesIcon} alt="" className="w-4 h-4 shrink-0" />,
      },
      {
        id: 'password-resets',
        label: 'Password resets',
        path: '/approvals/password-resets',
        badgeQueue: 'passwordResets',
        requiredRoles: ['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN'],
        requiredPermission: 'password_resets:read',
        icon: <img src={passwordResetIcon} alt="" className="w-4 h-4 shrink-0" />,
      },
      {
        id: 'pending-documents',
        label: 'Pending documents',
        path: '/approvals/pending-documents',
        badgeQueue: 'pendingDocuments',
        requiredRoles: ['SUPER_ADMIN', 'HR_ADMIN'],
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '#reports',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    // System configuration (not people data)
    id: 'administration',
    label: 'Administration',
    requiredRoles: ['SUPER_ADMIN', 'ADMIN'],
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    children: [
      {
        id: 'roles',
        label: 'Roles & access',
        path: '#roles',
        requiredRoles: ['SUPER_ADMIN', 'ADMIN'],
      },
    ],
  },
]
