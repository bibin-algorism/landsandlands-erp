import { formatRupees, toRupees, type EmployeeFormData } from './employeeForm'
import { Field, SectionTitle, StepActions, StepHeader } from './FormControls'
import { inputClass } from './formStyles'
import { useStepValidation } from './useStepValidation'

export interface Step5FinancialProps {
  formData: EmployeeFormData
  updateFormData: (data: Partial<EmployeeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const wholeRupees = (value: string) => value.replace(/\D/g, '')

export default function Step5Financial({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step5FinancialProps) {
  const { errors, handleSubmit } = useStepValidation(5, formData, onNext)

  const total = toRupees(formData.takeHomePayTotal)
  const bank = toRupees(formData.bankComponent)
  const cash = toRupees(formData.cashComponent)
  const allEntered = [total, bank, cash].every(Number.isInteger)

  // Default the bank share to the remainder so a fully-banked salary needs one entry.
  const handleTotalChange = (value: string) => {
    const nextTotal = toRupees(wholeRupees(value))
    const nextBank =
      Number.isInteger(nextTotal) && Number.isInteger(cash) ? String(Math.max(nextTotal - cash, 0)) : ''
    updateFormData({ takeHomePayTotal: wholeRupees(value), bankComponent: nextBank })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
      <StepHeader
        title="Financial"
        subtitle="Take-home pay and how it's paid. Only HR, MD, COO and the employee can see this."
      />

      {/* SECTION 1: PAY (BRD 8.5 #2, BR-09) */}
      <div className="space-y-3 pt-2">
        <SectionTitle first>MONTHLY TAKE-HOME PAY (₹)</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Total" htmlFor="takeHomePayTotal" error={errors.takeHomePayTotal}>
            <input
              id="takeHomePayTotal"
              type="text"
              inputMode="numeric"
              value={formData.takeHomePayTotal}
              onChange={(e) => handleTotalChange(e.target.value)}
              placeholder="42000"
              className={inputClass(errors.takeHomePayTotal)}
            />
          </Field>

          <Field label="Paid to bank account" htmlFor="bankComponent" error={errors.bankComponent}>
            <input
              id="bankComponent"
              type="text"
              inputMode="numeric"
              value={formData.bankComponent}
              onChange={(e) => updateFormData({ bankComponent: wholeRupees(e.target.value) })}
              className={inputClass(errors.bankComponent || errors.payMismatch)}
            />
          </Field>

          <Field label="Paid in cash" htmlFor="cashComponent" error={errors.cashComponent}>
            <input
              id="cashComponent"
              type="text"
              inputMode="numeric"
              value={formData.cashComponent}
              onChange={(e) => updateFormData({ cashComponent: wholeRupees(e.target.value) })}
              className={inputClass(errors.cashComponent || errors.payMismatch)}
            />
          </Field>
        </div>

        {allEntered && (
          <div
            className={`rounded-xl px-3.5 py-2 text-caption font-medium inline-flex items-center gap-1.5 border ${
              bank + cash === total
                ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'
                : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B42318]'
            }`}
          >
            Bank {formatRupees(bank)} + Cash {formatRupees(cash)} = {formatRupees(bank + cash)}
            {bank + cash === total
              ? ' — matches the take-home pay'
              : ` — must equal the take-home pay of ${formatRupees(total)}`}
          </div>
        )}
      </div>

      {/* SECTION 2: BANK ACCOUNT (BRD 8.5 #1) */}
      <div className="space-y-3">
        <SectionTitle>BANK ACCOUNT</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Account holder name" htmlFor="accountHolderName" error={errors.accountHolderName}>
            <input
              id="accountHolderName"
              type="text"
              value={formData.accountHolderName}
              onChange={(e) => updateFormData({ accountHolderName: e.target.value })}
              placeholder="As printed on the passbook"
              className={inputClass(errors.accountHolderName)}
            />
          </Field>

          <Field label="Account number" htmlFor="accountNumber" error={errors.accountNumber}>
            <input
              id="accountNumber"
              type="text"
              inputMode="numeric"
              value={formData.accountNumber}
              onChange={(e) => updateFormData({ accountNumber: e.target.value })}
              placeholder="Bank account number"
              className={inputClass(errors.accountNumber)}
            />
          </Field>

          <Field label="IFSC" htmlFor="ifscCode" error={errors.ifscCode}>
            <input
              id="ifscCode"
              type="text"
              maxLength={11}
              value={formData.ifscCode}
              onChange={(e) => updateFormData({ ifscCode: e.target.value.toUpperCase() })}
              placeholder="HDFC0001234"
              className={`${inputClass(errors.ifscCode)} uppercase`}
            />
          </Field>

          <Field label="Branch name" htmlFor="branchName" error={errors.branchName}>
            <input
              id="branchName"
              type="text"
              value={formData.branchName}
              onChange={(e) => updateFormData({ branchName: e.target.value })}
              placeholder="R.S. Puram, Coimbatore"
              className={inputClass(errors.branchName)}
            />
          </Field>
        </div>
      </div>

      {/* SECTION 3: APPRAISAL (BRD 8.5 #4) */}
      <div className="space-y-3">
        <SectionTitle>APPRAISAL</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Next appraisal window" htmlFor="nextAppraisalWindow" error={errors.nextAppraisalWindow}>
            <input
              id="nextAppraisalWindow"
              type="date"
              min={formData.joiningDate || undefined}
              value={formData.nextAppraisalWindow}
              onChange={(e) => updateFormData({ nextAppraisalWindow: e.target.value })}
              className={inputClass(errors.nextAppraisalWindow)}
            />
          </Field>
        </div>
      </div>

      <StepActions onBack={onBack} nextLabel="Continue to Review" />
    </form>
  )
}
