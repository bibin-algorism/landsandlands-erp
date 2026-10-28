import type { HistoryEntry } from '../../api/types'
import { useEmployeeHistory } from '../../hooks/useEmployees'
import FieldValue from './fields/FieldValue'

const ACTION_LABELS: Record<string, string> = {
  'employee.onboarded': 'Onboarded',
  'employee.direct_edit': 'Edited by HR',
  'employee.change_request.raised': 'Change requested',
  'employee.change_request.queried': 'Request queried',
  'employee.change_request.replied': 'Request resubmitted',
  'employee.change_request.approved': 'Request approved',
  'employee.change_request.rejected': 'Request rejected',
  'employee.change_request.cancelled': 'Request withdrawn',
  'employee.second_document.submitted': 'Document submitted',
  'employee.document.viewed': 'Document viewed',
}

/** Values in history are raw API values; render the common shapes readably. */
function HistoryValue({ value }: { value: unknown }) {
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>
    if ('takeHomePayTotal' in v) return <FieldValue field={{ type: 'pay', options: null }} value={value} />
    if ('front' in v && 'back' in v) return <>Document images</>
    if ('highestQualification' in v) return <FieldValue field={{ type: 'education', options: null }} value={value} />
    if ('onProbation' in v) return <FieldValue field={{ type: 'probation', options: null }} value={value} />
    if ('nextAppraisalWindow' in v) return <FieldValue field={{ type: 'appraisal', options: null }} value={value} />
    if (Array.isArray(value)) return <FieldValue field={{ type: 'contacts', options: null }} value={value} />
  }
  return <FieldValue field={{ type: 'text', options: null }} value={value} />
}

function Entry({ entry }: { entry: HistoryEntry }) {
  return (
    <li className="border-l-2 border-border-default pl-4 pb-4 space-y-1">
      <div className="text-caption font-bold text-primary">{ACTION_LABELS[entry.action] ?? entry.action}</div>
      <div className="text-[12px] text-secondary">
        {new Date(entry.occurredAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} ·{' '}
        {entry.actor ? `${entry.actor.name} (${entry.actor.employeeId})` : 'System'}
        {entry.changeSource === 'APPROVED_CHANGE_REQUEST' && ' · via change request'}
      </div>
      {entry.reason && <div className="text-[12px] text-primary">Reason: {entry.reason}</div>}
      {entry.document && <div className="text-[12px] text-secondary">Document: {entry.document}</div>}
      {entry.changes.map((c, i) => (
        <div key={i} className="text-[12px] bg-bg-subtle/60 rounded-lg px-3 py-2">
          <div className="font-semibold text-primary">{c.label}</div>
          <div className="text-secondary">
            <span className="line-through">
              <HistoryValue value={c.old} />
            </span>{' '}
            → <span className="text-primary"><HistoryValue value={c.new} /></span>
          </div>
        </div>
      ))}
    </li>
  )
}

/** Slide-over list of every change and action on an employee record, newest first. */
export default function HistoryDrawer({
  employeeId,
  open,
  onClose,
}: {
  employeeId: string
  open: boolean
  onClose: () => void
}) {
  const { data, isLoading, error } = useEmployeeHistory(employeeId, undefined, open)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <aside
        className="w-full max-w-md h-full bg-white shadow-2xl p-6 overflow-y-auto space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-h3 font-serif font-bold text-primary">History</h3>
          <button type="button" onClick={onClose} className="text-caption font-semibold text-secondary cursor-pointer">
            Close
          </button>
        </div>
        {isLoading && <p className="text-caption text-secondary">Loading…</p>}
        {error && <p className="text-caption text-error">{error.message}</p>}
        {data && data.length === 0 && <p className="text-caption text-secondary">No history yet.</p>}
        <ul>{data?.map((entry) => <Entry key={entry.id} entry={entry} />)}</ul>
      </aside>
    </div>
  )
}
