import { useState, useEffect } from 'react'
import type { PasswordResetRequestData, UserSummary } from '../../api/types'

export interface PasswordResetDetailProps {
  request: PasswordResetRequestData | null
  completedTempPassword?: string | null
  onGenerateTempPassword?: (request: PasswordResetRequestData) => Promise<string | undefined>
  onReject?: (request: PasswordResetRequestData, reason?: string) => Promise<void>
  onDone?: () => void
  isProcessing?: boolean
}

export default function PasswordResetDetail({
  request,
  completedTempPassword,
  onGenerateTempPassword,
  onReject,
  onDone,
  isProcessing,
}: PasswordResetDetailProps) {
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState(false)
  const [generatedPass, setGeneratedPass] = useState<string | null>(completedTempPassword || null)
  const [copied, setCopied] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  // Remember active request during password generation
  const [lastRequest, setLastRequest] = useState<PasswordResetRequestData | null>(request)

  useEffect(() => {
    if (request) {
      setLastRequest(request)
    } else if (!completedTempPassword && !generatedPass) {
      setLastRequest(null)
    }
  }, [request, completedTempPassword, generatedPass])

  useEffect(() => {
    if (completedTempPassword) {
      setGeneratedPass(completedTempPassword)
    }
  }, [completedTempPassword])

  // Read current admin user profile
  const currentUser: UserSummary | null = (() => {
    try {
      const raw = localStorage.getItem('user_info')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })()

  // Reset local state when selecting a new request
  useEffect(() => {
    if (!completedTempPassword && !generatedPass) {
      setIsIdentityConfirmed(false)
      setCopied(false)
      setIsRejectModalOpen(false)
      setRejectReason('')
    }
  }, [request?.id, completedTempPassword, generatedPass])

  const activeReq = request || lastRequest
  const passToDisplay = generatedPass || completedTempPassword

  // --- POST-GENERATION COMPLETED VIEW ---
  if (passToDisplay && activeReq) {
    const fullName = `${activeReq.user?.profile?.firstName || ''} ${activeReq.user?.profile?.lastName || ''}`.trim() || activeReq.identifier
    const firstName = activeReq.user?.profile?.firstName || fullName.split(' ')[0] || 'Employee'
    const designation = activeReq.user?.employee?.designation || 'Sales executive'
    const adminName = currentUser?.identifier ? `${currentUser.identifier}` : 'Deepa N · L&L_65021'
    const formattedPass = passToDisplay.length >= 8
      ? `${passToDisplay.slice(0, 4)} – ${passToDisplay.slice(4, 8)}${passToDisplay.length > 8 ? ` – ${passToDisplay.slice(8)}` : ''}`
      : passToDisplay

    const handleCopy = () => {
      navigator.clipboard.writeText(passToDisplay)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="bg-surface-card border border-border-default rounded-2xl p-6 space-y-6 shadow-xs text-left animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-body-large flex items-center justify-center">
              {fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h2 className="text-h3 text-primary font-bold">{fullName}</h2>
              <p className="text-body-small text-secondary">
                {activeReq.identifier} · {designation}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-full border border-border-default flex items-center justify-center text-secondary hover:text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
            title="View profile"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-caption font-semibold bg-[#ECFDF5] text-[#047857]">
            Reset done
          </span>
          <span className="px-3 py-1 rounded-full text-caption font-semibold bg-[#ECFDF5] text-[#047857]">
            Account active
          </span>
        </div>

        {/* Top Banner Alert */}
        <div className="p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#047857] text-white flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-0.5">
            <h4 className="text-body-small font-bold text-[#065F46]">Temporary password created</h4>
            <p className="text-caption text-[#047857]">
              {firstName} must set password the next time sign in occurs.
            </p>
          </div>
        </div>

        {/* Temporary Password Box */}
        <div className="space-y-2">
          <div className="text-caption font-semibold tracking-wider text-secondary uppercase">
            TEMPORARY PASSWORD
          </div>
          <div className="p-4 bg-bg-default border border-border-default rounded-2xl flex items-center justify-between gap-4">
            <code className="text-h2 font-mono font-normal text-primary tracking-wide">
              {formattedPass}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#18181B] text-white rounded-xl text-body-small font-semibold hover:bg-[#27272A] transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 002-2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{copied ? 'Copied! ✓' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-caption text-secondary">
            Share it with {firstName} in person or by phone. It won't be shown again after you close this.
          </p>
        </div>

        {/* Metadata Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-bg-subtle border border-border-default rounded-xl space-y-1">
            <div className="text-caption text-secondary">Valid until</div>
            <div className="text-body-small font-semibold text-primary truncate">
              Next sign-in
            </div>
          </div>
          <div className="p-3.5 bg-bg-subtle border border-border-default rounded-xl space-y-1">
            <div className="text-caption text-secondary">Reset by</div>
            <div className="text-body-small font-semibold text-primary truncate">
              {adminName}
            </div>
          </div>
          <div className="p-3.5 bg-bg-subtle border border-border-default rounded-xl space-y-1">
            <div className="text-caption text-secondary">Recorded in</div>
            <div className="text-body-small font-semibold text-primary truncate">
              Audit Trail
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setGeneratedPass(null)
              setLastRequest(null)
              if (onDone) onDone()
            }}
            className="px-6 py-2.5 bg-brand-accent text-primary text-label font-medium rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  // --- EMPTY STATE WHEN NO REQUEST SELECTED / NO PENDING REQUESTS ---
  if (!activeReq) {
    return (
      <div className="bg-surface-card border border-border-default rounded-2xl p-12 text-center space-y-5 shadow-xs flex flex-col items-center justify-center min-h-[480px]">
        {/* Yellow Circle Check Icon */}
        <div className="w-14 h-14 rounded-full bg-[#FACC15] text-[#1E293B] flex items-center justify-center shadow-xs">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="text-h2 font-serif text-primary font-bold">All caught up</h2>
          <p className="text-body-small text-secondary max-w-xs mx-auto">
            Every password reset request has been handled. Nice work.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="mt-1 px-5 py-2.5 bg-white border border-border-default rounded-full text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
        >
          View completed requests
        </button>
      </div>
    )
  }

  const fullName = `${activeReq.user?.profile?.firstName || ''} ${activeReq.user?.profile?.lastName || ''}`.trim() || activeReq.identifier
  const firstName = activeReq.user?.profile?.firstName || fullName.split(' ')[0] || 'Employee'
  const designation = activeReq.user?.employee?.designation || 'Sales executive'
  const department = activeReq.user?.employee?.department || 'ERP User'
  const phone = activeReq.user?.profile?.phone || 'N/A'
  const requestedDate = activeReq.requestedAt
    ? new Date(activeReq.requestedAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    : 'Unknown'

  const handleGenerate = async () => {
    if (onGenerateTempPassword) {
      const pass = await onGenerateTempPassword(activeReq)
      if (pass) {
        setGeneratedPass(pass)
      }
    }
  }

  // --- STANDARD REVIEW VIEW ---
  return (
    <>
      <div className="bg-surface-card border border-border-default rounded-2xl p-6 space-y-6 shadow-xs text-left">
        {/* Detail Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-body-large flex items-center justify-center">
              {fullName.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h2 className="text-h3 text-primary font-bold">{fullName}</h2>
              <p className="text-body-small text-secondary">
                {activeReq.identifier} · {designation} ({department})
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-full border border-border-default flex items-center justify-center text-secondary hover:text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
            title="View profile"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Status Tags Row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-caption font-semibold bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]">
            Awaiting HR
          </span>
          <span className="px-3 py-1 rounded-full text-caption font-semibold bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]">
            Account on hold
          </span>
        </div>

        {/* Section 1: Review the Request */}
        <div className="space-y-2.5">
          <div className="text-caption font-semibold tracking-wider text-secondary uppercase">
            1 · Review the request
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-bg-subtle border border-border-default rounded-xl space-y-1">
              <div className="text-caption text-secondary">Reason</div>
              <div className="text-body-small font-semibold text-primary truncate">
                {activeReq.reason}
              </div>
            </div>
            <div className="p-3 bg-bg-subtle border border-border-default rounded-xl space-y-1">
              <div className="text-caption text-secondary">Requested at</div>
              <div className="text-body-small font-semibold text-primary truncate">
                {requestedDate}
              </div>
            </div>
            <div className="p-3 bg-bg-subtle border border-border-default rounded-xl space-y-1">
              <div className="text-caption text-secondary">Phone</div>
              <div className="text-body-small font-semibold text-primary truncate">
                {phone}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Verify Identity */}
        <div className="space-y-2.5">
          <div className="text-caption font-semibold tracking-wider text-secondary uppercase">
            2 · Verify identity
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
              isIdentityConfirmed
                ? 'bg-[#FFFAEB] border-[#FEDF89]'
                : 'bg-bg-subtle border-border-default'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setIsIdentityConfirmed(!isIdentityConfirmed)}
                className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 cursor-pointer shrink-0 transition-colors ${
                  isIdentityConfirmed ? 'bg-primary' : 'border border-border-strong bg-transparent'
                }`}
              >
                {isIdentityConfirmed && '✓'}
              </button>
              <div className="space-y-0.5">
                <div className="text-body-small font-semibold text-primary">
                  I've confirmed identity of {fullName}
                </div>
                <div className="text-caption text-secondary">
                  Verified via registered phone number or in-person verification.
                </div>
              </div>
            </div>

            {phone !== 'N/A' && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-card border border-border-default rounded-lg text-caption font-medium text-primary hover:bg-bg-subtle transition-colors shrink-0"
              >
                <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </a>
            )}
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            disabled={!isIdentityConfirmed || isProcessing}
            onClick={handleGenerate}
            className={`flex-1 py-2.5 px-4 rounded-xl text-label font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
              isIdentityConfirmed && !isProcessing
                ? 'bg-brand-accent text-primary hover:opacity-90'
                : 'bg-disabled text-white cursor-not-allowed opacity-60'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span>{isProcessing ? 'Processing...' : 'Generate temporary password'}</span>
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={() => setIsRejectModalOpen(true)}
            className="px-5 py-2.5 rounded-xl text-label font-medium bg-[#FEF3F2] text-[#B42318] hover:bg-[#FEE4E2] transition-colors cursor-pointer disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>

      {/* REJECT CONFIRMATION MODAL */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-surface-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-left border border-border-default animate-in zoom-in-95 duration-150">
            {/* Modal Title & Subtitle */}
            <div className="space-y-2">
              <h3 className="text-h2 font-serif text-primary font-bold">
                Reject {firstName}'s request?
              </h3>
              <p className="text-body-small text-secondary">
                His account stays on hold until he sends a new request. He'll see your reason on the sign-in page.
              </p>
            </div>

            {/* Input Field */}
            <div className="space-y-1.5">
              <label className="block text-caption font-semibold text-secondary">
                Reason for rejecting <span className="text-error">*</span>
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejecting request"
                className="w-full p-3 bg-bg-default border border-border-default rounded-2xl text-body-small text-primary outline-none focus:border-border-strong transition-colors resize-none"
              />
              <p className="text-caption text-secondary">
                Shown to the employee. Keep it factual.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-border-default text-body-small font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer"
              >
                Keep request
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={async () => {
                  if (onReject) {
                    await onReject(activeReq, rejectReason)
                  }
                  setIsRejectModalOpen(false)
                }}
                className="px-5 py-2.5 rounded-full bg-[#DC2626] text-white text-body-small font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Rejecting...' : 'Reject request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
