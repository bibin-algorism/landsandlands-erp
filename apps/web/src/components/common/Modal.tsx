import type { ReactNode } from 'react'

/** Centred dialog over a dimmed page. Clicking the backdrop calls onClose. */
export default function Modal({
  children,
  onClose,
  width = 'max-w-lg',
}: {
  children: ReactNode
  onClose: () => void
  width?: string
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={`bg-white rounded-3xl p-7 w-full ${width} shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto text-left`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
