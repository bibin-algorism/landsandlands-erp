import React from 'react'

export interface AvatarProps {
  name?: string
  src?: string
  alt?: string
  size?: number | string
  width?: number | string
  height?: number | string
  colorClass?: string
  className?: string
  fontSize?: string | number
}

const DEFAULT_AVATAR_COLORS = [
  'bg-[#FFEAD5] text-[#D97706]',
  'bg-[#E0E7FF] text-[#4F46E5]',
  'bg-[#DCFCE7] text-[#15803D]',
  'bg-[#F3E8FF] text-[#9333EA]',
]

export const getInitials = (name?: string): string => {
  if (!name) return 'EE'
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return 'EE'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Avatar({
  name,
  src,
  alt,
  size = 40,
  width,
  height,
  colorClass,
  className = '',
  fontSize,
}: AvatarProps) {
  const finalWidth = width ?? size
  const finalHeight = height ?? size

  const styleWidth = typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth
  const styleHeight = typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight
  const styleFontSize = fontSize ? (typeof fontSize === 'number' ? `${fontSize}px` : fontSize) : undefined

  // Pick deterministic fallback background color if colorClass not provided
  const fallbackColorClass = React.useMemo(() => {
    if (colorClass) return colorClass
    if (!name) return DEFAULT_AVATAR_COLORS[0]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % DEFAULT_AVATAR_COLORS.length
    return DEFAULT_AVATAR_COLORS[index]
  }, [colorClass, name])

  const initials = getInitials(name)

  return (
    <div
      style={{
        width: styleWidth,
        height: styleHeight,
        fontSize: styleFontSize,
      }}
      className={`rounded-full flex items-center justify-center shrink-0 overflow-hidden font-medium ${
        src ? 'bg-bg-subtle' : fallbackColorClass
      } ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export default Avatar
