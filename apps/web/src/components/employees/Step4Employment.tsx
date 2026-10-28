import type { EmployeeRoleType, JobType } from '../../api/types'
import {
  BUSINESS_VERTICALS,
  FUNCTIONAL_VERTICALS,
  JOB_TYPE_LABELS,
  ROLE_LABELS,
} from '../../constants/employee'
import { useEmployees } from '../../hooks/useEmployees'
import type { EmployeeFormData } from './employeeForm'
import {
  ChoicePills,
  Field,
  SectionTitle,
  SelectInput,
  StepActions,
  StepHeader,
} from './FormControls'
import { inputClass } from './formStyles'
import { useStepValidation } from './useStepValidation'

export interface Step4EmploymentProps {
  formData: EmployeeFormData
  updateFormData: (data: Partial<EmployeeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const ROLE_OPTIONS = (Object.keys(ROLE_LABELS) as EmployeeRoleType[]).map((value) => ({
  value,
  label: ROLE_LABELS[value],
}))

const JOB_TYPE_OPTIONS = (Object.keys(JOB_TYPE_LABELS) as JobType[]).map((value) => ({
  value,
  label: JOB_TYPE_LABELS[value],
}))

export default function Step4Employment({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step4EmploymentProps) {
  const { errors, handleSubmit } = useStepValidation(4, formData, onNext)
  const { data: employees, isLoading: isLoadingEmployees, isError: employeesFailed } = useEmployees()

  // BR-07: the reporting authority must be an existing, active employee
  const managerOptions = (employees ?? [])
    .filter((emp) => emp.employmentStatus === 'ACTIVE')
    .map((emp) => ({
      value: emp.id,
      label: `${emp.firstName} ${emp.lastName} · ${emp.employeeId}`,
    }))

  const isManagingDirector = formData.role === 'MANAGING_DIRECTOR'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
      <StepHeader title="Employment" subtitle="Vertical, role, reporting line and probation." />

      {/* SECTION 1: PLACEMENT (BRD 8.4 #1–5) */}
      <div className="space-y-4 pt-2">
        <SectionTitle first>PLACEMENT</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Vertical" htmlFor="vertical" error={errors.vertical}>
            <select
              id="vertical"
              value={formData.vertical}
              onChange={(e) => updateFormData({ vertical: e.target.value })}
              className={inputClass(errors.vertical)}
            >
              <option value="" disabled>
                Select vertical
              </option>
              <optgroup label="Business verticals">
                {BUSINESS_VERTICALS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Functional verticals">
                {FUNCTIONAL_VERTICALS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </optgroup>
            </select>
          </Field>

          <Field label="Role" htmlFor="role" error={errors.role}>
            <SelectInput
              id="role"
              value={formData.role}
              onChange={(role) => updateFormData({ role: role as EmployeeRoleType })}
              placeholder="Select role"
              options={ROLE_OPTIONS}
              error={errors.role}
            />
          </Field>

          {!isManagingDirector && (
            <Field
              label="Reports to"
              htmlFor="reportingAuthorityId"
              error={errors.reportingAuthorityId}
              hint={employeesFailed ? 'Could not load employees — refresh to try again' : undefined}
            >
              <SelectInput
                id="reportingAuthorityId"
                value={formData.reportingAuthorityId}
                onChange={(reportingAuthorityId) => updateFormData({ reportingAuthorityId })}
                placeholder={isLoadingEmployees ? 'Loading employees…' : 'Select reporting authority'}
                options={managerOptions}
                error={errors.reportingAuthorityId}
              />
            </Field>
          )}

          <Field label="Joining date" htmlFor="joiningDate" error={errors.joiningDate}>
            <input
              id="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={(e) => updateFormData({ joiningDate: e.target.value })}
              className={inputClass(errors.joiningDate)}
            />
          </Field>

          <Field label="Job type" htmlFor="jobType" error={errors.jobType}>
            <SelectInput
              id="jobType"
              value={formData.jobType}
              onChange={(jobType) => updateFormData({ jobType: jobType as JobType })}
              placeholder="Select job type"
              options={JOB_TYPE_OPTIONS}
              error={errors.jobType}
            />
          </Field>
        </div>
      </div>

      {/* SECTION 2: PROBATION (FR-10, BR-10) */}
      <div className="space-y-4">
        <SectionTitle>PROBATION</SectionTitle>

        <Field label="Placed on probation?" error={errors.onProbation}>
          <ChoicePills
            options={[
              { value: 'yes' as const, label: 'Yes' },
              { value: 'no' as const, label: 'No' },
            ]}
            value={formData.onProbation === null ? '' : formData.onProbation ? 'yes' : 'no'}
            onChange={(value) => updateFormData({ onProbation: value === 'yes' })}
          />
        </Field>

        {formData.onProbation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Probation period" htmlFor="probationPeriod" error={errors.probationPeriod}>
              <input
                id="probationPeriod"
                type="text"
                value={formData.probationPeriod}
                onChange={(e) => updateFormData({ probationPeriod: e.target.value })}
                placeholder="e.g. 6 months"
                className={inputClass(errors.probationPeriod)}
              />
            </Field>

            <Field
              label="Financial agreement during probation"
              htmlFor="financialAgreement"
              error={errors.financialAgreement}
            >
              <input
                id="financialAgreement"
                type="text"
                value={formData.financialAgreement}
                onChange={(e) => updateFormData({ financialAgreement: e.target.value })}
                placeholder="e.g. ₹18,000 / month stipend"
                className={inputClass(errors.financialAgreement)}
              />
            </Field>
          </div>
        )}
      </div>

      <StepActions onBack={onBack} nextLabel="Continue to Financial" />
    </form>
  )
}
