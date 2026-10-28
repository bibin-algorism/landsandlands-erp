import StatusBadge from '../common/StatusBadge'
import type { ChangeRequest } from '../../api/types'

const STYLES: Record<ChangeRequest['status'], { label: string; color: string }> = {
  PENDING_REVIEW: { label: 'Awaiting review', color: 'bg-[#E0E7FF] text-[#4338CA]' },
  QUERY_SENT: { label: 'Queried', color: 'bg-[#FEF3C7] text-[#B45309]' },
  APPROVED: { label: 'Approved', color: 'bg-[#DCFCE7] text-[#15803D]' },
  REJECTED: { label: 'Rejected', color: 'bg-[#FEE2E2] text-[#B91C1C]' },
  CANCELLED: { label: 'Withdrawn', color: 'bg-bg-subtle text-secondary' },
}

export default function ChangeRequestStatusBadge({ request }: { request: Pick<ChangeRequest, 'status' | 'isOverdue'> }) {
  const style = STYLES[request.status]
  return (
    <span className="inline-flex items-center gap-1.5">
      <StatusBadge value={style.label} color={style.color} />
      {request.isOverdue && <StatusBadge value="Overdue" color="bg-[#FEE2E2] text-[#B91C1C]" />}
    </span>
  )
}
