import React, { useState, useEffect } from 'react'

export interface Column<T> {
  key: string
  header: React.ReactNode
  headerClassName?: string
  cellClassName?: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (row: T, index: number) => React.ReactNode
}

export interface KebabMenuItem<T> {
  label: string
  icon?: React.ReactNode
  variant?: 'default' | 'danger'
  onClick: (row: T) => void
}

export interface TablePaginationProps {
  showingText?: React.ReactNode
  onPrevious?: () => void
  onNext?: () => void
  isPreviousDisabled?: boolean
  isNextDisabled?: boolean
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string | number
  onRowClick?: (row: T) => void
  kebabMenuItems?: (row: T) => KebabMenuItem<T>[]
  renderActionsColumn?: (row: T) => React.ReactNode
  emptyMessage?: string
  minWidth?: string
  pagination?: TablePaginationProps | React.ReactNode
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  kebabMenuItems,
  renderActionsColumn,
  emptyMessage = 'No data found.',
  minWidth = '800px',
  pagination,
}: DataTableProps<T>) {
  const [activeMenuKey, setActiveMenuKey] = useState<string | number | null>(null)

  // Close active dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuKey(null)
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const hasActions = Boolean(kebabMenuItems || renderActionsColumn)

  return (
    <div className="bg-surface-glass backdrop-blur-xs border border-border-default/80 rounded-3xl p-4 sm:p-6 shadow-xs overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2.5 text-left" style={{ minWidth }}>
        <thead>
          <tr className="text-caption font-semibold text-secondary">
            {columns.map((col, idx) => {
              const isFirst = idx === 0
              const isLast = idx === columns.length - 1 && !hasActions
              const alignClass = col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
              const paddingClass = isFirst ? 'pl-4 pr-3 py-2' : isLast ? 'pr-4 pl-3 py-2' : 'px-3 py-2'

              return (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : undefined}
                  className={`${paddingClass} text-caption text-secondary ${alignClass} ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              )
            })}
            {hasActions && <th className="pr-4 pl-3 py-2 text-right"></th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => {
              const rowKey = keyExtractor(row, rowIndex)
              const isMenuOpen = activeMenuKey === rowKey

              return (
                <tr
                  key={rowKey}
                  onClick={() => onRowClick?.(row)}
                  className={`group ${onRowClick ? 'cursor-pointer' : ''} transition-all`}
                >
                  {columns.map((col, colIdx) => {
                    const isFirst = colIdx === 0
                    const isLast = colIdx === columns.length - 1 && !hasActions

                    let baseBorderPadding = 'h-[60px] px-3 py-2 bg-white border-y border-border-default/60 group-hover:bg-bg-subtle/50 transition-colors'
                    if (isFirst) {
                      baseBorderPadding =
                        'h-[60px] pl-4 pr-3 py-2 bg-white border-y border-l border-border-default/60 rounded-l-[10px] group-hover:bg-bg-subtle/50 transition-colors'
                    } else if (isLast) {
                      baseBorderPadding =
                        'h-[60px] pr-4 pl-3 py-2 bg-white border-y border-r border-border-default/60 rounded-r-[10px] text-right group-hover:bg-bg-subtle/50 transition-colors'
                    }

                    const alignClass = col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''

                    return (
                      <td key={col.key} className={`${baseBorderPadding} ${alignClass} ${col.cellClassName || ''}`}>
                        {col.render ? col.render(row, rowIndex) : (row as any)[col.key]}
                      </td>
                    )
                  })}

                  {hasActions && (
                    <td className="h-[60px] pr-4 pl-3 py-2 bg-white border-y border-r border-border-default/60 rounded-r-[10px] text-right group-hover:bg-bg-subtle/50 transition-colors">
                      <div className="flex items-center justify-end gap-2 relative">
                        {renderActionsColumn && renderActionsColumn(row)}

                        {kebabMenuItems && (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveMenuKey(isMenuOpen ? null : rowKey)
                              }}
                              className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>

                            {isMenuOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-border-default z-30 py-1 animate-in fade-in zoom-in-95 duration-150 text-left"
                              >
                                {kebabMenuItems(row).map((menuItem, itemIdx) => {
                                  const isDanger = menuItem.variant === 'danger'
                                  return (
                                    <button
                                      key={itemIdx}
                                      type="button"
                                      onClick={() => {
                                        setActiveMenuKey(null)
                                        menuItem.onClick(row)
                                      }}
                                      className={`w-full px-3.5 py-2 text-body-small font-medium flex items-center gap-2 cursor-pointer ${
                                        isDanger
                                          ? 'text-red-600 hover:bg-red-50'
                                          : 'text-primary hover:bg-bg-subtle'
                                      }`}
                                    >
                                      {menuItem.icon}
                                      {menuItem.label}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="h-24 bg-white border border-border-default/60 rounded-[10px] text-center text-secondary"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pagination && (
        <div className="pt-4 px-2 flex items-center justify-between border-t border-border-default/40 mt-2">
          {React.isValidElement(pagination) ? (
            pagination
          ) : (
            <>
              <div className="text-caption text-secondary font-medium">
                {(pagination as TablePaginationProps).showingText}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(pagination as TablePaginationProps).onPrevious}
                  disabled={(pagination as TablePaginationProps).isPreviousDisabled}
                  className={`px-4 py-2 border border-border-default rounded-xl text-caption font-semibold transition-colors shadow-xs ${
                    (pagination as TablePaginationProps).isPreviousDisabled
                      ? 'border-border-default/80 bg-[#F4F4F5]/50 text-secondary opacity-50 cursor-not-allowed'
                      : 'bg-white text-primary hover:bg-bg-subtle cursor-pointer'
                  }`}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={(pagination as TablePaginationProps).onNext}
                  disabled={(pagination as TablePaginationProps).isNextDisabled}
                  className={`px-4 py-2 border border-border-default rounded-xl text-caption font-semibold transition-colors shadow-xs ${
                    (pagination as TablePaginationProps).isNextDisabled
                      ? 'border-border-default/80 bg-[#F4F4F5]/50 text-secondary opacity-50 cursor-not-allowed'
                      : 'bg-white text-primary hover:bg-bg-subtle cursor-pointer'
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default DataTable
