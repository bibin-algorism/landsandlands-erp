import type { ReactNode } from 'react'

/** One read-only value on the details page; highlighted right after it was changed. */
export default function InfoTile({
  label,
  children,
  highlighted = false,
  locked = false,
  action,
  wide = false,
}: {
  label: string
  children: ReactNode
  highlighted?: boolean
  locked?: boolean
  action?: ReactNode
  wide?: boolean
}) {
  return (
    <div
      className={`bg-white rounded-2xl px-4 py-3 flex items-start justify-between gap-3 ${
        highlighted ? 'border-2 border-[#FACC15]' : 'border border-transparent'
      } ${wide ? 'sm:col-span-2 lg:col-span-3' : ''}`}
    >
      <div className="min-w-0 space-y-1">
        <div className="text-caption text-secondary flex items-center gap-1">
          {label}
          {locked && <LockIcon />}
        </div>
        <div className="text-body-small font-semibold text-primary break-words">{children ?? '—'}</div>
      </div>
      {action}
    </div>
  )
}

export function LockIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Restricted">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}
