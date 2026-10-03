export interface DeactivatedAccountProps {
  empCode?: string
  onBackToSignIn?: () => void
  onContactHR?: () => void
}

export default function DeactivatedAccount({
  empCode = 'L&L_48213',
  onBackToSignIn,
  onContactHR,
}: DeactivatedAccountProps) {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="text-left space-y-1">
        <h2 className="text-h3 text-primary">This account is no longer active</h2>
        <p className="text-body-small text-secondary">
          If you still work at Lands & Lands and need access, HR can reactivate your account.
        </p>
      </div>

      {/* Account Info Box */}
      <div className="border border-border-default rounded-xl bg-bg-subtle p-4 space-y-3">
        <div className="flex justify-between items-center text-body-small">
          <span className="text-secondary">Employee code</span>
          <span className="font-semibold text-primary">{empCode}</span>
        </div>
        <div className="flex justify-between items-center text-body-small">
          <span className="text-secondary">Status</span>
          <span className="font-semibold text-primary">Deactivated</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={onContactHR}
          className="w-full py-2.5 px-4 bg-brand-accent text-primary text-label font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
        >
          Contact HR
        </button>
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
