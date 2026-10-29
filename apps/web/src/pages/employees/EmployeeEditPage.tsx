import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import ErrorAlert from '../../components/ErrorAlert'
import EmployeeSummaryCard from '../../components/employees/EmployeeSummaryCard'
import DocumentsPanel from '../../components/employees/DocumentsPanel'
import SectionPills from '../../components/employees/SectionPills'
import { LockIcon } from '../../components/employees/InfoTile'
import FieldEditor from '../../components/employees/fields/FieldEditor'
import FieldValue from '../../components/employees/fields/FieldValue'
import { hasChanged, initialEditorValue, submitValue } from '../../components/employees/fields/fieldEditing'
import { inputClass } from '../../components/employees/formStyles'
import { formatDate } from '../../components/employees/employeeForm'
import {
  SECTION_TITLES,
  maskAadhaar,
  maskTail,
  sectionOfField,
  type EmployeeSection,
} from '../../components/employees/employeeSections'
import { useDirectEdit, useEditableFields, useEmployeeDetails } from '../../hooks/useEmployees'
import { employeeService } from '../../services/employee.service'
import type { EditableField } from '../../api/types'
import type { SavedChangesState } from './EmployeeDetailsPage'

const WIDE_TYPES = new Set(['contacts', 'longText', 'education', 'probation', 'pay', 'appraisal'])
const EDIT_SECTIONS: EmployeeSection[] = ['Personal', 'Communication', 'Documents', 'Employment', 'Financial', 'System data']
const LOCKED_NOTE = 'Locked — restricted details can’t be edited here'

