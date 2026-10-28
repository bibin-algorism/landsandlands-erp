import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../../components/layout/AppLayout'
import PageHeader from '../../../components/common/PageHeader'
import Button from '../../../components/common/Button'
import ErrorAlert from '../../../components/ErrorAlert'
import ChangeRequestStatusBadge from '../../../components/employees/ChangeRequestStatusBadge'
import FieldValue from '../../../components/employees/fields/FieldValue'
import { inputClass } from '../../../components/employees/formStyles'
import type { ChangeRequestField, FieldMeta } from '../../../api/types'
import {
  useApproveChangeRequest,
  useChangeRequest,
  useQueryChangeRequest,
  useRejectChangeRequest,
} from '../../../hooks/useChangeRequests'
import { changeRequestService } from '../../../services/changeRequest.service'

const asMeta = (f: ChangeRequestField): FieldMeta => ({
  key: f.fieldKey,
  label: f.label,
  group: f.group ?? 'PERSONAL',
  type: f.type ?? 'text',
  options: f.options,
  requiresProof: f.requiresProof,
})

const dateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

/** Approve, query (named fields + reason) or reject (reason) one request (FR-19, FR-20). */
export default function ChangeRequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: request, isLoading, error } = useChangeRequest(id)
  const approve = useApproveChangeRequest()
  const query = useQueryChangeRequest()
  const reject = useRejectChangeRequest()
  const [mode, setMode] = useState<'none' | 'query' | 'reject'>('none')
  const [reason, setReason] = useState('')
  const [queried, setQueried] = useState<string[]>([])

  if (isLoading || error || !request) {
    return (
      <AppLayout>
        <div className="p-6 text-caption text-secondary">{isLoading ? 'Loading…' : (error?.message ?? 'Not found')}</div>
      </AppLayout>
    )
  }

  const actionError = approve.error ?? query.error ?? reject.error
  const pending = approve.isPending || query.isPending || reject.isPending
  const canDecide = request.status === 'PENDING_REVIEW'
  const canReject = canDecide || request.status === 'QUERY_SENT'
  const hasStale = request.fields.some((f) => f.isStale)
  const openFile = (key: string) => changeRequestService.openFile(request.id, key)

  const submitDecision = async () => {
    try {
      if (mode === 'query') await query.mutateAsync({ id: request.id, fieldKeys: queried, reason: reason.trim() })
      if (mode === 'reject') await reject.mutateAsync({ id: request.id, reason: reason.trim() })
      navigate('/employees/change-requests')
    } catch {
      // shown below
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/employees' },
            { label: 'Change requests', path: '/employees/change-requests' },
            { label: request.employee.employeeId },
          ]}
          title={`${request.employee.firstName} ${request.employee.lastName}`}
          actions={<ChangeRequestStatusBadge request={request} />}
        />

        <div className="text-caption text-secondary">
          Raised {dateTime(request.submittedAt)} · review due {dateTime(request.reviewDueDate)} ·{' '}
          {request.routedTo === 'MD' ? "HR employee's own record — MD approval" : 'HR approval'}
        </div>

        {request.queryReason && (
          <div className="text-caption bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-4 py-2 text-[#B45309]">
            Last query: {request.queryReason}
          </div>
        )}
        {hasStale && (
          <ErrorAlert
            title="Values changed since the request was raised"
            message="Approval is blocked for stale fields. Query the employee or reject the request."
          />
        )}
        {actionError && <ErrorAlert title="Action failed" message={actionError.message} />}

        <div className="bg-white border border-border-default rounded-3xl divide-y divide-border-default/60">
          {request.fields.map((f) => (
            <div key={f.fieldKey} className="p-4 grid grid-cols-1 md:grid-cols-[200px_1fr_1fr_auto] gap-4 text-caption">
              <div className="font-semibold text-primary">
                {f.label}
                {f.isStale && <div className="text-error font-medium mt-1">Changed since raised</div>}
                {f.isQueried && <div className="text-[#B45309] font-medium mt-1">Queried</div>}
              </div>
              <div>
                <div className="text-[11px] uppercase font-bold text-secondary mb-1">Current</div>
                <FieldValue field={asMeta(f)} value={f.isStale ? f.liveValue : f.currentValue} onOpenFile={openFile} />
              </div>
              <div>
                <div className="text-[11px] uppercase font-bold text-secondary mb-1">Proposed</div>
                <FieldValue field={asMeta(f)} value={f.proposedValue} onOpenFile={openFile} />
                {f.proofFileKey && (
                  <button type="button" onClick={() => openFile(f.proofFileKey!)} className="block mt-1 font-semibold underline cursor-pointer">
                    View proof
                  </button>
                )}
              </div>
              {mode === 'query' && (
                <label className="flex items-center gap-2 font-semibold text-primary">
                  <input
                    type="checkbox"
                    checked={queried.includes(f.fieldKey)}
                    onChange={(e) =>
                      setQueried((q) => (e.target.checked ? [...q, f.fieldKey] : q.filter((k) => k !== f.fieldKey)))
                    }
                  />
                  Query
                </label>
              )}
            </div>
          ))}
        </div>

        {mode === 'none' ? (
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="medium" disabled={!canDecide || hasStale || pending} onClick={async () => {
              try {
                await approve.mutateAsync(request.id)
                navigate('/employees/change-requests')
              } catch {
                // shown above
              }
            }}>
              {approve.isPending ? 'Approving…' : 'Approve'}
            </Button>
            <Button variant="secondary" size="medium" disabled={!canDecide || pending} onClick={() => setMode('query')}>
              Query
            </Button>
            <Button variant="dangerSoft" size="medium" disabled={!canReject || pending} onClick={() => setMode('reject')}>
              Reject
            </Button>
          </div>
        ) : (
          <div className="bg-white border border-border-default rounded-2xl p-4 space-y-3 max-w-xl">
            <label className="block text-caption font-semibold text-secondary" htmlFor="decision-reason">
              {mode === 'query' ? 'What should the employee correct?' : 'Reason for rejection'} <span className="text-error">*</span>
            </label>
            <textarea id="decision-reason" rows={3} maxLength={1000} value={reason} onChange={(e) => setReason(e.target.value)} className={inputClass()} />
            {mode === 'query' && <p className="text-[11px] text-secondary">Tick the fields to send back above.</p>}
            <div className="flex gap-2">
              <Button variant="secondary" size="small" onClick={() => setMode('none')}>
                Back
              </Button>
              <Button
                variant={mode === 'reject' ? 'danger' : 'primary'}
                size="small"
                disabled={!reason.trim() || (mode === 'query' && !queried.length) || pending}
                onClick={submitDecision}
              >
                {mode === 'query' ? 'Send query' : 'Reject request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
