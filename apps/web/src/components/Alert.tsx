import type { ReactNode } from 'react'
import {
  iconCheckGreenCircle,
  iconInfoBlueCircle,
  iconWarningCircle,
} from '../utils/images'

export type AlertVariant = 'success' | 'info' | 'error' | 'warning'

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  message?: ReactNode
  className?: string
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; icon: string }> = {
  error: {
    bg: 'bg-[#FEF3F2]',
    border: 'border-[#FECDCA]',
    icon: iconWarningCircle,
  },
  warning: {
    bg: 'bg-[#FFFAEB]',
    border: 'border-[#FEDF89]',
    icon: iconWarningCircle,
  },
  success: {
    bg: 'bg-[#ECFDF3]',
    border: 'border-[#ABE5C6]',
    icon: iconCheckGreenCircle,
  },
  info: {
    bg: 'bg-[#F0F9FF]',
    border: 'border-[#B2DDFF]',
    icon: iconInfoBlueCircle,
  },
}

export default function Alert({
  variant = 'error',
  title = "Employee code or password doesn't match",
  message,
  className = '',
}: AlertProps) {
  const styles = variantStyles[variant] || variantStyles.error

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-xl p-3.5 flex items-start gap-3 ${className}`}>
      <img src={styles.icon} alt={variant} className="w-5 h-5 shrink-0 mt-0.5 select-none" />
      <div className="space-y-0.5">
        {title && (
          <p className="text-caption font-semibold text-primary">
            {title}
          </p>
        )}
        {message && (
          <p className="text-caption text-secondary">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
