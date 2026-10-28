import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../../components/layout/AppLayout'
import PageHeader from '../../../components/common/PageHeader'
import ErrorAlert from '../../../components/ErrorAlert'
import ChangeRequestStatusBadge from '../../../components/employees/ChangeRequestStatusBadge'
import { useChangeRequestQueue } from '../../../hooks/useChangeRequests'
import type { ChangeRequestStatus } from '../../../api/types'

type Tab = 'Open' | 'Overdue' | 'Approved' | 'Rejected' | 'Withdrawn'

const TAB_PARAMS: Record<Tab, { status?: ChangeRequestStatus; overdue?: boolean }> = {
  Open: {},
  Overdue: { overdue: true },
  Approved: { status: 'APPROVED' },
  Rejected: { status: 'REJECTED' },
  Withdrawn: { status: 'CANCELLED' },
}

const dateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

/** HR's review queue; the MD sees requests on HR's own records (FR-18, FR-22). */
export default function ChangeRequestQueuePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('Open')
  const { data, isLoading, error } = useChangeRequestQueue(TAB_PARAMS[tab])

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[{ label: 'People', path: '/employees' }, { label: 'Change requests' }]}
          title="Change requests"
        />

        <div className="flex flex-wrap gap-2">
          {(Object.keys(TAB_PARAMS) as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-caption font-semibold cursor-pointer ${
                tab === t ? 'bg-[#18181B] text-white' : 'bg-surface-card text-secondary border border-border-default'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {isLoading && <p className="text-caption text-secondary">Loading…</p>}
        {error && <ErrorAlert title="Could not load requests" message={error.message} />}
        {data?.length === 0 && <p className="text-caption text-secondary">No requests here.</p>}

        <div className="space-y-2">
          {data?.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => navigate(`/employees/change-requests/${r.id}`)}
              className="w-full text-left bg-white border border-border-default rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3 hover:border-border-strong cursor-pointer"
            >
              <div className="space-y-0.5">
                <div className="text-body-small font-bold text-primary">
                  {r.employee.firstName} {r.employee.lastName} · {r.employee.employeeId}
                </div>
                <div className="text-caption text-secondary">{r.fields.map((f) => f.label).join(', ')}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-caption text-secondary">
                  {r.status === 'QUERY_SENT'
                    ? `Employee reply due ${dateTime(r.employeeReplyDueDate)}`
                    : r.status === 'PENDING_REVIEW'
                      ? `Review due ${dateTime(r.reviewDueDate)}`
                      : `Closed ${dateTime(r.resolvedAt)}`}
                </span>
                <ChangeRequestStatusBadge request={r} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
