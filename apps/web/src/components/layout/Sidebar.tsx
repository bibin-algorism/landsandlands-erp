import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../../hooks/useAuth'
import { logoFull } from '../../utils/images'
import { MENU_ITEMS, type MenuItem, type SubMenuItem } from '../../constants/sidebar'

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useLogout()

  // Track explicit user toggle actions per parent menu ID
  const [userToggled, setUserToggled] = useState<Record<string, boolean>>({})

  const isPathActive = (path?: string) => {
    if (!path) return false
    return location.pathname === path
  }

  const isSubItemActive = (child: SubMenuItem) => {
    if (child.path === '/people/password-reset-requests') {
      return (
        location.pathname === '/people/password-reset-requests' ||
        location.pathname === '/people/password-resets'
      )
    }
    return location.pathname === child.path
  }

  const isParentActive = (item: MenuItem) => {
    if (item.path && isPathActive(item.path)) return true
    if (item.children) {
      return item.children.some((child) => isSubItemActive(child))
    }
    return false
  }

  const toggleExpand = (itemId: string, currentlyExpanded: boolean) => {
    setUserToggled((prev) => ({
      ...prev,
      [itemId]: !currentlyExpanded,
    }))
  }

  return (
    <aside className="p-4 h-screen sticky top-0 flex flex-col shrink-0 select-none">
      <div className="w-64 bg-surface-card border border-border-default rounded-2xl p-5 flex flex-col justify-between h-full shadow-sm">
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="px-2 py-1">
            <img src={logoFull} alt="Lands and Lands" className="h-10 w-auto" />
          </div>

          {/* Main Navigation from Constants */}
          <nav className="space-y-1 text-body-small font-medium">
            {MENU_ITEMS.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const parentActive = isParentActive(item)

              // Expanded if explicitly toggled ON, or if it contains an active sub-item
              const isExpanded =
                userToggled[item.id] !== undefined
                  ? userToggled[item.id]
                  : parentActive

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
                      <div className="mt-1 ml-4 space-y-1 text-body-small animate-in fade-in duration-150">
                        {item.children?.map((child) => {
                          const active = isSubItemActive(child)
                          const isExternalLink = child.path.startsWith('#')

                          const childClasses = `relative flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                            active
                              ? 'bg-brand-subtle text-primary font-semibold'
                              : 'text-secondary hover:text-primary hover:bg-bg-subtle'
                          }`

                          const content = (
                            <>
                              <div className="flex items-center gap-2.5">
                                {active && (
                                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-lg bg-brand-accent" />
                                )}
                                <div className={`flex items-center gap-2.5 ${active ? 'pl-2' : ''}`}>
                                  {child.icon}
                                  <span className={active ? "text-primary text-label" : "text-secondary hover:text-primary hover:bg-bg-subtle text-body-small"}>{child.label}</span>
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
        </div>

        {/* Bottom Navigation & Profile */}
        <div className="space-y-4 pt-4 border-t border-border-default text-body-small">
          <div className="space-y-1">
            <a
              href="#help"
              className="flex items-center gap-3 px-3 py-2 text-secondary rounded-lg hover:bg-bg-subtle hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help & support
            </a>
            <a
              href="#settings"
              className="flex items-center gap-3 px-3 py-2 text-secondary rounded-lg hover:bg-bg-subtle hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </a>
          </div>

          {/* User Card */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-bg-subtle border border-border-default">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E0EAFF] text-[#3538CD] font-semibold text-caption flex items-center justify-center">
                DN
              </div>
              <div className="text-left leading-tight">
                <div className="text-caption font-semibold text-primary">Deepa N</div>
                <div className="text-[11px] text-secondary">HR · Reset admin</div>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              title="Log out"
              className="text-secondary hover:text-primary cursor-pointer p-1 rounded-md hover:bg-surface-card transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
