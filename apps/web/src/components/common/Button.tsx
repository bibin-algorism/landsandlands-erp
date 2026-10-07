import React, { forwardRef } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'dangerSoft'
  | 'danger-soft'
  | 'danger'
  | 'ghost'

export type ButtonSize = 'medium' | 'small'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  leftIcon?: React.ReactNode
  showIcon?: boolean
  isLoading?: boolean
  label?: string
  children?: React.ReactNode
  isFocusedState?: boolean // For preview/showcase simulation
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      icon,
      leftIcon,
      showIcon = true,
      isLoading = false,
      label,
      children,
      disabled = false,
      isFocusedState = false,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const activeIcon = leftIcon || icon
    const displayIcon = showIcon && activeIcon
    const content = label ?? children

    const normalizedVariant = variant === 'danger-soft' ? 'dangerSoft' : variant

    const baseClasses =
      'inline-flex items-center justify-center gap-2 rounded-[10px] py-0 transition-all shrink-0 select-none box-border outline-none focus-visible:ring-0 focus-visible:shadow-[0_0_0_2px_#FEC74E,0_0_0_3px_#1A1A1A]'

    const sizeClasses =
      size === 'medium'
        ? 'h-[42px] px-[22px] text-[13px] leading-[18px] font-medium'
        : 'h-[34px] px-[14px] text-[12px] leading-[16px] font-normal'

    const iconSizeClasses = size === 'medium' ? 'w-4 h-4' : 'w-[14px] h-[14px]'

    let variantClasses = ''

    if (disabled || isLoading) {
      variantClasses =
        'bg-[#F3F1ED] text-[#B6AEA3] border border-[#E7E3DD] cursor-not-allowed pointer-events-none'
    } else {
      switch (normalizedVariant) {
        case 'primary':
          variantClasses =
            'bg-[#FEC74E] text-[#1A1A1A] border-0 hover:bg-[#D99D28] active:bg-[#D99D28] cursor-pointer'
          break
        case 'secondary':
          variantClasses =
            'bg-white text-[#1A1A1A] border border-[#D5D0C7] hover:bg-[#FAF9F7] active:bg-[#FAF9F7] cursor-pointer'
          break
        case 'dangerSoft':
          variantClasses =
            'bg-[#FEF3F2] text-[#B42318] border-0 hover:bg-[#FEE4E2] active:bg-[#FEE4E2] cursor-pointer'
          break
        case 'danger':
          variantClasses =
            'bg-[#D92D20] text-white border-0 hover:bg-[#B42318] active:bg-[#B42318] cursor-pointer'
          break
        case 'ghost':
          variantClasses =
            'bg-transparent text-[#1A1A1A] border-0 hover:bg-[#FAF9F7] active:bg-[#FAF9F7] cursor-pointer'
          break
      }
    }

    const focusSimClasses = isFocusedState ? 'shadow-[0_0_0_2px_#FEC74E,0_0_0_3px_#1A1A1A]' : ''

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${focusSimClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className={`animate-spin ${iconSizeClasses} shrink-0`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          displayIcon && (
            <span className={`inline-flex items-center justify-center shrink-0 ${iconSizeClasses}`}>
              {displayIcon}
            </span>
          )
        )}
        {content && <span>{content}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
