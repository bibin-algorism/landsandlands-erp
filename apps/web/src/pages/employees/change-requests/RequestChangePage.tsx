import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../../components/layout/AppLayout'
import PageHeader from '../../../components/common/PageHeader'
import Button from '../../../components/common/Button'
import ErrorAlert from '../../../components/ErrorAlert'
import FieldChangeList from '../../../components/employees/fields/FieldChangeList'
import { hasChanged, submitValue } from '../../../components/employees/fields/fieldEditing'
import type { UploadedDoc } from '../../../components/employees/employeeForm'
import { useEditableFields, useEmployeeDetails } from '../../../hooks/useEmployees'
import { useRaiseChangeRequest } from '../../../hooks/useChangeRequests'
import { employeeService } from '../../../services/employee.service'
import { fileService } from '../../../services/file.service'

/** FR-16 / FR-17: the employee asks for changes to their own record, with proof where needed. */
export default function RequestChangePage() {
  const navigate = useNavigate()
  const { data: me } = useEmployeeDetails('me')
  const { data, isLoading, error } = useEditableFields(me?.id)
  const raise = useRaiseChangeRequest()
  const [drafts, setDrafts] = useState<Record<string, unknown>>({})
  const [proofs, setProofs] = useState<Record<string, UploadedDoc>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (isLoading || error || !data) {
    return (
      <AppLayout>
        <div className="p-6 text-caption text-secondary">{isLoading || !me ? 'Loading…' : (error?.message ?? 'Not found')}</div>
      </AppLayout>
    )
  }

  const changed = data.fields.filter((f) => f.key in drafts && hasChanged(f, f.value, drafts[f.key]))

  const setDraft = (key: string, value: unknown | undefined) =>
    setDrafts((prev) => {
      const next = { ...prev }
      if (value === undefined) delete next[key]
      else next[key] = value
      return next
    })

  const uploadProof = async (key: string, file: File) => {
    setProofs((prev) => ({ ...prev, [key]: { status: 'uploading', fileName: file.name } }))
    try {
      const res = await fileService.uploadEmployeeDocument(file)
      setProofs((prev) => ({ ...prev, [key]: { status: 'uploaded', fileName: res.fileName, key: res.key } }))
    } catch (err) {
      setProofs((prev) => ({
        ...prev,
        [key]: { status: 'error', fileName: file.name, error: err instanceof Error ? err.message : 'Upload failed' },
      }))
    }
  }

  const submit = async () => {
    const missing: Record<string, string> = {}
    for (const f of changed) {
      if (f.requiresProof && proofs[f.key]?.status !== 'uploaded') {
        missing[`proof.${f.key}`] = 'Attach a proof document'
      }
    }
    setErrors(missing)
    if (Object.keys(missing).length) return
    try {
      await raise.mutateAsync(
        changed.map((f) => ({
          fieldKey: f.key,
          proposedValue: submitValue(f, drafts[f.key]),
          proofFileKey: proofs[f.key]?.key,
        })),
      )
      navigate('/my-profile/change-requests')
    } catch {
      // shown below
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[
            { label: 'My profile', path: '/my-profile' },
            { label: 'Request a change' },
          ]}
          title="Request a change"
          actions={
            <>
              <Button variant="secondary" size="medium" onClick={() => navigate('/my-profile')}>
                Cancel
              </Button>
              <Button variant="primary" size="medium" disabled={!changed.length || raise.isPending} onClick={submit}>
                {raise.isPending
                  ? 'Sending…'
                  : `Send ${changed.length || ''} change${changed.length === 1 ? '' : 's'} for review`}
              </Button>
            </>
          }
        />

        {raise.error && <ErrorAlert title="Request not sent" message={raise.error.message} />}

        <p className="text-caption text-secondary">
          Your record changes only after HR approves the request; you will be able to follow it under My requests.
          Employment and pay details are updated by HR.
        </p>

        <FieldChangeList
          fields={data.fields}
          drafts={drafts}
          onDraftChange={setDraft}
          employeeId={data.employee.id}
          onOpenCurrentFile={(key) => employeeService.openDocumentByKey(data.employee.id, key)}
          proofs={proofs}
          onProofSelect={uploadProof}
          errors={errors}
        />
      </div>
    </AppLayout>
  )
}
