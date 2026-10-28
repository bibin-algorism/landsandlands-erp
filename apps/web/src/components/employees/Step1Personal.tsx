import { BLOOD_GROUPS, GENDERS, MARITAL_STATUSES } from '../../constants/employee'
import { todayIso, type EmployeeFormData } from './employeeForm'
import { Field, SectionTitle, SelectInput, StepActions, StepHeader } from './FormControls'
import { inputClass } from './formStyles'
import { useStepValidation } from './useStepValidation'

export interface Step1PersonalProps {
  formData: EmployeeFormData
  updateFormData: (data: Partial<EmployeeFormData>) => void
  onNext: () => void
}

export default function Step1Personal({ formData, updateFormData, onNext }: Step1PersonalProps) {
  const { errors, handleSubmit } = useStepValidation(1, formData, onNext)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
      <StepHeader title="Personal" subtitle="Enter details exactly as on the Aadhaar card." />

      {/* SECTION 1: IDENTITY (BRD 8.1) */}
      <div className="space-y-4 pt-2">
        <SectionTitle first>IDENTITY</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="First name" htmlFor="firstName" error={errors.firstName}>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              placeholder="Priya"
              className={inputClass(errors.firstName)}
            />
          </Field>

          <Field label="Last name / initial" htmlFor="lastName" error={errors.lastName}>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              placeholder="Raman"
              className={inputClass(errors.lastName)}
            />
          </Field>

          <Field label="Date of birth" htmlFor="dateOfBirth" error={errors.dateOfBirth}>
            <input
              id="dateOfBirth"
              type="date"
              max={todayIso()}
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
              className={inputClass(errors.dateOfBirth)}
            />
          </Field>

          <Field label="Gender" htmlFor="gender" error={errors.gender}>
            <SelectInput
              id="gender"
              value={formData.gender}
              onChange={(gender) => updateFormData({ gender })}
              placeholder="Select gender"
              options={GENDERS}
              error={errors.gender}
            />
          </Field>

          <Field label="Blood group" htmlFor="bloodGroup" error={errors.bloodGroup}>
            <SelectInput
              id="bloodGroup"
              value={formData.bloodGroup}
              onChange={(bloodGroup) => updateFormData({ bloodGroup })}
              placeholder="Select blood group"
              options={BLOOD_GROUPS}
              error={errors.bloodGroup}
            />
          </Field>

          <Field label="Marital status" htmlFor="maritalStatus" error={errors.maritalStatus}>
            <SelectInput
              id="maritalStatus"
              value={formData.maritalStatus}
              onChange={(maritalStatus) => updateFormData({ maritalStatus })}
              placeholder="Select marital status"
              options={MARITAL_STATUSES}
              error={errors.maritalStatus}
            />
          </Field>

          <Field label="Father's name" htmlFor="fatherName" error={errors.fatherName}>
            <input
              id="fatherName"
              type="text"
              value={formData.fatherName}
              onChange={(e) => updateFormData({ fatherName: e.target.value })}
              placeholder="As on identity documents"
              className={inputClass(errors.fatherName)}
            />
          </Field>
        </div>
      </div>

      {/* SECTION 2: GOVERNMENT IDS (BRD 8.3 #1, #3) — images are captured in Documents */}
      <div className="space-y-4">
        <SectionTitle>GOVERNMENT IDS</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Aadhaar number" htmlFor="aadhaarNumber" error={errors.aadhaarNumber}>
            <input
              id="aadhaarNumber"
              type="text"
              inputMode="numeric"
              maxLength={14}
              value={formData.aadhaarNumber}
              onChange={(e) => updateFormData({ aadhaarNumber: e.target.value })}
              placeholder="5821 9034 4821"
              className={inputClass(errors.aadhaarNumber)}
            />
          </Field>

          <Field
            label="Driving licence number"
            htmlFor="drivingLicenceNumber"
            error={errors.drivingLicenceNumber}
          >
            <input
              id="drivingLicenceNumber"
              type="text"
              value={formData.drivingLicenceNumber}
              onChange={(e) => updateFormData({ drivingLicenceNumber: e.target.value })}
              placeholder="TN38 20190012345"
              className={`${inputClass(errors.drivingLicenceNumber)} uppercase`}
            />
          </Field>
        </div>
      </div>

      <StepActions nextLabel="Continue to Communication" />
    </form>
  )
}
