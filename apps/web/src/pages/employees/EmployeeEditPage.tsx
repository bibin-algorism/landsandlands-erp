import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import ErrorAlert from '../../components/ErrorAlert'
import FieldChangeList from '../../components/employees/fields/FieldChangeList'
import FieldValue from '../../components/employees/fields/FieldValue'
import { hasChanged, submitValue } from '../../components/employees/fields/fieldEditing'
import { inputClass } from '../../components/employees/formStyles'
import { useDirectEdit, useEditableFields } from '../../hooks/useEmployees'
import { employeeService } from '../../services/employee.service'

/** HR direct edit of another employee (FR-24, BR-14, BR-16). */
export default function EmployeeEditPage() {
  const { employeeId } = useParams<{ employeeId: string }>()
  const navigate = useNavigate()
  const { data, isLoading, error, refetch } = useEditableFields(employeeId)
  const directEdit = useDirectEdit(employeeId ?? '')
  const [drafts, setDrafts] = useState<Record<string, unknown>>({})
  const [reviewing, setReviewing] = useState(false)
  const [reason, setReason] = useState('')

  if (isLoading || error || !data) {
    return (
      <AppLayout>
        <div className="p-6 text-caption text-secondary">{isLoading ? 'Loading…' : (error?.message ?? 'Not found')}</div>
      </AppLayout>
    )
  }
  // BR-16: HR's own record changes go through a change request
  if (data.mode === 'CHANGE_REQUEST') return <Navigate to="/my-profile/change-requests/new" replace />

  const changed = data.fields.filter((f) => f.key in drafts && hasChanged(f, f.value, drafts[f.key]))
  const name = `${data.employee.firstName} ${data.employee.lastName}`
  const isConflict = directEdit.error?.message.includes('changed by someone else')

  const setDraft = (key: string, value: unknown | undefined) =>
    setDrafts((prev) => {
      const next = { ...prev }
      if (value === undefined) delete next[key]
      else next[key] = value
      return next
    })

  const save = async () => {
    try {
      await directEdit.mutateAsync({
        changes: Object.fromEntries(changed.map((f) => [f.key, submitValue(f, drafts[f.key])])),
        reason: reason.trim() || undefined,
        expectedUpdatedAt: data.updatedAt,
      })
      navigate(`/employees/${data.employee.employeeId}`)
    } catch {
      setReviewing(false)
    }
  }

  const reload = async () => {
    directEdit.reset()
    setDrafts({})
    await refetch()
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/employees' },
            { label: 'Employees', path: '/employees' },
            { label: data.employee.employeeId, path: `/employees/${data.employee.employeeId}` },
            { label: 'Edit' },
          ]}
          title={`Edit ${name}`}
          actions={
            <>
              <Button variant="secondary" size="medium" onClick={() => navigate(`/employees/${data.employee.employeeId}`)}>
                Cancel
              </Button>
              <Button variant="primary" size="medium" disabled={!changed.length} onClick={() => setReviewing(true)}>
                Review {changed.length || ''} change{changed.length === 1 ? '' : 's'}
              </Button>
            </>
          }
        />

        {directEdit.error && (
          <div className="space-y-2">
            <ErrorAlert title="Changes were not saved" message={directEdit.error.message} />
            {isConflict && (
              <Button variant="secondary" size="small" onClick={reload}>
                Reload the latest record
              </Button>
            )}
          </div>
        )}

        <p className="text-caption text-secondary">
          Changes apply immediately and the old values are kept in the record's history. Employee ID, system data
          and exit details cannot be edited here.
        </p>

        <FieldChangeList
          fields={data.fields}
          drafts={drafts}
          onDraftChange={setDraft}
          employeeId={data.employee.id}
          onOpenCurrentFile={(key) => employeeService.openDocumentByKey(data.employee.id, key)}
        />
      </div>

      {reviewing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setReviewing(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-h3 font-serif font-bold text-primary">Review changes to {name}</h3>
            <div className="divide-y divide-border-default/60 border border-border-default rounded-2xl">
              {changed.map((f) => (
                <div key={f.key} className="p-3 text-caption space-y-1">
                  <div className="font-semibold text-primary">{f.label}</div>
                  <div className="text-secondary">
                    <FieldValue field={f} value={f.value} />
                  </div>
                  <div className="text-primary">
                    → <FieldValue field={f} value={submitValue(f, drafts[f.key])} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="block text-caption font-semibold text-secondary" htmlFor="reason">
                Reason (optional)
              </label>
              <textarea
                id="reason"
                rows={2}
                maxLength={500}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className={inputClass()}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="medium" onClick={() => setReviewing(false)}>
                Back
              </Button>
              <Button variant="primary" size="medium" onClick={save} disabled={directEdit.isPending}>
                {directEdit.isPending ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
