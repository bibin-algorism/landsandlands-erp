import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import DataTable from '../../components/common/DataTable'
import { useClients } from '../../hooks/useClients'
import { getClientColumns } from './clientColumns'
import type { ClientType } from '../../api/types'

export default function ClientsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [clientTypeFilter, setClientTypeFilter] = useState<ClientType | 'ALL'>('ALL')

  const { data: clientsData, isLoading, isError } = useClients({
    search: searchTerm || undefined,
    clientType: clientTypeFilter === 'ALL' ? undefined : clientTypeFilter,
    page: 1,
    limit: 50,
  })

  const clients = clientsData?.data || []
  const columns = getClientColumns()

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        {/* Page Header */}
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/clients' },
            { label: 'Clients', path: '/clients' },
          ]}
          title="Client Management"
          actions={
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate('/clients/add')}
            >
              + Add client
            </Button>
          }
        />

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-card p-4 rounded-2xl border border-border-default shadow-xs">
          <div className="relative w-full sm:w-80">
            <svg
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, code, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-body-small font-medium text-secondary shrink-0">Type:</label>
            <select
              value={clientTypeFilter}
              onChange={(e) => setClientTypeFilter(e.target.value as ClientType | 'ALL')}
              className="px-3 py-2 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
            >
              <option value="ALL">All Types</option>
              <option value="INDIVIDUAL">Individual</option>
              <option value="CORPORATE">Corporate</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-surface-card rounded-2xl border border-border-default shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-secondary font-medium">Loading clients...</div>
          ) : isError ? (
            <div className="p-12 text-center text-red-500 font-medium">Failed to load clients. Please try again.</div>
          ) : (
            <DataTable
              data={clients}
              columns={columns}
              keyExtractor={(row) => row.id}
              emptyMessage="No clients found."
            />
          )}
        </div>
      </div>
    </AppLayout>
  )
}
