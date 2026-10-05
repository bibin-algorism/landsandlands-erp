import { iconCheckGreenCircle } from '../../utils/images'

export interface PasswordResetSubmittedProps {
  empCode?: string
  reason?: string
  requestedAt?: string
  status?: string
  onBackToSignIn?: () => void
}

export default function PasswordResetSubmitted({
  empCode = 'LL_48213',
  reason = 'I forgot my password',
  requestedAt = '30 Sep 2026, 10:42 am',
  status = 'Awaiting HR',
  onBackToSignIn,
}: PasswordResetSubmittedProps) {
  return (
    <div className="space-y-6 text-center">
      {/* Green Check Icon */}
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full bg-[#ECFDF3] border border-[#ABE5C6] flex items-center justify-center">
          <img src={iconCheckGreenCircle} alt="Success" className="w-6 h-6 select-none" />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-h3 text-primary">Request sent to HR</h2>
        <p className="text-body-small text-secondary">
          You'll be able to sign in once HR sets a temporary password.
        </p>
      </div>

      {/* Info Details Box */}
      <div className="border border-border-default rounded-xl bg-bg-subtle p-4 space-y-3 text-left">
        <div className="flex justify-between items-center text-body-small">
          <span className="text-secondary">Employee code</span>
          <span className="font-semibold text-primary">{empCode}</span>
        </div>
        <div className="flex justify-between items-center text-body-small">
          <span className="text-secondary">Reason</span>
          <span className="font-semibold text-primary">{reason}</span>
        </div>
        <div className="flex justify-between items-center text-body-small">
          <span className="text-secondary">Requested</span>
          <span className="font-semibold text-primary">{requestedAt}</span>
        </div>
        <div className="flex justify-between items-center text-body-small">
          <span className="text-secondary">Status</span>
          <span className="font-semibold text-primary">{status}</span>
        </div>
      </div>

      {/* What happens next steps */}
      <div className="space-y-3 text-left">
        <h3 className="text-caption font-semibold text-primary">What happens next</h3>
        <div className="space-y-2.5">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full border border-border-strong text-secondary text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5 select-none">
              1
            </span>
            <span className="text-body-small text-secondary">HR reviews your request.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full border border-border-strong text-secondary text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5 select-none">
              2
            </span>
            <span className="text-body-small text-secondary">
              HR gives you a temporary password in person or by phone.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full border border-border-strong text-secondary text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5 select-none">
              3
            </span>
            <span className="text-body-small text-secondary">
              Sign in with it, then set your own password.
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onBackToSignIn}
          className="w-full py-2.5 px-4 border border-border-default bg-surface-card text-primary text-label font-medium rounded-lg hover:bg-bg-subtle transition-colors cursor-pointer"
        >
          Back to sign in
        </button>
      </div>
    </div>
  )
}
