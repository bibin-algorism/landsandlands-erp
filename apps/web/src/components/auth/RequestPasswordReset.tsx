import React, { useState } from 'react'

export interface RequestPasswordResetProps {
  initialEmpCode?: string
  onSubmitRequest?: (data: { empCode: string; reason: string; notes: string }) => void
}

const REASON_OPTIONS = [
  'I forgot my password',
  "My password isn't working",
  'I think someone else knows it',
  'Other',
]

export default function RequestPasswordReset({
  initialEmpCode = '48213',
  onSubmitRequest,
}: RequestPasswordResetProps) {
  const [empCode, setEmpCode] = useState(initialEmpCode)
  const [selectedReason, setSelectedReason] = useState(REASON_OPTIONS[0])
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmitRequest) {
      onSubmitRequest({ empCode, reason: selectedReason, notes })
    }
  }

  return (
    <div className="space-y-6 text-left">
      {/* Title Header */}
      <div className="space-y-1">
        <h2 className="text-h3 text-primary">Request a password reset</h2>
        <p className="text-body-small text-secondary">
          HR will set a temporary password for you. Your account stays paused until then.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee Code */}
        <div className="space-y-1.5">
          <label htmlFor="resetEmpCode" className="block text-label text-secondary">
            Employee code
          </label>
          <div className="flex items-center border border-border-default rounded-lg overflow-hidden bg-bg-default focus-within:border-border-strong transition-colors">
            <span className="m-1.5 px-3 py-2 bg-bg-canvas text-secondary text-caption font-medium select-none rounded-sm">
              L&L_
            </span>
            <input
              id="resetEmpCode"
              type="text"
              required
              value={empCode}
              onChange={(e) => setEmpCode(e.target.value)}
              placeholder="5-digit number"
              className="w-full px-3 py-2 text-secondary text-body-small placeholder:text-disabled outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Reason radio list */}
        <div className="space-y-2">
          <label className="block text-label text-secondary">
            Reason <span className="text-error">*</span>
          </label>
          <div className="space-y-2">
            {REASON_OPTIONS.map((option) => {
              const isSelected = selectedReason === option
              return (
                <label
                  key={option}
                  onClick={() => setSelectedReason(option)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#FFFAEB] border-brand-accent'
                      : 'bg-bg-default border-border-default hover:border-border-strong'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-border-strong bg-transparent'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-body-small text-primary font-medium">
                    {option}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Anything HR should know? (optional) */}
        <div className="space-y-1.5">
          <label htmlFor="notes" className="block text-label text-secondary">
            Anything HR should know? (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. I'm at the Trichy site office today"
            className="w-full border border-border-default rounded-lg p-3 text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong bg-bg-default resize-none transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 mt-2 bg-brand-accent text-primary text-label font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
        >
          Send request to HR
        </button>
      </form>
    </div>
  )
}
