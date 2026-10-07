import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../../hooks/useAuth'
import { logoFull, logoRail } from '../../utils/images'
import { MENU_ITEMS, type MenuItem, type SubMenuItem } from '../../constants/sidebar'
import type { UserSummary, UserRole } from '../../api/types'

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useLogout()

  // Collapse / Rail mode toggle state with persistence
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true'
  })

  // Track explicit user toggle actions per parent menu ID in expanded mode
  const [userToggled, setUserToggled] = useState<Record<string, boolean>>({})

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('sidebar_collapsed', String(next))
      return next
    })
  }

  // Read logged-in user details from localStorage
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

  const hasAccess = (item: { requiredRoles?: UserRole[]; requiredPermission?: string }) => {
    if (userRole === 'SUPER_ADMIN' || userPermissions.includes('*')) return true
    if (item.requiredRoles && item.requiredRoles.length > 0) {
      if (!item.requiredRoles.includes(userRole)) return false
    }
    if (item.requiredPermission && !userPermissions.includes(item.requiredPermission)) {
      if (item.requiredRoles && item.requiredRoles.includes(userRole)) return true
      return false
    }
    return true
  }

  const isPathActive = (path?: string) => {
    if (!path || path.startsWith('#')) return false
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const isSubItemActive = (child: SubMenuItem) => {
    if (!child.path || child.path.startsWith('#')) return false
    if (child.path === '/people/password-reset-requests') {
      return (
        location.pathname === '/people/password-reset-requests' ||
        location.pathname.startsWith('/people/password-reset-requests/') ||
        location.pathname === '/people/password-resets' ||
        location.pathname.startsWith('/people/password-resets/')
      )
    }
    return location.pathname === child.path || location.pathname.startsWith(`${child.path}/`)
  }

  const isParentActive = (item: MenuItem) => {
    if (item.path && isPathActive(item.path)) return true
    if (item.children) {
      return item.children.some((child) => hasAccess(child) && isSubItemActive(child))
    }
    return false
  }

  const toggleExpand = (itemId: string, currentlyExpanded: boolean) => {
    setUserToggled((prev) => ({
      ...prev,
      [itemId]: !currentlyExpanded,
    }))
  }

  const getPrimaryPath = (item: MenuItem) => {
    if (item.path && !item.path.startsWith('#')) return item.path
    if (item.children && item.children.length > 0) {
      const firstValidChild = item.children.find((c) => hasAccess(c) && !c.path.startsWith('#'))
      if (firstValidChild) return firstValidChild.path
    }
    return item.path || '#'
  }

  return (
    <aside
      className={`p-4 h-screen sticky top-0 flex flex-col shrink-0 select-none transition-all duration-300 ${
        isCollapsed ? 'w-24' : 'w-72'
      }`}
    >
      <div
        className={`bg-surface-card border border-border-default rounded-3xl flex flex-col justify-between h-full shadow-sm transition-all duration-300 ${
          isCollapsed ? 'p-3.5 items-center' : 'p-5'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="w-full space-y-6">
          {/* Brand Logo & Collapse Toggle */}
          <div
            className={`flex items-center ${
              isCollapsed ? 'justify-center flex-col gap-3' : 'justify-between'
            } px-1 py-1`}
          >
            {isCollapsed ? (
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={logoRail} alt="Lands and Lands" className="h-8 w-auto" />
              </div>
            ) : (
              <img src={logoFull} alt="Lands and Lands" className="h-10 w-auto" />
            )}

            {/* Sidebar View Switch / Toggle Button */}
            <button
              type="button"
              onClick={toggleSidebar}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse to rail view'}
              className="p-2 rounded-xl text-secondary hover:text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  isCollapsed ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          {isCollapsed ? (
            /* RAIL VIEW NAVIGATION */
            <nav className="flex flex-col items-center gap-3.5 w-full pt-2">
              {MENU_ITEMS.filter(hasAccess).map((item) => {
                const parentActive = isParentActive(item)
                const targetPath = getPrimaryPath(item)

                return (
                  <Link
                    key={item.id}
                    to={targetPath}
                    title={item.label}
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                      parentActive
                        ? 'bg-[#1C1C1E] text-white shadow-sm'
                        : 'text-secondary hover:text-primary hover:bg-bg-subtle'
                    }`}
                  >
                    {item.icon}
                    {parentActive && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#EAB308]" />
                    )}
                  </Link>
                )
              })}
            </nav>
          ) : (
            /* EXPANDED VIEW NAVIGATION */
            <nav className="space-y-1 text-body-small font-medium">
              {MENU_ITEMS.filter(hasAccess).map((item) => {
                const visibleChildren = item.children?.filter(hasAccess) || []
                const hasChildren = visibleChildren.length > 0
                const parentActive = isParentActive(item)
                const isExpanded = parentActive || (userToggled[item.id] ?? false)

                if (hasChildren) {
                  return (
                    <div key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id, isExpanded)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                          parentActive
                            ? 'bg-primary text-white font-semibold'
                            : 'text-secondary hover:bg-bg-subtle hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Collapsible Sub-menu */}
                      {isExpanded && (
                        <div className="mt-1 space-y-1 text-body-small animate-in fade-in duration-150">
                          {visibleChildren.map((child) => {
                            const active = isSubItemActive(child)
                            const isExternalLink = child.path.startsWith('#')

                            const childClasses = `relative flex items-center justify-between pl-4 pr-3 py-2 h-10 rounded-[8px] transition-all ${
                              active
                                ? 'bg-brand-subtle text-primary font-semibold'
                                : 'text-secondary hover:text-primary hover:bg-bg-subtle'
                            }`

                            const content = (
                              <>
                                <div className="flex items-center gap-2.5">
                                  {active && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded bg-brand-accent" />
                                  )}
                                  <div className="flex items-center gap-2.5">
                                    {child.icon}
                                    <span
                                      className={
                                        active
                                          ? 'text-primary text-label font-semibold'
                                          : 'text-secondary hover:text-primary text-body-small'
                                      }
                                    >
                                      {child.label}
                                    </span>
                                  </div>
                                </div>
                                {child.badgeCount !== undefined && (
                                  <span className="bg-brand-accent text-primary text-[11px] font-bold py-0.5 px-2 rounded-full">
                                    {child.badgeCount}
                                  </span>
                                )}
                              </>
                            )

                            return isExternalLink ? (
                              <a key={child.id} href={child.path} className={childClasses}>
                                {content}
                              </a>
                            ) : (
                              <Link key={child.id} to={child.path} className={childClasses}>
                                {content}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                // Single Menu Item
                const active = isPathActive(item.path)
                const isExternalLink = item.path?.startsWith('#')
                const itemClasses = `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? 'bg-primary text-white font-semibold'
                    : 'text-secondary hover:bg-bg-subtle hover:text-primary'
                }`

                return isExternalLink ? (
                  <a key={item.id} href={item.path} className={itemClasses}>
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <Link key={item.id} to={item.path || '#'} className={itemClasses}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          )}
        </div>

        {/* Bottom Section */}
        {isCollapsed ? (
          /* RAIL VIEW BOTTOM ITEMS */
          <div className="flex flex-col items-center gap-3.5 w-full pt-4 border-t border-border-default">
            <a
              href="#help"
              title="Help & support"
              className="w-10 h-10 rounded-xl text-secondary hover:text-primary hover:bg-bg-subtle flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
            <a
              href="#settings"
              title="Settings & Theme"
              className="w-10 h-10 rounded-xl text-secondary hover:text-primary hover:bg-bg-subtle flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </a>
            <div
              title={currentUser?.identifier || 'User'}
              className="w-10 h-10 rounded-full bg-[#E0EAFF] text-[#3538CD] font-bold text-caption flex items-center justify-center cursor-pointer shadow-xs"
              onClick={logout}
            >
              {currentUser?.identifier?.slice(-2).toUpperCase() || 'DN'}
            </div>
          </div>
        ) : (
          /* EXPANDED VIEW BOTTOM ITEMS */
          <div className="space-y-4 pt-4 border-t border-border-default text-body-small">
            <div className="space-y-1">
              <a
                href="#help"
                className="flex items-center gap-3 px-3 py-2 text-secondary rounded-lg hover:bg-bg-subtle hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Help & support
              </a>
              <a
                href="#settings"
                className="flex items-center gap-3 px-3 py-2 text-secondary rounded-lg hover:bg-bg-subtle hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </a>
            </div>

            {/* User Card */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-bg-subtle border border-border-default">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E0EAFF] text-[#3538CD] font-semibold text-caption flex items-center justify-center">
                  {currentUser?.identifier?.slice(-2).toUpperCase() || 'US'}
                </div>
                <div className="text-left leading-tight">
                  <div className="text-caption font-semibold text-primary">
                    {currentUser?.identifier || 'User'}
                  </div>
                  <div className="text-[11px] text-secondary capitalize">
                    {userRole.replace('_', ' ').toLowerCase()}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Log out"
                className="text-secondary hover:text-primary cursor-pointer p-1 rounded-md hover:bg-surface-card transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
