import type { CreateEmployeePayload } from '../../api/types'

export interface Step1PersonalProps {
  formData: CreateEmployeePayload
  updateFormData: (data: Partial<CreateEmployeePayload>) => void
  onNext: () => void
}

export default function Step1Personal({ formData, updateFormData, onNext }: Step1PersonalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  // Derived full name handler
  const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim()
  const handleFullNameChange = (val: string) => {
    const parts = val.trim().split(' ')
    const firstName = parts[0] || ''
    const lastName = parts.slice(1).join(' ') || ''
    updateFormData({ firstName, lastName })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-h4 font-serif font-bold text-primary">Personal</h2>
        <p className="text-caption text-secondary font-medium">
          Enter details exactly as on the Aadhaar card.
        </p>
      </div>

      {/* SECTION 1: IDENTITY */}
      <div className="space-y-4 pt-2">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          IDENTITY
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Full name (as on Aadhaar) <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => handleFullNameChange(e.target.value)}
              placeholder="Priya Raman"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Date of birth <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
              placeholder="14 Mar 1996"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Gender <span className="text-error">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => updateFormData({ gender: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Father's / Spouse's Name */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Father's / spouse's name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fatherName}
              onChange={(e) => updateFormData({ fatherName: e.target.value })}
              placeholder="Raman K"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Blood Group */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Blood group <span className="text-error">*</span>
            </label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => updateFormData({ bloodGroup: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
            >
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Marital status <span className="text-error">*</span>
            </label>
            <select
              value={formData.maritalStatus}
              onChange={(e) => updateFormData({ maritalStatus: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: GOVERNMENT IDS */}
      <div className="space-y-4 pt-4 border-t border-border-default/50">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          GOVERNMENT IDS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Aadhaar Number */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Aadhaar number <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.aadhaarNumber}
              onChange={(e) => updateFormData({ aadhaarNumber: e.target.value })}
              placeholder="5821 9034 4821"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
            <p className="text-[11px] font-medium text-[#047857] flex items-center gap-1">
              Checked — no existing employee has this Aadhaar
            </p>
          </div>

          {/* PAN */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              PAN <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.panNumber || ''}
              onChange={(e) => updateFormData({ panNumber: e.target.value })}
              placeholder="ABCPR1234F"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors uppercase"
            />
          </div>

          {/* Driving Licence Number */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Driving licence number <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={formData.drivingLicenceNumber}
              onChange={(e) => updateFormData({ drivingLicenceNumber: e.target.value })}
              placeholder="Enter licence number"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
            <p className="text-[11px] text-secondary">
              Leave empty only if the employee has none (to confirm)
            </p>
          </div>
        </div>
      </div>

      {/* Form Bottom Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-border-default">
        <button
          type="button"
          disabled
          className="px-5 py-2 bg-bg-subtle text-disabled border border-border-default rounded-xl text-caption font-semibold opacity-60 cursor-not-allowed"
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
          Continue to Communication
        </button>
      </div>
    </form>
  )
}
