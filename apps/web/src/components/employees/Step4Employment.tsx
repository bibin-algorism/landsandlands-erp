import type { CreateEmployeePayload, EmployeeRoleType, JobType } from '../../api/types'

export interface Step4EmploymentProps {
  formData: CreateEmployeePayload
  updateFormData: (data: Partial<CreateEmployeePayload>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step4Employment({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step4EmploymentProps) {
  const hasProbation = formData.probationPeriod !== 'None'

  const handleProbationToggle = (val: boolean) => {
    updateFormData({
      probationPeriod: val ? '3 Months' : 'None',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-h2 font-serif font-bold text-primary">Employment</h2>
        <p className="text-caption text-secondary font-medium">
          Role, reporting line and work background.
        </p>
      </div>

      {/* SECTION 1: ROLE */}
      <div className="space-y-4 pt-2">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          ROLE
        </h3>

        {/* Row 1: 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Vertical */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Vertical <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.vertical || 'Sales'}
                onChange={(e) => updateFormData({ vertical: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors appearance-none cursor-pointer pr-9"
              >
                <option value="Sales">Sales</option>
                <option value="CRM">CRM</option>
                <option value="Accounts">Accounts</option>
                <option value="Site — Trichy">Site — Trichy</option>
                <option value="HR">HR</option>
                <option value="Projects">Projects</option>
                <option value="Legal">Legal</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-caption">
                ▾
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Role <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.role || 'EXECUTIVE'}
                onChange={(e) => updateFormData({ role: e.target.value as EmployeeRoleType })}
                className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors appearance-none cursor-pointer pr-9"
              >
                <option value="EXECUTIVE">Sales executive</option>
                <option value="VERTICAL_HEAD">Vertical Head</option>
                <option value="MANAGEMENT_ADMIN">Management Admin</option>
                <option value="COO">COO</option>
                <option value="MANAGING_DIRECTOR">Managing Director</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-caption">
                ▾
              </div>
            </div>
          </div>

          {/* Reports to */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Reports to <span className="text-error">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-secondary text-caption pointer-events-none">
                👤
              </span>
              <select
                value={formData.reportingAuthorityId || 'LL-3M8XD'}
                onChange={(e) => updateFormData({ reportingAuthorityId: e.target.value })}
                className="w-full pl-9 pr-9 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors appearance-none cursor-pointer"
              >
                <option value="LL-3M8XD">Arun Kumar - LL-3M8XD</option>
                <option value="LL-7K2Q9">Karthik Raja - LL-7K2Q9</option>
                <option value="LL-1A2B3">Meena S - LL-1A2B3</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-caption">
                ▾
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Date of joining */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Date of joining <span className="text-error">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.joiningDate || '2026-09-30'}
              onChange={(e) => updateFormData({ joiningDate: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Job type */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Job type <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.jobType || 'PERMANENT'}
                onChange={(e) => updateFormData({ jobType: e.target.value as JobType })}
                className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors appearance-none cursor-pointer pr-9"
              >
                <option value="PERMANENT">Full-time</option>
                <option value="TEMPORARY">Part-time</option>
                <option value="CONTRACT">Contract</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary text-caption">
                ▾
              </div>
            </div>
          </div>

          {/* Official email */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Official email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.officialEmail || 'priya.r@landsandlands.in'}
              onChange={(e) => updateFormData({ officialEmail: e.target.value })}
              placeholder="priya.r@landsandlands.in"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Probation Toggle */}
        <div className="space-y-2 pt-1">
          <label className="block text-caption font-semibold text-secondary">
            Probation <span className="text-error">*</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleProbationToggle(true)}
              className={`px-5 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer ${
                hasProbation
                  ? 'bg-[#18181B] text-white shadow-xs'
                  : 'bg-white border border-[#D4D4D8] text-secondary hover:text-primary'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleProbationToggle(false)}
              className={`px-5 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer ${
                !hasProbation
                  ? 'bg-[#18181B] text-white shadow-xs'
                  : 'bg-white border border-[#D4D4D8] text-secondary hover:text-primary'
              }`}
            >
              No
            </button>
          </div>
        </div>
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
          Continue to Financial
        </button>
      </div>
    </form>
  )
}
