import type { CreateEmployeePayload, EmergencyContactInput } from '../../api/types'

export interface Step2CommunicationProps {
  formData: CreateEmployeePayload
  updateFormData: (data: Partial<CreateEmployeePayload>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step2Communication({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step2CommunicationProps) {
  const contacts: EmergencyContactInput[] =
    formData.emergencyContacts && formData.emergencyContacts.length > 0
      ? formData.emergencyContacts
      : [
          {
            name: 'Raman K',
            relationship: 'Father',
            phone: '+91 98940 55210',
            isPrimary: true,
          },
        ]

  const handleContactChange = (index: number, field: keyof EmergencyContactInput, value: string) => {
    const updated = [...contacts]
    updated[index] = { ...updated[index], [field]: value }
    updateFormData({ emergencyContacts: updated })
  }

  const handleAddContact = () => {
    if (contacts.length < 3) {
      const updated = [
        ...contacts,
        { name: '', relationship: 'Spouse', phone: '', isPrimary: false },
      ]
      updateFormData({ emergencyContacts: updated })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-h2 font-serif font-bold text-primary">Communication</h2>
        <p className="text-caption text-secondary font-medium">
          How we reach the employee, and who to call in an emergency.
        </p>
      </div>

      {/* SECTION 1: PHONE & EMAIL */}
      <div className="space-y-4 pt-2">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          PHONE & EMAIL
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mobile number */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Mobile number <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.personalPhone}
              onChange={(e) => updateFormData({ personalPhone: e.target.value })}
              placeholder="+91 98410 23456"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Secondary mobile */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Secondary mobile <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.secondaryPhone || ''}
              onChange={(e) => updateFormData({ secondaryPhone: e.target.value })}
              placeholder="+91 94430 11872"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Personal email */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Personal email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.personalEmail}
              onChange={(e) => updateFormData({ personalEmail: e.target.value })}
              placeholder="priya.raman@gmail.com"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: ADDRESS */}
      <div className="space-y-4 pt-4 border-t border-border-default/50">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          ADDRESS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current address */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Current address <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.currentAddress}
              onChange={(e) => updateFormData({ currentAddress: e.target.value })}
              placeholder="12, Gandhi Street, R.S. Puram, Coimbatore 641002"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Permanent address */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Permanent address <span className="text-error">*</span>
            </label>
            <select
              value={formData.permanentAddress || 'Same as current address'}
              onChange={(e) => updateFormData({ permanentAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
            >
              <option value="Same as current address">Same as current address</option>
              <option value="Custom address">Different permanent address</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 3: EMERGENCY CONTACTS (1 TO 3) */}
      <div className="space-y-4 pt-4 border-t border-border-default/50">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          EMERGENCY CONTACTS (1 TO 3)
        </h3>

        {contacts.map((contact, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Contact Name */}
            <div className="space-y-1.5">
              <label className="block text-caption font-semibold text-secondary">
                Contact {index + 1} · Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={contact.name}
                onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                placeholder="Raman K"
                className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
              />
            </div>

            {/* Relationship */}
            <div className="space-y-1.5">
              <label className="block text-caption font-semibold text-secondary">
                Relationship <span className="text-error">*</span>
              </label>
              <select
                value={contact.relationship}
                onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Spouse">Spouse</option>
                <option value="Sibling">Sibling</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Mobile */}
            <div className="space-y-1.5">
              <label className="block text-caption font-semibold text-secondary">
                Mobile <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                required
                value={contact.phone}
                onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                placeholder="+91 98940 55210"
                className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
              />
            </div>
          </div>
        ))}

        {contacts.length < 3 && (
          <button
            type="button"
            onClick={handleAddContact}
            className="flex items-center gap-1.5 text-caption font-bold text-primary hover:text-brand-accent transition-colors pt-1 cursor-pointer"
          >
            <span>+</span> Add another contact
          </button>
        )}
      </div>

      {/* Form Bottom Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-border-default">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 bg-white border border-border-default rounded-xl text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
        >
          Back
        </button>

        <span className="text-caption text-secondary font-medium hidden sm:inline-block">
          <span className="text-[#047857]">✓</span> Saved automatically · 10:42 am
        </span>

        <button
          type="submit"
          className="px-6 py-2.5 bg-brand-accent text-primary text-caption font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
        >
          Continue to Documents
        </button>
      </div>
    </form>
  )
}
