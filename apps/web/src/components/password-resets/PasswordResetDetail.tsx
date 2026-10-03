import { useState } from 'react'
import type { RequestItem } from './PasswordResetList'

export interface PasswordResetDetailProps {
  request: RequestItem
  onGenerateTempPassword?: (req: RequestItem) => void
  onReject?: (req: RequestItem) => void
}

export default function PasswordResetDetail({
  request,
  onGenerateTempPassword,
  onReject,
}: PasswordResetDetailProps) {
  const [isIdentityConfirmed, setIsIdentityConfirmed] = useState(true)
  const [generatedPass, setGeneratedPass] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    const pass = `LL${Math.floor(100000 + Math.random() * 900000)}`
    setGeneratedPass(pass)
    if (onGenerateTempPassword) {
      onGenerateTempPassword(request)
    }
  }

  const handleCopy = () => {
    if (generatedPass) {
      navigator.clipboard.writeText(generatedPass)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-surface-card border border-border-default rounded-2xl p-6 space-y-6 shadow-xs text-left">
      {/* Detail Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-body-large flex items-center justify-center">
            {request.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-h3 text-primary font-bold">{request.name}</h2>
            <p className="text-body-small text-secondary">
              {request.empCode} · {request.role}
            </p>
          </div>
        </div>

        {/* External Link button */}
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
        <span className="px-3 py-1 rounded-full text-caption font-medium bg-bg-subtle text-secondary border border-border-default">
          Waiting {request.timeAgo}
        </span>
      </div>

      {/* Section 1: Review the Request */}
      <div className="space-y-2.5">
        <div className="text-caption font-semibold tracking-wider text-secondary uppercase">
          1 · Review the request
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-bg-subtle border border-border-default rounded-xl space-y-1">
            <div className="text-caption text-secondary">Reason</div>
            <div className="text-body-small font-semibold text-primary truncate">
              {request.reason}
            </div>
          </div>
          <div className="p-3 bg-bg-subtle border border-border-default rounded-xl space-y-1">
            <div className="text-caption text-secondary">Requested</div>
            <div className="text-body-small font-semibold text-primary truncate">
              {request.requestedAt}
            </div>
          </div>
          <div className="p-3 bg-bg-subtle border border-border-default rounded-xl space-y-1">
            <div className="text-caption text-secondary">Last sign-in</div>
            <div className="text-body-small font-semibold text-primary truncate">
              {request.lastSignIn}
            </div>
          </div>
          <div className="p-3 bg-bg-subtle border border-border-default rounded-xl space-y-1">
            <div className="text-caption text-secondary">Past resets</div>
            <div className="text-body-small font-semibold text-primary truncate">
              {request.pastResets}
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
                I've confirmed this is {request.name.split(' ')[0]}
              </div>
              <div className="text-caption text-secondary">
                Called her registered mobile or checked in person.
              </div>
            </div>
          </div>

          <a
            href={`tel:${request.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-card border border-border-default rounded-lg text-caption font-medium text-primary hover:bg-bg-subtle transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </a>
        </div>
      </div>

      {/* Generated Password Box if triggered */}
      {generatedPass && (
        <div className="p-4 bg-[#ECFDF3] border border-[#ABE5C6] rounded-xl space-y-2">
          <div className="text-caption font-semibold text-[#027A48]">
            Temporary Password Generated
          </div>
          <div className="flex items-center justify-between">
            <code className="text-h3 font-mono font-bold text-primary tracking-widest">
              {generatedPass}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-white border border-[#ABE5C6] text-caption font-semibold text-[#027A48] rounded-lg hover:bg-[#F6FEF9] transition-colors cursor-pointer"
            >
              {copied ? 'Copied! ✓' : 'Copy'}
            </button>
          </div>
          <p className="text-caption text-secondary">
            Share this password with {request.name} in person or by phone.
          </p>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          disabled={!isIdentityConfirmed}
          onClick={handleGenerate}
          className={`flex-1 py-2.5 px-4 rounded-xl text-label font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
            isIdentityConfirmed
              ? 'bg-brand-accent text-primary hover:opacity-90'
              : 'bg-disabled text-white cursor-not-allowed opacity-60'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span>Generate temporary password</span>
        </button>

        <button
          type="button"
          onClick={() => onReject && onReject(request)}
          className="px-5 py-2.5 rounded-xl text-label font-medium bg-[#FEF3F2] text-[#B42318] hover:bg-[#FEE4E2] transition-colors cursor-pointer"
        >
          Reject
        </button>
      </div>
    </div>
  )
}
