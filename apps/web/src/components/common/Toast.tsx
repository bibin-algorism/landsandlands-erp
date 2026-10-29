import { useEffect, useRef, type ReactNode } from 'react'

/** Dark confirmation pill at the bottom of the page; disappears after a few seconds. */
export default function Toast({ children, onClose, durationMs = 6000 }: { children: ReactNode; onClose: () => void; durationMs?: number }) {
  // Keep the latest callback without restarting the timer on every render.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })
  useEffect(() => {
    const timer = setTimeout(() => onCloseRef.current(), durationMs)
    return () => clearTimeout(timer)
  }, [durationMs])

  return (
    <div
      role="status"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#18181B] text-white rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3 text-body-small"
    >
      <span className="w-5 h-5 rounded-full bg-[#FACC15] text-[#18181B] flex items-center justify-center text-[11px] font-bold">
        ✓
      </span>
      {children}
    </div>
  )
}
