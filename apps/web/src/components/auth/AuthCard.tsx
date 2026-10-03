import type { ReactNode } from 'react'
import { logoFull } from '../../utils/images'

export interface AuthCardProps {
  children: ReactNode
  topAction?: ReactNode
  className?: string
}

export default function AuthCard({ children, topAction, className = '' }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-bg-canvas flex flex-col items-center justify-center p-4">
      <div className={`w-full max-w-[420px] bg-surface-card border border-border-default rounded-2xl p-8 sm:p-10 shadow-sm space-y-6 ${className}`}>
        {/* Optional top action above logo */}
        {topAction && <div className="-mb-2">{topAction}</div>}

        {/* Logo */}
        <div className="text-center pt-2 pb-2">
          <img src={logoFull} alt="Lands and Lands Logo" className="mx-auto h-16 w-auto" />
        </div>

        {/* Dynamic Content */}
        {children}
      </div>

      {/* Footer text */}
      <div className="mt-6 text-center text-caption text-secondary">
        Trouble signing in?{' '}
        <a href="#hr" className="underline text-primary font-medium hover:opacity-80">
          Contact HR
        </a>{' '}
        · L&L ERP · Version 5.0
      </div>
    </div>
  )
}
