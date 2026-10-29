import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import StatusBadge from '../../components/common/StatusBadge'
import ErrorAlert from '../../components/ErrorAlert'
import { DocumentCard } from '../../components/employees/Step3Documents'
import { formatDate, type UploadedDoc } from '../../components/employees/employeeForm'
import { usePendingDocuments, useSubmitSecondDocument } from '../../hooks/useEmployees'
import { fileService } from '../../services/file.service'
import type { PendingDocumentItem } from '../../api/types'

const DOCUMENT_LABELS: Record<PendingDocumentItem['missingDocument'], string> = {
  RELIEVING_LETTER: 'Relieving letter',
  PAYSLIPS: "Last 3 months' payslips",
}

function DueBadge({ item }: { item: PendingDocumentItem }) {
  if (item.isOverdue) return <StatusBadge value="Overdue" color="bg-[#FEE2E2] text-[#B91C1C]" />
  if (item.daysRemaining !== null && item.daysRemaining <= 5) {
    return <StatusBadge value={`Due in ${item.daysRemaining} day${item.daysRemaining === 1 ? '' : 's'}`} color="bg-[#FEF3C7] text-[#B45309]" />
  }
  return <StatusBadge value={`${item.daysRemaining ?? '—'} days left`} color="bg-bg-subtle text-secondary" />
}

/** Submit the document that was missing at joining; the record then becomes complete. */
function SubmitDialog({ item, onClose }: { item: PendingDocumentItem; onClose: () => void }) {
  const [doc, setDoc] = useState<UploadedDoc | undefined>()
  const submit = useSubmitSecondDocument()

  const upload = async (file: File) => {
    setDoc({ status: 'uploading', fileName: file.name })
    try {
      const res = await fileService.uploadEmployeeDocument(file)
      setDoc({ status: 'uploaded', fileName: res.fileName, key: res.key })
    } catch (err) {
      setDoc({ status: 'error', fileName: file.name, error: err instanceof Error ? err.message : 'Upload failed' })
    }
  }

  return (
    <Modal onClose={onClose} width="max-w-md">
      <h3 className="text-h3 font-serif font-bold text-primary">
        {DOCUMENT_LABELS[item.missingDocument]} for {item.firstName}
      </h3>
      <p className="text-body-small text-secondary">
        Upload a photo or PDF of the original. {item.firstName}’s record is marked complete once it’s saved.
      </p>
      {submit.error && <ErrorAlert title="Not saved" message={submit.error.message} />}
      <div className="max-w-[220px]">
        <DocumentCard title={DOCUMENT_LABELS[item.missingDocument]} doc={doc} onFileSelect={upload} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" size="medium" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="medium"
          disabled={doc?.status !== 'uploaded' || submit.isPending}
          onClick={async () => {
            try {
              await submit.mutateAsync({ id: item.employeeId, documentUrl: doc!.key! })
              onClose()
            } catch {
              // shown above
            }
          }}
        >
          {submit.isPending ? 'Saving…' : 'Save document'}
        </Button>
      </div>
    </Modal>
  )
}

/** FR-07 / FR-08: previous-organisation documents still owed, nearest due date first. */
export default function PendingDocumentsPage() {
  const navigate = useNavigate()
  const { data, isLoading, error } = usePendingDocuments()
  const [selected, setSelected] = useState<PendingDocumentItem | null>(null)

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader breadcrumbItems={[{ label: 'Approvals' }, { label: 'Pending documents' }]} title="Pending documents" />
        <p className="text-caption text-secondary">
          New joiners who gave one previous-organisation document at joining. The other is due within 2 weeks to 1
          month; HR is reminded on day 29.
        </p>

        {isLoading && <p className="text-caption text-secondary">Loading…</p>}
        {error && <ErrorAlert title="Could not load pending documents" message={error.message} />}
        {data?.length === 0 && <p className="text-caption text-secondary">No documents are pending.</p>}

        <div className="space-y-2">
          {data?.map((item) => (
            <div
              key={item.employeeId}
              className="bg-white border border-border-default rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3"
            >
              <button type="button" onClick={() => navigate(`/employees/${item.employeeCode}`)} className="text-left space-y-0.5 cursor-pointer">
                <div className="text-body-small font-bold text-primary">
                  {item.firstName} {item.lastName} · {item.employeeCode}
                </div>
                <div className="text-caption text-secondary">
                  {DOCUMENT_LABELS[item.missingDocument]} · joined {formatDate(item.joiningDate)} · due{' '}
                  {formatDate(item.secondDocDueDate)}
                </div>
              </button>
              <div className="flex items-center gap-3">
                {item.trigger29DayNotice && <StatusBadge value="Day 29 reached" color="bg-[#FEE2E2] text-[#B91C1C]" />}
                <DueBadge item={item} />
                <Button variant="primary" size="small" onClick={() => setSelected(item)}>
                  Submit document
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && <SubmitDialog item={selected} onClose={() => setSelected(null)} />}
    </AppLayout>
  )
}
