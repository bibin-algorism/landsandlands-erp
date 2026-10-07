import { useNavigate } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  path?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate()

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption text-tertiary font-medium">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-secondary/50">/</span>}
            {item.path && !isLast ? (
              <button
                type="button"
                onClick={() => navigate(item.path!)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <span className={isLast ? 'text-tertiary font-semibold' : ''}>{item.label}</span>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
