import { useMemo } from 'react'
import type { CreateEmployeePayload } from '../../api/types'

export interface Step5FinancialProps {
  formData: CreateEmployeePayload
  updateFormData: (data: Partial<CreateEmployeePayload>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step5Financial({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step5FinancialProps) {

  const takeHomePay = formData.takeHomePayTotal ?? 42000
  const bankComp = formData.bankComponent ?? takeHomePay
  const cashComp = formData.cashComponent ?? 0
  const accountHolder = formData.accountHolderName || `${formData.firstName || 'Priya'} ${formData.lastName || 'Raman'}`
  const accNum = formData.accountNumber || '50100 4821 7739'
  const ifsc = formData.ifscCode || 'HDFC0001234'
  const probationVal = formData.probationPeriod || '6 months'

  const totalPayMatch = bankComp + cashComp === takeHomePay

  // Dynamic probation end date calculation based on joiningDate + probation period
  const probationEndDate = useMemo(() => {
    if (probationVal.toLowerCase().includes('no')) return 'N/A (No probation)'
    
    const monthsMatch = probationVal.match(/\d+/)
    const months = monthsMatch ? parseInt(monthsMatch[0], 10) : 6

    const start = formData.joiningDate ? new Date(formData.joiningDate) : new Date()
    const target = new Date(start)
    target.setMonth(target.getMonth() + months)

    const day = target.getDate()
    const month = target.toLocaleString('en-US', { month: 'short' })
    const year = target.getFullYear()
    return `${day} ${month} ${year}`
  }, [formData.joiningDate, probationVal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  // Format currency display string
  const formatAmount = (val: number) => {
    return `₹${val.toLocaleString('en-IN')}`
  }

  const handlePayChange = (valStr: string) => {
    const num = parseInt(valStr.replace(/\D/g, ''), 10) || 0
    updateFormData({
      takeHomePayTotal: num,
      bankComponent: num - cashComp,
    })
  }

  const handleBankChange = (valStr: string) => {
    const num = parseInt(valStr.replace(/\D/g, ''), 10) || 0
    updateFormData({ bankComponent: num })
  }

  const handleCashChange = (valStr: string) => {
    const num = parseInt(valStr.replace(/\D/g, ''), 10) || 0
    updateFormData({ cashComponent: num })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-h2 font-serif font-bold text-primary">Financial</h2>
        <p className="text-caption text-secondary font-medium">
          Take-home pay and how it's paid. Only HR, MD, COO and the employee can see this.
        </p>
      </div>

      {/* SECTION 1: PAY */}
      <div className="space-y-3 pt-2">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          PAY
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Monthly take-home pay */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Monthly take-home pay <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formatAmount(takeHomePay)}
              onChange={(e) => handlePayChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary font-medium outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Paid to bank account */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Paid to bank account <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formatAmount(bankComp)}
              onChange={(e) => handleBankChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary font-medium outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Paid in cash */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Paid in cash <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={formatAmount(cashComp)}
              onChange={(e) => handleCashChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary font-medium outline-none focus:border-border-strong transition-colors"
            />
          </div>
        </div>

        {/* Dynamic Calculation Validation Badge */}
        <div className="pt-1">
          {totalPayMatch ? (
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl px-3.5 py-2 text-caption font-medium text-[#047857] inline-flex items-center gap-1.5">
              <span>✓</span>
              <span>
                Bank {formatAmount(bankComp)} + Cash {formatAmount(cashComp)} = {formatAmount(takeHomePay)} — matches the take-home pay
              </span>
            </div>
          ) : (
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-3.5 py-2 text-caption font-medium text-[#B42318] inline-flex items-center gap-1.5">
              <span>⚠️</span>
              <span>
                Bank {formatAmount(bankComp)} + Cash {formatAmount(cashComp)} = {formatAmount(bankComp + cashComp)} — does not match total pay {formatAmount(takeHomePay)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: BANK ACCOUNT */}
      <div className="space-y-3 pt-4 border-t border-border-default/50">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          BANK ACCOUNT
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Account holder name */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Account holder name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={accountHolder}
              onChange={(e) => updateFormData({ accountHolderName: e.target.value })}
              placeholder="e.g. Priya Raman"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary font-medium placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* Account number */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Account number <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={accNum}
              onChange={(e) => updateFormData({ accountNumber: e.target.value })}
              placeholder="Bank account number"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary font-medium placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
          </div>

          {/* IFSC */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              IFSC <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={ifsc}
              onChange={(e) => updateFormData({ ifscCode: e.target.value.toUpperCase() })}
              placeholder="e.g. HDFC0001234"
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary font-medium uppercase placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
            />
            {ifsc.toUpperCase().startsWith('HDFC') && (
              <p className="text-[12px] font-semibold text-[#047857]">
                HDFC Bank · R.S. Puram, Coimbatore
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: PROBATION */}
      <div className="space-y-3 pt-4 border-t border-border-default/50">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          PROBATION
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {/* Probation period */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Probation period <span className="text-error">*</span>
            </label>
            <select
              value={probationVal}
              onChange={(e) => updateFormData({ probationPeriod: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary font-medium outline-none focus:border-border-strong transition-colors"
            >
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="9 months">9 months</option>
              <option value="12 months">12 months</option>
              <option value="No probation">No probation</option>
            </select>
          </div>

          {/* Probation ends */}
          <div className="space-y-1.5">
            <label className="block text-caption font-semibold text-secondary">
              Probation ends
            </label>
            <input
              type="text"
              readOnly
              value={probationEndDate}
              className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-body-small text-primary font-medium outline-none cursor-default"
            />
          </div>
        </div>
      </div>

      {/* Action Bar */}
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
          Continue to Review
        </button>
      </div>
    </form>
  )
}
