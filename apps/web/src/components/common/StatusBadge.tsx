import React from 'react'

export interface StatusBadgeProps {
  value?: React.ReactNode
  label?: React.ReactNode
  children?: React.ReactNode
  color?: string
  bgClass?: string
  textClass?: string
  width?: number | string
  height?: number | string
  className?: string
  icon?: React.ReactNode
}

export function StatusBadge({
  value,
  label,
  children,
  color,
  bgClass,
  textClass,
  width,
  height = 24,
  className = '',
  icon,
}: StatusBadgeProps) {
  const content = value ?? label ?? children

  const styleWidth = width ? (typeof width === 'number' ? `${width}px` : width) : undefined
  const styleHeight = height ? (typeof height === 'number' ? `${height}px` : height) : undefined

  // If color is a full class combination like "bg-green-100 text-green-700" or custom
  const colorStyles = color || `${bgClass || ''} ${textClass || ''}`.trim() || 'bg-[#DCFCE7] text-[#15803D]'

  return (
    <span
      style={{
        width: styleWidth,
        height: styleHeight,
      }}
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-semibold shrink-0 select-none ${colorStyles} ${className}`}
    >
      {icon}
      {content}
    </span>
  )
}

export default StatusBadge
