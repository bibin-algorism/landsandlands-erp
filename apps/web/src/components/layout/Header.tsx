import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useAuth'
import { useEmployeeDetails } from '../../hooks/useEmployees'
import { getCurrentUser } from '../../utils/currentUser'
import type { UserRole } from '../../api/types'

const ROLE_NAMES: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  HR_ADMIN: 'HR',
  VERTICAL_HEAD: 'Vertical Head',
  EMPLOYEE: 'Employee',
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { logout } = useLogout()
  const user = getCurrentUser()
  const { data: me } = useEmployeeDetails('me')

  const displayName = me ? `${me.firstName} ${me.lastName}` : (user?.identifier ?? 'User')
  const initials = me
    ? `${me.firstName[0] ?? ''}${me.lastName[0] ?? ''}`.toUpperCase()
    : (user?.identifier ?? 'U').slice(0, 2).toUpperCase()
  const subtitle = [user?.role ? ROLE_NAMES[user.role] : null, me?.employeeId ?? user?.identifier]
    .filter(Boolean)
    .join(' · ')

  const go = (path: string) => {
    setMenuOpen(false)
    navigate(path)
  }

  // Close dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-16 px-8 flex items-center justify-between bg-bg-canvas border-b border-border-default shrink-0">
      {/* Search Input */}
      <div className="relative w-96">
        <svg
          className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-disabled"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search employees, units, customers..."
          className="w-full pl-10 pr-4 py-2 bg-surface-card border border-border-default rounded-full text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors shadow-xs"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative w-9 h-9 rounded-full bg-surface-card border border-border-default flex items-center justify-center text-secondary hover:text-primary transition-colors cursor-pointer shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-accent border border-surface-card" />
        </button>

        {/* User Profile Avatar with Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-[#E0EAFF] text-[#3538CD] font-semibold text-caption border border-[#B2DDFF] flex items-center justify-center cursor-pointer shadow-xs hover:ring-2 hover:ring-[#B2DDFF] transition-all"
            title="User Profile"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            {initials}
          </button>

          {/* User Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-card border border-border-default rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2.5 border-b border-border-default">
                <p className="text-body-small font-semibold text-primary">{displayName}</p>
                <p className="text-caption text-secondary">{subtitle}</p>
              </div>

              {me && (
                <div className="py-1 border-b border-border-default">
                  <button
                    type="button"
                    onClick={() => go('/my-profile')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-body-small text-primary hover:bg-bg-subtle transition-colors cursor-pointer text-left font-medium"
                  >
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>My profile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go('/my-profile/change-requests')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-body-small text-primary hover:bg-bg-subtle transition-colors cursor-pointer text-left font-medium"
                  >
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span>My change requests</span>
                  </button>
                </div>
              )}

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    logout()
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-body-small text-red-600 hover:bg-bg-subtle transition-colors cursor-pointer text-left font-medium"
                >
                  <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
