import type { EmergencyContactInput } from '../../api/types'
import { RELATIONSHIPS } from '../../constants/employee'
import type { EmployeeFormData } from './employeeForm'
import { Field, SectionTitle, SelectInput, StepActions, StepHeader } from './FormControls'
import { inputClass } from './formStyles'
import { useStepValidation } from './useStepValidation'

export interface Step2CommunicationProps {
  formData: EmployeeFormData
  updateFormData: (data: Partial<EmployeeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const MAX_CONTACTS = 3

export default function Step2Communication({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step2CommunicationProps) {
  const { errors, handleSubmit } = useStepValidation(2, formData, onNext)
  const contacts = formData.emergencyContacts

  const handleContactChange = (index: number, field: keyof EmergencyContactInput, value: string) => {
    const updated = contacts.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    updateFormData({ emergencyContacts: updated })
  }

  const handleAddContact = () => {
    if (contacts.length < MAX_CONTACTS) {
      updateFormData({ emergencyContacts: [...contacts, { name: '', relationship: '', phone: '' }] })
    }
  }

  const handleRemoveContact = (index: number) => {
    updateFormData({ emergencyContacts: contacts.filter((_, i) => i !== index) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
      <StepHeader
        title="Communication"
        subtitle="How we reach the employee, and who to call in an emergency."
      />

      {/* SECTION 1: PHONE & EMAIL (BRD 8.2 #1–5) */}
      <div className="space-y-4 pt-2">
        <SectionTitle first>PHONE & EMAIL</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Personal phone" htmlFor="personalPhone" error={errors.personalPhone}>
            <input
              id="personalPhone"
              type="tel"
              value={formData.personalPhone}
              onChange={(e) => updateFormData({ personalPhone: e.target.value })}
              placeholder="98410 23456"
              className={inputClass(errors.personalPhone)}
            />
          </Field>

          <Field label="Secondary phone" htmlFor="secondaryPhone" error={errors.secondaryPhone}>
            <input
              id="secondaryPhone"
              type="tel"
              value={formData.secondaryPhone}
              onChange={(e) => updateFormData({ secondaryPhone: e.target.value })}
              placeholder="94430 11872"
              className={inputClass(errors.secondaryPhone)}
            />
          </Field>

          <Field label="Personal email" htmlFor="personalEmail" error={errors.personalEmail}>
            <input
              id="personalEmail"
              type="email"
              value={formData.personalEmail}
              onChange={(e) => updateFormData({ personalEmail: e.target.value })}
              placeholder="priya.raman@gmail.com"
              className={inputClass(errors.personalEmail)}
            />
          </Field>

          <Field label="Official phone" htmlFor="officialPhone" error={errors.officialPhone}>
            <input
              id="officialPhone"
              type="tel"
              value={formData.officialPhone}
              onChange={(e) => updateFormData({ officialPhone: e.target.value })}
              placeholder="Company-issued number"
              className={inputClass(errors.officialPhone)}
            />
          </Field>

          <Field label="Official email" htmlFor="officialEmail" error={errors.officialEmail}>
            <input
              id="officialEmail"
              type="email"
              value={formData.officialEmail}
              onChange={(e) => updateFormData({ officialEmail: e.target.value })}
              placeholder="priya.r@landsandlands.in"
              className={inputClass(errors.officialEmail)}
            />
          </Field>
        </div>
      </div>

      {/* SECTION 2: ADDRESS (BRD 8.2 #6–7) */}
      <div className="space-y-4">
        <SectionTitle>ADDRESS</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Current address" htmlFor="currentAddress" error={errors.currentAddress}>
            <textarea
              id="currentAddress"
              rows={2}
              value={formData.currentAddress}
              onChange={(e) => updateFormData({ currentAddress: e.target.value })}
              placeholder="12, Gandhi Street, R.S. Puram, Coimbatore 641002"
              className={inputClass(errors.currentAddress)}
            />
          </Field>

          <Field label="Permanent address" htmlFor="permanentAddress" error={errors.permanentAddress}>
            <label className="flex items-center gap-2 text-caption text-primary font-medium pb-1">
              <input
                type="checkbox"
                checked={formData.permanentSameAsCurrent}
                onChange={(e) => updateFormData({ permanentSameAsCurrent: e.target.checked })}
              />
              Same as current address
            </label>
            {!formData.permanentSameAsCurrent && (
              <textarea
                id="permanentAddress"
                rows={2}
                value={formData.permanentAddress}
                onChange={(e) => updateFormData({ permanentAddress: e.target.value })}
                placeholder="Native / address on record"
                className={inputClass(errors.permanentAddress)}
              />
            )}
          </Field>
        </div>
      </div>

      {/* SECTION 3: EMERGENCY CONTACTS (BR-03: 1 to 3) */}
      <div className="space-y-4">
        <SectionTitle>EMERGENCY CONTACTS (1 TO 3)</SectionTitle>
        {errors.emergencyContacts && (
          <p className="text-[11px] font-medium text-error">{errors.emergencyContacts}</p>
        )}

        {contacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-start">
            <Field
              label={`Contact ${index + 1} · Name`}
              htmlFor={`contact-${index}-name`}
              error={errors[`emergencyContacts.${index}.name`]}
            >
              <input
                id={`contact-${index}-name`}
                type="text"
                value={contact.name}
                onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                placeholder="Raman K"
                className={inputClass(errors[`emergencyContacts.${index}.name`])}
              />
            </Field>

            <Field
              label="Relationship"
              htmlFor={`contact-${index}-relationship`}
              error={errors[`emergencyContacts.${index}.relationship`]}
            >
              <SelectInput
                id={`contact-${index}-relationship`}
                value={contact.relationship}
                onChange={(value) => handleContactChange(index, 'relationship', value)}
                placeholder="Select relationship"
                options={RELATIONSHIPS}
                error={errors[`emergencyContacts.${index}.relationship`]}
              />
            </Field>

            <Field
              label="Phone"
              htmlFor={`contact-${index}-phone`}
              error={errors[`emergencyContacts.${index}.phone`]}
            >
              <input
                id={`contact-${index}-phone`}
                type="tel"
                value={contact.phone}
                onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                placeholder="98940 55210"
                className={inputClass(errors[`emergencyContacts.${index}.phone`])}
              />
            </Field>

            <button
              type="button"
              onClick={() => handleRemoveContact(index)}
              disabled={contacts.length === 1}
              className="md:mt-7 px-3 py-2.5 text-caption font-semibold text-secondary hover:text-error transition-colors cursor-pointer disabled:invisible"
              aria-label={`Remove contact ${index + 1}`}
            >
              Remove
            </button>
          </div>
        ))}

        {contacts.length < MAX_CONTACTS && (
          <button
            type="button"
            onClick={handleAddContact}
            className="flex items-center gap-1.5 text-caption font-bold text-primary hover:text-brand-accent transition-colors pt-1 cursor-pointer"
          >
            <span>+</span> Add another contact
          </button>
        )}
      </div>

      <StepActions onBack={onBack} nextLabel="Continue to Documents" />
    </form>
  )
}
