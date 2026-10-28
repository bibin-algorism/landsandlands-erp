import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useEmployees } from '../../hooks/useEmployees'
import type { EmployeeListItem } from '../../api/types'
import { getEmployeeColumns } from './employeeColumns'
import { getCurrentRole, isHrEditor } from '../../utils/currentUser'

export default function EmployeesPage() {
  const navigate = useNavigate()
  const role = getCurrentRole()
  const canManage = isHrEditor(role)
  // BRQ-14: the terminated list is visible to HR and the MD only (the API enforces it)
  const canSeeTerminated = canManage || role === 'ADMIN'
  const [activeTab, setActiveTab] = useState<'Active' | 'Incomplete' | 'Terminated'>('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVertical] = useState<string | undefined>()

  const { data: activeEmployees = [] } = useEmployees({ vertical: selectedVertical })
  const { data: terminatedEmployees = [] } = useEmployees({ vertical: selectedVertical, status: 'TERMINATED' })
  const terminatedList = canSeeTerminated ? terminatedEmployees : []

  const activeCount = activeEmployees.length
  const incompleteCount = activeEmployees.filter((e) => e.isIncomplete).length
  const terminatedCount = terminatedList.length

  const tabEmployees =
    activeTab === 'Terminated'
      ? terminatedList
      : activeTab === 'Incomplete'
        ? activeEmployees.filter((e) => e.isIncomplete)
        : activeEmployees
  const totalCount = tabEmployees.length

  const filteredEmployees = tabEmployees.filter((emp) => {
    const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim()
    const email = emp.communicationDetail?.officialEmail || ''
    const phone = emp.communicationDetail?.officialPhone || ''
    const q = searchQuery.trim().toLowerCase()
    return (
      !q ||
      fullName.toLowerCase().includes(q) ||
      emp.employeeId.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      phone.includes(q)
    )
  })

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-12">
        {/* Top Header Row */}
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/employees' },
            { label: 'Employees' },
          ]}
          title="Employees"
          actions={
            <>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 bg-surface-card border border-border-default rounded-xl text-body-small font-medium text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
              >
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>

              {canManage && (
                <button
                  type="button"
                  onClick={() => navigate('/employees/new')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-primary text-body-small font-medium rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add employee
                </button>
              )}
            </>
          }
        />

        {/* Filter Row: Tabs on Left + Search & Filters on Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('Active')}
              className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'Active'
                  ? 'bg-[#18181B] text-white shadow-xs'
                  : 'bg-surface-card text-secondary border border-border-default hover:text-primary'
              }`}
            >
              <span>Active</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeTab === 'Active' ? 'bg-[#27272A] text-amber-300' : 'bg-bg-subtle text-secondary'}`}>
                {activeCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('Incomplete')}
              className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'Incomplete'
                  ? 'bg-[#18181B] text-white shadow-xs'
                  : 'bg-surface-card text-secondary border border-border-default hover:text-primary'
              }`}
            >
              <span>Incomplete</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeTab === 'Incomplete' ? 'bg-[#27272A] text-amber-300' : 'bg-bg-subtle text-secondary'}`}>
                {incompleteCount}
              </span>
            </button>

            {canSeeTerminated && (
              <button
                type="button"
                onClick={() => setActiveTab('Terminated')}
                className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'Terminated'
                    ? 'bg-[#18181B] text-white shadow-xs'
                    : 'bg-surface-card text-secondary border border-border-default hover:text-primary'
                }`}
              >
                <span>Terminated</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeTab === 'Terminated' ? 'bg-[#27272A] text-amber-300' : 'bg-bg-subtle text-secondary'}`}>
                  {terminatedCount}
                </span>
              </button>
            )}
          </div>

          {/* Search & Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <svg className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, ID or phone"
                className="w-full pl-9 pr-4 py-2 bg-surface-card border border-border-default rounded-full text-body-small text-primary placeholder:text-secondary outline-none focus:border-border-strong transition-colors shadow-xs"
              />
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-card border border-border-default rounded-full text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Vertical
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-card border border-border-default rounded-full text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Role
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-card border border-border-default rounded-full text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Job type
            </button>
          </div>
        </div>

        {/* Main Employee Table Glass Card Container */}
        <DataTable<EmployeeListItem>
          data={filteredEmployees}
          keyExtractor={(emp) => emp.id}
          onRowClick={(emp) => navigate(`/employees/${emp.employeeId}`)}
          emptyMessage="No employees found matching criteria."
          columns={getEmployeeColumns()}
          kebabMenuItems={
            canManage && activeTab !== 'Terminated'
              ? () => [
                  {
                    label: 'Edit',
                    icon: (
                      <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    ),
                    onClick: (item) => navigate(`/employees/${item.employeeId}/edit`),
                  },
                ]
              : undefined
          }
          pagination={{
            showingText: `Showing ${filteredEmployees.length > 0 ? 1 : 0}–${filteredEmployees.length} of ${totalCount} employees`,
            isPreviousDisabled: true,
            isNextDisabled: true,
          }}
        />
      </div>
    </AppLayout>
  )
}
