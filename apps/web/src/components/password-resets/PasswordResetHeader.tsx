export interface PasswordResetHeaderProps {
  pendingCount?: number
  doneTodayCount?: string
  attentionText?: string
}

export default function PasswordResetHeader({
  pendingCount = 5,
  doneTodayCount = '2/7',
  attentionText = '3 need attention now — 2 waiting over a day.',
}: PasswordResetHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
      {/* Title & Subtitle */}
      <div className="text-left space-y-1">
        <h1 className="text-h2 text-primary font-bold">Password reset requests</h1>
        <p className="text-body-small text-secondary">{attentionText}</p>
      </div>

      {/* Counter Cards */}
      <div className="flex items-center gap-6 self-start sm:self-auto">
        {/* Pending */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-bg-subtle border border-border-default flex items-center justify-center text-secondary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-left leading-none">
            <div className="text-h3 font-bold text-primary">{pendingCount}</div>
            <div className="text-caption text-secondary">Pending</div>
          </div>
        </div>

        {/* Done Today */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-bg-subtle border border-border-default flex items-center justify-center text-secondary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left leading-none">
            <div className="text-h3 font-bold text-primary">{doneTodayCount}</div>
            <div className="text-caption text-secondary">Done today</div>
          </div>
        </div>
      </div>
    </div>
  )
}