/** Restricted values stay read-only on this page (BR-13); numbers are masked. */
function LockedField({ field }: { field: EditableField }) {
  const value =
    field.type === 'aadhaar'
      ? maskAadhaar(field.value as string)
      : field.type === 'licence' || field.type === 'accountNumber'
        ? maskTail(field.value as string)
        : null
  return (
    <div className={`space-y-1.5 ${WIDE_TYPES.has(field.type) ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
      <div className="text-caption font-semibold text-secondary">{field.label}</div>
      <div className="w-full px-3.5 py-2.5 bg-bg-subtle border border-border-default rounded-xl text-body-small text-secondary flex items-center justify-between gap-3 cursor-not-allowed">
        <span className="truncate">{value ?? <FieldValue field={field} value={field.value} />}</span>
        <LockIcon className="w-4 h-4 shrink-0" />
      </div>
      <p className="text-[11px] text-secondary">{LOCKED_NOTE}</p>
    </div>
  )
}

/** HR direct edit of another employee (FR-24, BR-14, BR-16) — Figma "Edit 1–4". */
export default function EmployeeEditPage() {
  const { employeeId } = useParams<{ employeeId: string }>()
  const navigate = useNavigate()
  const { data, isLoading, error, refetch } = useEditableFields(employeeId)
  const { data: employee } = useEmployeeDetails(employeeId)
  const { data: me } = useEmployeeDetails('me')
  const directEdit = useDirectEdit(employeeId ?? '')

  const [section, setSection] = useState<EmployeeSection>('Personal')
  const [drafts, setDrafts] = useState<Record<string, unknown>>({})
  const [reason, setReason] = useState('')
  const [reasonError, setReasonError] = useState<string | null>(null)
  const [dialog, setDialog] = useState<'none' | 'confirm' | 'discard'>('none')

  const fields = data?.fields ?? []
  const changed = fields.filter((f) => f.key in drafts && hasChanged(f, f.value, drafts[f.key]))
  const isDirty = changed.length > 0

  // Warn before closing the tab or reloading with unsaved changes.
  useEffect(() => {
    if (!isDirty) return
    const handler = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  if (isLoading || error || !data || !employee) {
    return (
      <AppLayout>
        <div className="p-6 text-caption text-secondary">{error?.message ?? 'Loading…'}</div>
      </AppLayout>
    )
  }
  // BR-16: HR's own record changes go through a change request
  if (data.mode === 'CHANGE_REQUEST') return <Navigate to="/my-profile/change-requests/new" replace />

  const name = `${data.employee.firstName} ${data.employee.lastName}`
  const detailsPath = `/employees/${data.employee.employeeId}`
  const isConflict = directEdit.error?.message.includes('changed by someone else')
  const changedLabels = changed.map((f) => f.label)
  const valueOf = (field: EditableField) =>
    field.key in drafts ? drafts[field.key] : initialEditorValue(field, field.value)
  const setDraft = (key: string, value: unknown) => setDrafts((prev) => ({ ...prev, [key]: value }))
  const changesIn = (s: EmployeeSection) => changed.filter((f) => sectionOfField(f.key) === s).length

  const openReview = () => {
    if (!reason.trim()) {
      setReasonError('Add a reason for this change')
      return
    }
    setReasonError(null)
    setDialog('confirm')
  }

  const save = async () => {
    try {
      await directEdit.mutateAsync({
        changes: Object.fromEntries(changed.map((f) => [f.key, submitValue(f, drafts[f.key])])),
        reason: reason.trim(),
        expectedUpdatedAt: data.updatedAt,
      })
      const state: SavedChangesState = { savedFields: changed.map((f) => f.key), savedLabels: changedLabels }
      navigate(detailsPath, { state })
    } catch {
      setDialog('none')
    }
  }

  const reload = async () => {
    directEdit.reset()
    setDrafts({})
    await refetch()
  }

  const renderField = (field: EditableField) => {
    if (field.sensitivity === 'RESTRICTED') return <LockedField key={field.key} field={field} />
    const isChanged = changed.some((c) => c.key === field.key)
    return (
      <div key={field.key} className={`space-y-1.5 ${WIDE_TYPES.has(field.type) ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
        <div className="text-caption font-semibold text-secondary">
          {field.label} <span className="text-error">*</span>
        </div>
        <div className={isChanged ? 'rounded-xl ring-2 ring-[#FACC15]' : ''}>
          <FieldEditor
            field={field}
            value={valueOf(field)}
            onChange={(value) => setDraft(field.key, value)}
            employeeId={data.employee.id}
          />
        </div>
        {isChanged && (
          <p className="text-[11px] font-medium text-[#1D4ED8]">
            Changed from: <FieldValue field={field} value={field.value} />
          </p>
        )}
      </div>
    )
  }

  const sectionFields = fields.filter((f) => sectionOfField(f.key) === section)
  const sectionChanges = changesIn(section)

  const reasonInput = (
    <div className="space-y-1.5 pt-2">
      <label htmlFor="reason" className="block text-caption font-semibold text-secondary">
        Reason for change <span className="text-error">*</span>
      </label>
      <input
        id="reason"
        maxLength={500}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="e.g. Updated after marriage certificate"
        className={inputClass(reasonError ?? undefined)}
      />
      <p className={`text-[11px] ${reasonError ? 'text-error font-medium' : 'text-secondary'}`}>
        {reasonError ?? 'Saved in the change history with your name'}
      </p>
    </div>
  )

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/employees' },
            { label: 'Employees', path: '/employees' },
            { label: data.employee.employeeId, path: detailsPath },
          ]}
          title={`Edit · ${name}`}
          actions={
            <>
              <Button variant="ghost" size="medium" onClick={() => (isDirty ? setDialog('discard') : navigate(detailsPath))}>
                Cancel
              </Button>
              <Button variant="primary" size="medium" disabled={!isDirty} onClick={openReview}>
                Save changes
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

        <EmployeeSummaryCard employee={employee} />

        <SectionPills
          active={section}
          onSelect={setSection}
          available={employee.access.restrictedVisible ? EDIT_SECTIONS : EDIT_SECTIONS.filter((s) => s !== 'Financial')}
          disabled={['System data']}
          note={
            <>
              <LockIcon /> Employee ID and joining date can’t be changed
            </>
          }
        />

        {section === 'Documents' ? (
          <DocumentsPanel employee={employee} onOpen={(document) => employeeService.openDocument(employee.id, document)}>
            <div className="space-y-4 pt-2 border-t border-border-default/60">
              {sectionChanges > 0 && (
                <span className="inline-block px-2.5 py-1 rounded-lg bg-bg-subtle text-caption font-semibold text-primary">
                  Editing · {sectionChanges} change{sectionChanges > 1 ? 's' : ''}
                </span>
              )}
              {sectionFields.map((field) => (
                <div key={field.key}>{renderField(field)}</div>
              ))}
              {reasonInput}
            </div>
          </DocumentsPanel>
        ) : (
          <div className="bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-h4 font-serif font-bold text-primary">{SECTION_TITLES[section]}</h3>
              {sectionChanges > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-bg-subtle text-caption font-semibold text-primary">
                  Editing · {sectionChanges} change{sectionChanges > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionFields.map(renderField)}
              {section === 'Employment' && (
                <div className="space-y-1.5">
                  <div className="text-caption font-semibold text-secondary">Joining date</div>
                  <div className="w-full px-3.5 py-2.5 bg-bg-subtle border border-border-default rounded-xl text-body-small text-secondary flex items-center justify-between cursor-not-allowed">
                    {formatDate(employee.employment?.joiningDate)}
                    <LockIcon className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-secondary">Joining date can’t be changed</p>
                </div>
              )}
              {sectionFields.length === 0 && section !== 'Employment' && (
                <p className="text-caption text-secondary">Nothing in this section can be edited.</p>
              )}
            </div>

            {reasonInput}
          </div>
        )}
      </div>

      {dialog === 'confirm' && (
        <Modal onClose={() => setDialog('none')} width="max-w-xl">
          <h3 className="text-h3 font-serif font-bold text-primary">
            Save {changed.length} change{changed.length > 1 ? 's' : ''} to {data.employee.firstName}’s profile?
          </h3>
          <div className="border border-border-default rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-3 px-4 py-2.5 bg-bg-subtle text-caption text-secondary font-semibold">
              <span>Field</span>
              <span>Before</span>
              <span>After</span>
            </div>
            {changed.map((f) => (
              <div key={f.key} className="grid grid-cols-3 gap-3 px-4 py-3 border-t border-border-default text-body-small">
                <span className="text-primary">{f.label}</span>
                <span className="text-secondary line-through">
                  <FieldValue field={f} value={f.value} />
                </span>
                <span className="text-primary font-semibold">
                  <FieldValue field={f} value={submitValue(f, drafts[f.key])} />
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <div className="text-caption text-secondary">Reason</div>
            <div className="text-body-small text-primary">{reason}</div>
          </div>
          <p className="text-caption text-secondary flex items-center gap-1.5">
            <LockIcon /> Saved to the change history as {me ? `${me.firstName} ${me.lastName} · ${me.employeeId}` : 'you'}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="medium" onClick={() => setDialog('none')}>
              Back to editing
            </Button>
            <Button variant="primary" size="medium" onClick={save} disabled={directEdit.isPending}>
              {directEdit.isPending ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </Modal>
      )}

      {dialog === 'discard' && (
        <Modal onClose={() => setDialog('none')} width="max-w-md">
          <div className="w-11 h-11 rounded-full bg-[#FEF2F2] text-[#B42318] flex items-center justify-center text-body font-bold">
            !
          </div>
          <h3 className="text-h3 font-serif font-bold text-primary">Discard your changes?</h3>
          <p className="text-body-small text-secondary">
            You changed {changedLabels.join(', ')}. If you leave now,{' '}
            {changed.length > 1 ? 'these changes' : 'this change'} won’t be saved.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="medium" onClick={() => navigate(detailsPath)}>
              Discard
            </Button>
            <Button variant="primary" size="medium" onClick={() => setDialog('none')}>
              Keep editing
            </Button>
          </div>
        </Modal>
      )}
    </AppLayout>
  )
}
