import type { Column } from '../../components/common/DataTable'
import type { EmployeeListItem, EmployeeRoleType } from '../../api/types'
import { ROLE_LABELS } from '../../constants/employee'
import Avatar from '../../components/common/Avatar'
import StatusBadge from '../../components/common/StatusBadge'

const AVATAR_COLORS = [
  'bg-[#FFEAD5] text-[#D97706]',
  'bg-[#E0E7FF] text-[#4F46E5]',
  'bg-[#DCFCE7] text-[#15803D]',
  'bg-[#F3E8FF] text-[#9333EA]',
]

export const getEmployeeColumns = (): Column<EmployeeListItem>[] => [
  {
    key: 'employee',
    header: 'Employee',
    render: (emp, idx) => {
      const colorClass = AVATAR_COLORS[idx % AVATAR_COLORS.length]
      const firstName = emp.firstName || ''
      const lastName = emp.lastName || ''
      const fullName = emp.fullName || `${firstName} ${lastName}`.trim() || 'Employee'

      const email =
        emp.communicationDetail?.personalEmail ||
        emp.communicationDetail?.officialEmail ||
        emp.email ||
        '-'

      return (
        <div className="flex items-center gap-3.5">
          <Avatar
            name={fullName}
            size={36}
            colorClass={colorClass}
            className="text-caption font-bold"
          />
          <div className="min-w-0">
            <div className="text-primary truncate text-label group-hover:text-primary transition-colors">
              {fullName}
            </div>
            <div className="text-[12px] text-caption truncate text-secondary">{email}</div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'employeeId',
    header: 'Employee ID',
    cellClassName: 'text-body-small text-primary',
    render: (emp) => emp.employeeId || '-',
  },
  {
    key: 'vertical',
    header: 'Vertical',
    cellClassName: 'text-body-small text-primary capitalize',
    render: (emp) => emp.employmentDetail?.vertical || emp.vertical || '-',
  },
  {
    key: 'role',
    header: 'Role',
    cellClassName: 'text-body-small font-medium text-primary capitalize',
    render: (emp) => {
      const role = (emp.employmentDetail?.role || emp.role) as EmployeeRoleType | undefined
      return role ? (ROLE_LABELS[role] ?? role) : '-'
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: (emp) => {
      if (emp.employmentStatus === 'TERMINATED') {
        return <StatusBadge value="Terminated" color="bg-[#FEE2E2] text-[#B91C1C]" />
      }
      // FR-07: a previous-organisation document is still due
      if (emp.isIncomplete) {
        return <StatusBadge value="Incomplete" color="bg-[#FEF3C7] text-[#B45309]" />
      }
      return <StatusBadge value="Active" color="bg-[#DCFCE7] text-[#15803D]" />
    },
  },
]
