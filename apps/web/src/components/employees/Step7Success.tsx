import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CreateEmployeePayload, CreateEmployeeResponse } from '../../api/types'

export interface Step7SuccessProps {
  createdData: CreateEmployeeResponse | null
  formData: CreateEmployeePayload
  employeeName: string
  onResetWizard: () => void
  onSignInSetUpChange?: (isSetUp: boolean) => void
}

export default function Step7Success({
  createdData,
  formData,
  employeeName,
  onResetWizard,
  onSignInSetUpChange,
}: Step7SuccessProps) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const employeeId = createdData?.employeeId || 'LL-7K2Q9'
  const username = formData.officialEmail || formData.personalEmail || employeeId || 'priya.r@landsandlands.com'
  const tempPassword = createdData?.temporaryPassword || createdData?.initialPassword || 'LL#Priya2026!'

  const firstName = formData.firstName || 'Priya'
  const roleLabel =
    formData.role === 'EXECUTIVE'
      ? 'Sales executive'
      : formData.role === 'VERTICAL_HEAD'
      ? 'Vertical Head'
      : formData.role || 'Sales executive'
  const vertical = formData.vertical || 'Sales'
  const managerName =
    formData.reportingAuthorityId === 'LL-7K2Q9'
      ? 'Karthik Raja'
      : formData.reportingAuthorityId === 'LL-9P4W1'
      ? 'Meena S'
      : 'Arun Kumar'

  // Document missing count & due date
  const docFiles = formData.documentFiles || {}
  const qual = formData.highestQualification || 'UG_DEGREE'
  const bg = formData.employeeBackground || 'FRESHER'
  const docKeys = ['aadhaarFront', 'panFront', 'drivingLicence', '10thMarkSheet']
  if (qual === 'TWELFTH' || qual === 'UG_DEGREE' || qual === 'PG_DEGREE') docKeys.push('12thMarkSheet')
  if (qual === 'UG_DEGREE' || qual === 'PG_DEGREE') docKeys.push('degreeCertificate')
  if (qual === 'PG_DEGREE') docKeys.push('mastersCertificate')
  if (bg === 'EXPERIENCED') docKeys.push('relievingExperience', 'salarySlip')
  else if (bg === 'FREELANCER' || bg === 'ENTREPRENEUR') docKeys.push('recordOfIncome')

  const missingDocsCount = docKeys.filter(
    (k) => docFiles[k]?.status !== 'uploaded' && docFiles[k]?.status !== 'verified'
  ).length

  const dueDateFormatted = (() => {
    const start = formData.joiningDate ? new Date(formData.joiningDate) : new Date()
    const target = new Date(start)
    target.setDate(target.getDate() + 30)
    return `${target.getDate()} ${target.toLocaleString('en-US', { month: 'short' })} ${target.getFullYear()}`
  })()

  const handleCopyBoth = () => {
    const credentialsText = `Username: ${username}\nPassword: ${tempPassword}`
    navigator.clipboard.writeText(credentialsText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2500)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    if (onSignInSetUpChange) {
      onSignInSetUpChange(true)
    }
  }

  return (
    <div className="bg-white border border-border-default rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xs flex flex-col items-center justify-center min-h-[420px]">
      {/* Big Yellow Check Icon */}
      <div className="w-16 h-16 rounded-full bg-[#FACC15] text-[#18181B] font-bold text-h2 flex items-center justify-center shadow-xs">
        ✓
      </div>

      {/* Main Header & Subtitle */}
      <div className="space-y-1 text-center">
        <h2 className="text-h2 font-serif font-bold text-primary">
          {employeeName} is added
        </h2>
        <p className="text-caption text-secondary font-medium">
          {roleLabel} · {vertical} · Reports to {managerName}
        </p>
      </div>

      {/* White Pill Box for Employee ID */}
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl px-6 py-3 inline-flex items-center gap-3 shadow-xs">
        <span className="text-caption font-medium text-secondary">Employee ID</span>
        <span className="text-h2 font-serif font-bold text-primary tracking-wider">
          {employeeId}
        </span>
        <span className="text-caption font-semibold text-secondary flex items-center gap-1 bg-white border border-border-default px-2 py-0.5 rounded-md text-[11px]">
          🔒 Permanent
        </span>
      </div>

      {/* Status Callout Banner */}
      {missingDocsCount > 0 ? (
        <div className="text-caption font-medium text-[#B42318] flex items-center gap-1.5 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-4 py-2">
          <span>🕒</span>
          <span>
            Marked Incomplete — {missingDocsCount} document{missingDocsCount > 1 ? 's' : ''} due by {dueDateFormatted}
          </span>
        </div>
      ) : (
        <div className="text-caption font-medium text-[#047857] flex items-center gap-1.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl px-4 py-2">
          <span>✓</span>
          <span>Marked Active — All required documents uploaded</span>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          type="button"
          onClick={onResetWizard}
          className="px-5 py-2.5 text-caption font-semibold text-primary hover:bg-bg-subtle rounded-xl transition-colors cursor-pointer"
        >
          Add another employee
        </button>

        <button
          type="button"
          onClick={() => navigate('/employees')}
          className="px-5 py-2.5 bg-white border border-border-default rounded-xl text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
        >
          View profile
        </button>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-[#FACC15] text-[#18181B] text-caption font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs flex items-center gap-2"
        >
          <span>🔑</span>
          <span>Set up sign-in</span>
        </button>
      </div>

      {/* Set Up Sign-in Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-border-default rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-left animate-in zoom-in-95 duration-200 relative">
            {/* Modal Title */}
            <div className="space-y-1">
              <h3 className="text-h3 font-serif font-bold text-primary">
                Set up employee sign-in
              </h3>
              <p className="text-caption text-secondary font-medium">
                Temporary login credentials for {employeeName}.
              </p>
            </div>

            {/* Credentials Fields Box */}
            <div className="space-y-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4">
              {/* Username Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                  Username
                </label>
                <div className="px-3.5 py-2 bg-white border border-border-default rounded-xl text-body-small font-mono font-semibold text-primary select-all">
                  {username}
                </div>
              </div>

              {/* Temporary Password Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                  Temporary Password
                </label>
                <div className="px-3.5 py-2 bg-white border border-border-default rounded-xl text-body-small font-mono font-semibold text-primary select-all">
                  {tempPassword}
                </div>
              </div>

              {/* Copy Credentials Button */}
              <button
                type="button"
                onClick={handleCopyBoth}
                className="w-full py-2.5 bg-[#18181B] text-white text-caption font-bold rounded-xl hover:bg-[#27272A] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{isCopied ? 'Copied credentials! ✓' : '📋 Copy username & password'}</span>
              </button>
            </div>

            {/* Display Once Warning Message */}
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-3 text-[12px] font-medium text-[#B42318] space-y-0.5">
              <div className="font-bold flex items-center gap-1">
                <span>⚠️</span> Important
              </div>
              <p className="leading-snug">
                This password will be displayed only one time. Please copy and share it with {firstName} securely before closing this window.
              </p>
            </div>

            {/* Close / Done Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 bg-brand-accent text-primary text-caption font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
