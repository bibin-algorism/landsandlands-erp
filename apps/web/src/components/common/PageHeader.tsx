import React from 'react'
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb'

export function PageTitle({ title }: { title: string }) {
  return <h1 className="text-title text-primary">{title}</h1>
}

export interface PageHeaderProps {
  breadcrumbItems: BreadcrumbItem[]
  title: string
  actions?: React.ReactNode
}

export function PageHeader({ breadcrumbItems, title, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <Breadcrumb items={breadcrumbItems} />
        <PageTitle title={title} />
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}

export default PageHeader
