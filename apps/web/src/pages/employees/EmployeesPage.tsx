import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import { useEmployees } from '../../hooks/useEmployees'
import type { EmployeeListItem } from '../../api/types'
import { getEmployeeColumns } from './employeeColumns'

export default function EmployeesPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Incomplete' | 'Terminated'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVertical] = useState<string | undefined>()

  const { data: apiEmployees } = useEmployees(selectedVertical)
  const employeeList = apiEmployees || []

  const totalCount = employeeList.length
  const activeCount = employeeList.filter(e => (e.onboardingStatus || e.employmentStatus) === 'Active' || e.employmentStatus === 'ACTIVE').length
  const incompleteCount = employeeList.filter(e => e.onboardingStatus === 'Incomplete').length
  const terminatedCount = employeeList.filter(e => e.onboardingStatus === 'Terminated' || e.employmentStatus === 'TERMINATED').length

  const filteredEmployees = employeeList.filter((emp) => {
    const status = emp.onboardingStatus || emp.employmentStatus || 'ACTIVE'
    const matchesTab =
      activeTab === 'All'
        ? true
        : activeTab === 'Active'
        ? status === 'Active' || status === 'ACTIVE'
        : activeTab === 'Incomplete'
        ? status === 'Incomplete'
        : status === 'Terminated' || status === 'TERMINATED'

    const fullName = emp.fullName || `${emp.firstName || ''} ${emp.lastName || ''}`.trim()
    const email = emp.communicationDetail?.officialEmail || emp.communicationDetail?.personalEmail || emp.email || ''
    const phone = emp.communicationDetail?.officialPhone || emp.communicationDetail?.personalPhone || emp.phone || ''

    const matchesSearch =
      !searchQuery.trim() ||
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.includes(searchQuery)

    return matchesTab && matchesSearch
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
            </>
          }
        />

        {/* Filter Row: Tabs on Left + Search & Filters on Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('All')}
              className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'All'
                  ? 'bg-[#18181B] text-white shadow-xs'
                  : 'bg-surface-card text-secondary border border-border-default hover:text-primary'
              }`}
            >
              <span>All</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeTab === 'All' ? 'bg-[#27272A] text-amber-300' : 'bg-bg-subtle text-secondary'}`}>
                {totalCount}
              </span>
            </button>

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
          kebabMenuItems={() => [
            {
              label: 'Edit',
              icon: (
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ),
              onClick: (item) => navigate(`/employees/${item.employeeId}/edit`),
            },
            {
              label: 'Delete',
              variant: 'danger',
              icon: (
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              ),
              onClick: (_item) => {
                // handle delete action
              },
            },
          ]}
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
