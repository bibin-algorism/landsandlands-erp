import type { CreateEmployeePayload } from '../../api/types'
import ErrorAlert from '../ErrorAlert'

export interface Step6ReviewProps {
  formData: CreateEmployeePayload
  onSubmit: () => void
  onBack: () => void
  onEditStep?: (step: number) => void
  isSubmitting: boolean
  error: string | null
}

export default function Step6Review({
  formData,
  onSubmit,
  onBack,
  onEditStep,
  isSubmitting,
  error,
}: Step6ReviewProps) {
  const firstName = formData.firstName || 'Priya'
  const lastName = formData.lastName || 'Raman'
  const fullName = `${firstName} ${lastName}`.trim()

  // Format Aadhaar & PAN masked strings
  const cleanAadhaar = (formData.aadhaarNumber || '').replace(/\D/g, '')
  const last4Aadhaar = cleanAadhaar ? cleanAadhaar.slice(-4) : '4821'

  const cleanPan = formData.panNumber || ''
  const last4Pan = cleanPan ? cleanPan.slice(-4) : '234F'

  // Dynamic Document counts and missing items list
  const docFiles = formData.documentFiles || {}
  const qual = formData.highestQualification || 'UG_DEGREE'
  const bg = formData.employeeBackground || 'FRESHER'

  const docItems: { key: string; label: string }[] = [
    { key: 'aadhaarFront', label: 'Aadhaar front' },
    { key: 'aadhaarBack', label: 'Aadhaar back' },
    { key: 'panFront', label: 'PAN front' },
    { key: 'drivingLicence', label: 'driving licence' },
    { key: '10thMarkSheet', label: '10th' },
  ]
  if (qual === 'TWELFTH' || qual === 'UG_DEGREE' || qual === 'PG_DEGREE') {
    docItems.push({ key: '12thMarkSheet', label: '12th' })
  }
  if (qual === 'UG_DEGREE' || qual === 'PG_DEGREE') {
    docItems.push({ key: 'degreeCertificate', label: 'Degree certificate' })
  }
  if (qual === 'PG_DEGREE') {
    docItems.push({ key: 'mastersCertificate', label: 'Master certificate' })
  }
  if (bg === 'EXPERIENCED') {
    docItems.push(
      { key: 'relievingExperience', label: 'Relieving letter' },
      { key: 'salarySlip', label: 'Salary slip' }
    )
  } else if (bg === 'FREELANCER' || bg === 'ENTREPRENEUR') {
    docItems.push({ key: 'recordOfIncome', label: 'Income proof' })
  }

  const uploadedDocs = docItems.filter(
    (item) => docFiles[item.key]?.status === 'uploaded' || docFiles[item.key]?.status === 'verified'
  )
  const missingDocs = docItems.filter(
    (item) => docFiles[item.key]?.status !== 'uploaded' && docFiles[item.key]?.status !== 'verified'
  )

  const uploadedCount = uploadedDocs.length
  const totalCount = docItems.length
  const missingCount = missingDocs.length

  const missingLabelsText = missingDocs.map((d) => d.label).join(', ')

  // Role label display
  const roleLabel =
    formData.role === 'EXECUTIVE'
      ? 'Sales executive'
      : formData.role === 'VERTICAL_HEAD'
      ? 'Vertical Head'
      : formData.role === 'MANAGEMENT_ADMIN'
      ? 'Management Admin'
      : formData.role === 'COO'
      ? 'COO'
      : formData.role === 'MANAGING_DIRECTOR'
      ? 'Managing Director'
      : formData.role || 'Sales executive'

  // Manager name display
  const managerName =
    formData.reportingAuthorityId === 'LL-7K2Q9'
      ? 'Karthik Raja'
      : formData.reportingAuthorityId === 'LL-9P4W1'
      ? 'Meena S'
      : 'Arun Kumar'

  // Format joining date string (e.g. 30 Sep 2026)
  const formatJoiningDate = (dateStr?: string) => {
    if (!dateStr) return '30 Sep 2026'
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return `${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`
    } catch {
      return dateStr
    }
  }

  // Financial details formatting
  const payTotal = formData.takeHomePayTotal || 42000
  const accNum = formData.accountNumber || '50100 4821 7739'
  const last4Acc = accNum.replace(/\D/g, '').slice(-4) || '7739'
  const ifsc = formData.ifscCode || 'HDFC0001234'
  const bankName = ifsc.toUpperCase().startsWith('HDFC') ? 'HDFC' : 'Bank'

  const emergencyCount = (formData.emergencyContacts || []).length || 1

  return (
    <div className="space-y-6 text-left">
      {/* Header & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-h2 font-serif font-bold text-primary">Review</h2>
        <p className="text-caption text-secondary font-medium">
          Check everything once before creating the employee.
        </p>
      </div>

      {error && <ErrorAlert title="Submission Failed" message={error} />}

      {/* Conditional Missing Docs Alert Banner */}
      {missingCount > 0 && (
        <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-3.5 text-caption font-medium text-[#B42318] flex items-center gap-2">
          <span>⚠️</span>
          <span>
            {missingCount} document{missingCount > 1 ? 's are' : ' is'} still missing. {firstName} will be saved as "Incomplete" and reminded until they're added.
          </span>
        </div>
      )}

      {/* Summary Cards Grid (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CARD 1: PERSONAL */}
        <div className="p-4 bg-white border border-border-default rounded-2xl space-y-2 shadow-xs hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-caption font-bold text-primary">Personal</span>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-caption font-semibold text-primary underline hover:text-secondary transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
          <div className="space-y-0.5">
            <div className="text-caption font-bold text-primary">
              {fullName} · {formData.gender || 'Female'} · {formData.dateOfBirth || '14 Mar 1996'}
            </div>
            <div className="text-[12px] text-secondary font-medium">
              Aadhaar ****{last4Aadhaar} · PAN ****{last4Pan}
            </div>
          </div>
        </div>

        {/* CARD 2: COMMUNICATION */}
        <div className="p-4 bg-white border border-border-default rounded-2xl space-y-2 shadow-xs hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-caption font-bold text-primary">Communication</span>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-caption font-semibold text-primary underline hover:text-secondary transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
          <div className="space-y-0.5">
            <div className="text-caption font-bold text-primary">
              {formData.personalPhone || '+91 98410 23456'}
            </div>
            <div className="text-[12px] text-secondary font-medium">
              Coimbatore · {emergencyCount} emergency contact{emergencyCount > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* CARD 3: DOCUMENTS */}
        <div className="p-4 bg-white border border-border-default rounded-2xl space-y-2 shadow-xs hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-caption font-bold text-primary">Documents</span>
              {missingCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#FEF2F2] border border-[#FCA5A5] text-[#B42318] rounded-full">
                  {missingCount} missing
                </span>
              )}
            </div>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-caption font-semibold text-primary underline hover:text-secondary transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
          <div className="space-y-0.5">
            <div className="text-caption font-bold text-primary">
              {uploadedCount} of {totalCount} added
            </div>
            {missingCount > 0 ? (
              <div className="text-[12px] text-secondary font-medium">
                Missing: {missingLabelsText}
              </div>
            ) : (
              <div className="text-[12px] text-[#047857] font-medium">
                All documents uploaded ✓
              </div>
            )}
          </div>
        </div>

        {/* CARD 4: EMPLOYMENT */}
        <div className="p-4 bg-white border border-border-default rounded-2xl space-y-2 shadow-xs hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-caption font-bold text-primary">Employment</span>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="text-caption font-semibold text-primary underline hover:text-secondary transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
          <div className="space-y-0.5">
            <div className="text-caption font-bold text-primary">
              {roleLabel} · {formData.vertical || 'Sales'}
            </div>
            <div className="text-[12px] text-secondary font-medium">
              Reports to {managerName} · Joins {formatJoiningDate(formData.joiningDate)}
            </div>
          </div>
        </div>

        {/* CARD 5: FINANCIAL */}
        <div className="p-4 bg-white border border-border-default rounded-2xl space-y-2 shadow-xs hover:border-border-strong transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-caption font-bold text-primary">Financial</span>
            {onEditStep && (
              <button
                type="button"
                onClick={() => onEditStep(5)}
                className="text-caption font-semibold text-primary underline hover:text-secondary transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
          <div className="space-y-0.5">
            <div className="text-caption font-bold text-primary">
              ₹{payTotal.toLocaleString('en-IN')} / month
            </div>
            <div className="text-[12px] text-secondary font-medium">
              Bank transfer · {bankName} ****{last4Acc}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-border-default">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-2 bg-white border border-border-default rounded-xl text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
        >
          Back
        </button>

        <span className="text-caption text-secondary font-medium hidden sm:inline-block">
          <span className="text-[#047857]">✓</span> Saved automatically · 10:42 am
        </span>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-brand-accent text-primary text-caption font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Creating employee...</span>
            </>
          ) : (
            <span>Create employee</span>
          )}
        </button>
      </div>
    </div>
  )
}
