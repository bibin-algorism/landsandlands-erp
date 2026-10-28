import type { ReactNode } from 'react'
import { JOB_TYPE_LABELS, QUALIFICATION_LABELS, BACKGROUND_LABELS, ROLE_LABELS } from '../../constants/employee'
import ErrorAlert from '../ErrorAlert'
import {
  PREVIOUS_ORG_DOC_LABELS,
  digitsOnly,
  formatDate,
  formatRupees,
  isDocUploaded,
  pendingPreviousOrgDoc,
  requiredDocuments,
  secondDocDueDate,
  toRupees,
  validateStep,
  type EmployeeFormData,
} from './employeeForm'

export interface Step6ReviewProps {
  formData: EmployeeFormData
  managerName?: string
  onSubmit: () => void
  onBack: () => void
  onEditStep: (step: number) => void
  isSubmitting: boolean
  error: string | null
}

const STEP_NAMES: Record<number, string> = {
  1: 'Personal',
  2: 'Communication',
  3: 'Documents',
  4: 'Employment',
  5: 'Financial',
}

const last4 = (value: string) => `••••${digitsOnly(value).slice(-4)}`

function SummaryCard({
  title,
  step,
  onEditStep,
  invalid,
  children,
}: {
  title: string
  step: number
  onEditStep: (step: number) => void
  invalid: boolean
  children: ReactNode
}) {
  return (
    <div
      className={`p-4 bg-white border rounded-2xl space-y-2 shadow-xs ${
        invalid ? 'border-error' : 'border-border-default'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-caption font-bold text-primary">{title}</span>
        <button
          type="button"
          onClick={() => onEditStep(step)}
          className="text-caption font-semibold text-primary underline hover:text-secondary transition-colors cursor-pointer"
        >
          Edit
        </button>
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

export default function Step6Review({
  formData,
  managerName,
  onSubmit,
  onBack,
  onEditStep,
  isSubmitting,
  error,
}: Step6ReviewProps) {
  // FR-03: every Section 8 field must be complete before the record is created
  const stepErrors = Object.keys(STEP_NAMES)
    .map(Number)
    .map((step) => ({ step, errors: Object.values(validateStep(step, formData)) }))
    .filter((s) => s.errors.length > 0)
  const canSubmit = stepErrors.length === 0 && !isSubmitting

  const docs = requiredDocuments(formData)
  const uploadedCount = docs.filter((doc) => isDocUploaded(formData, doc.key)).length
  const pendingDoc = pendingPreviousOrgDoc(formData)
  const dueDate = secondDocDueDate(formData)
  const invalidSteps = new Set(stepErrors.map((s) => s.step))

  const role = formData.role ? ROLE_LABELS[formData.role] : '—'
  const jobType = formData.jobType ? JOB_TYPE_LABELS[formData.jobType] : '—'
  const cash = toRupees(formData.cashComponent)
  const total = toRupees(formData.takeHomePayTotal)

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-1">
        <h2 className="text-h2 font-serif font-bold text-primary">Review</h2>
        <p className="text-caption text-secondary font-medium">
          Check everything once before creating the employee.
        </p>
      </div>

      {error && <ErrorAlert title="Could not create the employee" message={error} />}

      {stepErrors.length > 0 && (
        <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-4 text-caption text-[#B42318] space-y-2">
          <div className="font-bold">Complete these before creating the employee</div>
          {stepErrors.map(({ step, errors }) => (
            <div key={step}>
              <button
                type="button"
                onClick={() => onEditStep(step)}
                className="font-semibold underline cursor-pointer"
              >
                {STEP_NAMES[step]}
              </button>
              : {errors.slice(0, 3).join('; ')}
              {errors.length > 3 && ` and ${errors.length - 3} more`}
            </div>
          ))}
        </div>
      )}

      {pendingDoc && (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-3.5 text-caption font-medium text-[#B45309]">
          {formData.firstName || 'The employee'} will be saved as Incomplete until the{' '}
          {PREVIOUS_ORG_DOC_LABELS[pendingDoc].toLowerCase()} is submitted
          {dueDate ? ` (due ${formatDate(dueDate)})` : ''}.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryCard title="Personal" step={1} onEditStep={onEditStep} invalid={invalidSteps.has(1)}>
          <div className="text-caption font-bold text-primary">
            {`${formData.firstName} ${formData.lastName}`.trim() || '—'} · {formData.gender || '—'} · Born{' '}
            {formatDate(formData.dateOfBirth)}
          </div>
          <div className="text-[12px] text-secondary font-medium">
            Aadhaar {formData.aadhaarNumber ? last4(formData.aadhaarNumber) : '—'} · Licence{' '}
            {formData.drivingLicenceNumber || '—'}
          </div>
        </SummaryCard>

        <SummaryCard title="Communication" step={2} onEditStep={onEditStep} invalid={invalidSteps.has(2)}>
          <div className="text-caption font-bold text-primary">
            {formData.personalPhone || '—'} · {formData.officialEmail || '—'}
          </div>
          <div className="text-[12px] text-secondary font-medium">
            {formData.emergencyContacts.length} emergency contact
            {formData.emergencyContacts.length === 1 ? '' : 's'}
          </div>
        </SummaryCard>

        <SummaryCard title="Documents" step={3} onEditStep={onEditStep} invalid={invalidSteps.has(3)}>
          <div className="text-caption font-bold text-primary">
            {uploadedCount} of {docs.length} uploaded
          </div>
          <div className="text-[12px] text-secondary font-medium">
            {formData.highestQualification ? QUALIFICATION_LABELS[formData.highestQualification] : '—'} ·{' '}
            {formData.employeeBackground ? BACKGROUND_LABELS[formData.employeeBackground] : '—'}
          </div>
        </SummaryCard>

        <SummaryCard title="Employment" step={4} onEditStep={onEditStep} invalid={invalidSteps.has(4)}>
          <div className="text-caption font-bold text-primary">
            {role} · {formData.vertical || '—'} · {jobType}
          </div>
          <div className="text-[12px] text-secondary font-medium">
            {formData.role === 'MANAGING_DIRECTOR' ? 'No reporting authority' : `Reports to ${managerName || '—'}`}{' '}
            · Joins {formatDate(formData.joiningDate)} ·{' '}
            {formData.onProbation ? `Probation ${formData.probationPeriod}` : 'No probation'}
          </div>
        </SummaryCard>

        <SummaryCard title="Financial" step={5} onEditStep={onEditStep} invalid={invalidSteps.has(5)}>
          <div className="text-caption font-bold text-primary">
            {Number.isInteger(total) ? `${formatRupees(total)} / month` : '—'}
            {Number.isInteger(cash) && cash > 0 ? ` (${formatRupees(cash)} cash)` : ''}
          </div>
          <div className="text-[12px] text-secondary font-medium">
            {formData.ifscCode || '—'} · A/c {formData.accountNumber ? last4(formData.accountNumber) : '—'} ·
            Next appraisal {formatDate(formData.nextAppraisalWindow)}
          </div>
        </SummaryCard>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border-default">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-2 bg-white border border-border-default rounded-xl text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="px-6 py-2.5 bg-brand-accent text-primary text-caption font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? 'Creating employee…' : 'Create employee'}
        </button>
      </div>
    </div>
  )
}
