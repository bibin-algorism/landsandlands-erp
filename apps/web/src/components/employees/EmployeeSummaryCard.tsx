import type { EmployeeView } from '../../api/types'
import { JOB_TYPE_LABELS, ROLE_LABELS } from '../../constants/employee'
import Avatar from '../common/Avatar'
import StatusBadge from '../common/StatusBadge'
import { formatDate } from './employeeForm'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 min-w-[110px]">
      <div className="text-caption text-secondary">{label}</div>
      <div className="text-body-small font-semibold text-primary">{value}</div>
    </div>
  )
}

/** Identity strip at the top of the employee details and edit pages. */
export default function EmployeeSummaryCard({ employee }: { employee: EmployeeView }) {
  const fullName = `${employee.firstName} ${employee.lastName}`
  const employment = employee.employment
  const status =
    employee.employmentStatus === 'TERMINATED'
      ? { label: 'Terminated', color: 'bg-[#FEE2E2] text-[#B91C1C]' }
      : employee.isIncomplete
        ? { label: 'Incomplete', color: 'bg-[#FEF3C7] text-[#B45309]' }
        : { label: 'Active', color: 'bg-[#DCFCE7] text-[#15803D]' }
  const manager = employment?.reportingAuthority

  return (
    <div className="bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl px-6 py-5 shadow-xs flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <Avatar name={fullName} size={52} colorClass="bg-[#FFEAD5] text-[#C2410C]" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-body-small font-semibold text-primary">
              {employment ? `${ROLE_LABELS[employment.role]} · ${employment.vertical}` : '—'}
            </span>
            <StatusBadge value={status.label} color={status.color} />
          </div>
          <div className="text-body-small text-secondary">
            {employee.communication?.officialEmail ?? '—'} · {employee.communication?.officialPhone ?? '—'}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <Stat label="Employee ID" value={employee.employeeId} />
        <Stat label="Joined" value={formatDate(employment?.joiningDate)} />
        <Stat label="Reports to" value={manager ? `${manager.firstName} ${manager.lastName}` : '—'} />
        <Stat label="Job type" value={employment ? JOB_TYPE_LABELS[employment.jobType] : '—'} />
      </div>
    </div>
  )
}
