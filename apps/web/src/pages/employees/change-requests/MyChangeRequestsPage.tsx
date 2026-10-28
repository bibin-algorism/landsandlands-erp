import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../../components/layout/AppLayout'
import PageHeader from '../../../components/common/PageHeader'
import Button from '../../../components/common/Button'
import ErrorAlert from '../../../components/ErrorAlert'
import ChangeRequestStatusBadge from '../../../components/employees/ChangeRequestStatusBadge'
import FieldEditor from '../../../components/employees/fields/FieldEditor'
import FieldValue from '../../../components/employees/fields/FieldValue'
import { submitValue } from '../../../components/employees/fields/fieldEditing'
import { DocumentCard } from '../../../components/employees/Step3Documents'
import type { UploadedDoc } from '../../../components/employees/employeeForm'
import type { ChangeRequest, ChangeRequestField, FieldMeta } from '../../../api/types'
import {
  useCancelChangeRequest,
  useMyChangeRequests,
  useReplyChangeRequest,
} from '../../../hooks/useChangeRequests'
import { changeRequestService } from '../../../services/changeRequest.service'
import { fileService } from '../../../services/file.service'

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

/** FR-21: answer HR's query by updating the queried fields and resubmitting. */
function QueryReply({ request }: { request: ChangeRequest }) {
  const queried = request.fields.filter((f) => f.isQueried)
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    Object.fromEntries(queried.map((f) => [f.fieldKey, f.proposedValue])),
  )
  const [proofs, setProofs] = useState<Record<string, UploadedDoc>>({})
  const reply = useReplyChangeRequest()

  const uploadProof = async (key: string, file: File) => {
    setProofs((p) => ({ ...p, [key]: { status: 'uploading', fileName: file.name } }))
    try {
      const res = await fileService.uploadEmployeeDocument(file)
      setProofs((p) => ({ ...p, [key]: { status: 'uploaded', fileName: res.fileName, key: res.key } }))
    } catch (err) {
      setProofs((p) => ({ ...p, [key]: { status: 'error', fileName: file.name, error: err instanceof Error ? err.message : 'Upload failed' } }))
    }
  }

  return (
    <div className="space-y-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4">
      <div className="text-caption text-[#B45309]">
        <span className="font-bold">HR's query:</span> {request.queryReason} · reply by {dateTime(request.employeeReplyDueDate)}
      </div>
      {reply.error && <ErrorAlert title="Not resubmitted" message={reply.error.message} />}
      {queried.map((f) => (
        <div key={f.fieldKey} className="space-y-2">
          <div className="text-caption font-semibold text-primary">{f.label}</div>
          <FieldEditor field={asMeta(f)} value={values[f.fieldKey]} onChange={(v) => setValues((s) => ({ ...s, [f.fieldKey]: v }))} />
          {f.requiresProof && (
            <div className="max-w-[220px]">
              <DocumentCard
                title={f.proofFileKey ? 'Replace proof' : 'Proof document'}
                doc={proofs[f.fieldKey]}
                onFileSelect={(file) => uploadProof(f.fieldKey, file)}
              />
            </div>
          )}
        </div>
      ))}
      <Button
        variant="primary"
        size="small"
        disabled={reply.isPending || Object.values(proofs).some((p) => p.status === 'uploading')}
        onClick={() =>
          reply.mutate({
            id: request.id,
            fields: queried.map((f) => ({
              fieldKey: f.fieldKey,
              proposedValue: submitValue(asMeta(f), values[f.fieldKey]),
              proofFileKey: proofs[f.fieldKey]?.key,
            })),
          })
        }
      >
        {reply.isPending ? 'Resubmitting…' : 'Resubmit to HR'}
      </Button>
    </div>
  )
}

export default function MyChangeRequestsPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useMyChangeRequests()
  const cancel = useCancelChangeRequest()

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[{ label: 'My profile', path: '/my-profile' }, { label: 'My requests' }]}
          title="My change requests"
          actions={
            <Button variant="primary" size="medium" onClick={() => navigate('/my-profile/change-requests/new')}>
              Request a change
            </Button>
          }
        />

        {isLoading && <p className="text-caption text-secondary">Loading…</p>}
        {error && <ErrorAlert title="Could not load requests" message={error.message} />}
        {cancel.error && <ErrorAlert title="Not withdrawn" message={cancel.error.message} />}
        {data?.length === 0 && <p className="text-caption text-secondary">You have not raised any change requests.</p>}

        {data?.map((request) => (
          <div key={request.id} className="bg-white border border-border-default rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <ChangeRequestStatusBadge request={request} />
                <span className="text-caption text-secondary">
                  Raised {dateTime(request.submittedAt)} · reviewed by {request.routedTo === 'MD' ? 'the MD' : 'HR'}
                </span>
              </div>
              {(request.status === 'PENDING_REVIEW' || request.status === 'QUERY_SENT') && (
                <Button variant="ghost" size="small" disabled={cancel.isPending} onClick={() => cancel.mutate(request.id)}>
                  Withdraw
                </Button>
              )}
            </div>

            <div className="divide-y divide-border-default/60 border border-border-default rounded-2xl">
              {request.fields.map((f) => (
                <div key={f.fieldKey} className="p-3 text-caption grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2">
                  <div className="font-semibold text-primary">
                    {f.label}
                    {f.isQueried && <span className="ml-2 text-[#B45309]">· queried</span>}
                  </div>
                  <div className="space-y-1">
                    <div className="text-secondary">
                      <FieldValue field={asMeta(f)} value={f.currentValue} />
                    </div>
                    <div className="text-primary">
                      → <FieldValue field={asMeta(f)} value={f.proposedValue} onOpenFile={(key) => changeRequestService.openFile(request.id, key)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {request.status === 'QUERY_SENT' && <QueryReply request={request} />}
            {request.status === 'REJECTED' && (
              <div className="text-caption text-[#B91C1C]">
                <span className="font-bold">Rejected:</span> {request.rejectionReason}
              </div>
            )}
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
