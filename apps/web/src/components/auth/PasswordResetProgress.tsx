import Alert from '../Alert'

export interface PasswordResetProgressProps {
  empCode?: string
  initials?: string
  requestDate?: string
  extPhone?: string
  onBackToSignIn?: () => void
  onUseDifferentCode?: () => void
}

export default function PasswordResetProgress({
  empCode = 'LL_48213',
  initials = 'PR',
  requestDate = '23 Sep 2026, 10:42 am · Forgot password',
  extPhone = '[TBC]',
  onBackToSignIn,
  onUseDifferentCode,
}: PasswordResetProgressProps) {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="text-left space-y-1">
        <h2 className="text-h3 text-primary">Password reset in progress</h2>
      </div>

      {/* Profile Header Box */}
      <div className="border border-border-default rounded-xl bg-bg-subtle p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary text-white font-medium flex items-center justify-center text-caption shrink-0 select-none">
            {initials}
          </div>
          <div className="text-left">
            <div className="text-body-small font-semibold text-primary">{empCode}</div>
            <button
              type="button"
              onClick={onUseDifferentCode}
              className="text-caption text-secondary hover:underline cursor-pointer block text-left"
            >
              Not you? Use a different code
            </button>
          </div>
        </div>
        <span className="bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF] text-caption font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
          Awaiting HR
        </span>
      </div>

      {/* Progress Timeline Steps */}
      <div className="space-y-4 px-1">
        {/* Step 1 */}
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none">
            ✓
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-body-small font-semibold text-primary">Request sent</p>
            <p className="text-caption text-secondary">{requestDate}</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-brand-accent text-primary flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 select-none">
            2
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-body-small font-semibold text-primary">With HR</p>
            <p className="text-caption text-secondary">HR will set a temporary password for you</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border border-border-strong text-secondary flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 select-none">
            3
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-body-small font-medium text-secondary">
              Sign in with the temporary password
            </p>
            <p className="text-caption text-secondary">You'll then set your own password</p>
          </div>
        </div>
      </div>

      {/* Info Alert Box */}
      <Alert
        variant="info"
        title=""
        message={`Your account is paused until HR acts. For urgent access, call HR on ext. ${extPhone}.`}
      />

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
