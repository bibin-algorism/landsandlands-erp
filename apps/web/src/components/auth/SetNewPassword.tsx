import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Alert from '../Alert'
import { useChangePassword } from '../../hooks/useAuth'

export interface SetNewPasswordProps {
  tempToken?: string
  onSubmitNewPassword?: (data: { tempPass: string; newPass: string }) => void
  onRequestReset?: () => void
}

export default function SetNewPassword({
  tempToken: propTempToken,
  onSubmitNewPassword,
  onRequestReset,
}: SetNewPasswordProps) {
  const location = useLocation()
  const tempToken = propTempToken || (location.state as { tempToken?: string })?.tempToken

  const [tempPassword, setTempPassword] = useState('')
  const [showTemp, setShowTemp] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [showNew, setShowNew] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const [localError, setLocalError] = useState<string | null>(null)

  const { changePassword, isPending, error: apiError } = useChangePassword()

  // Validation rules
  const hasMinLength = newPassword.length >= 8
  const hasNumberAndLetter = /[A-Za-z]/.test(newPassword) && /\d/.test(newPassword)
  const isDifferentFromTemp = newPassword !== '' && newPassword !== tempPassword

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!tempPassword) {
      setLocalError('Please enter your temporary password.')
      return
    }

    if (newPassword !== confirmPassword) {
      setLocalError('New password and confirm password do not match.')
      return
    }

    if (!hasMinLength || !hasNumberAndLetter || !isDifferentFromTemp) {
      setLocalError('Please ensure your new password satisfies all validation rules below.')
      return
    }

    if (onSubmitNewPassword) {
      onSubmitNewPassword({ tempPass: tempPassword, newPass: newPassword })
    } else {
      changePassword({
        currentPassword: tempPassword,
        newPassword: newPassword,
        tempToken,
      })
    }
  }

  const activeError = localError || apiError

  return (
    <div className="space-y-6 text-left">
      {/* Title Header */}
      <div className="space-y-1">
        <h2 className="text-h3 text-primary">Set your own password</h2>
        <p className="text-body-small text-secondary">
          You signed in with a temporary password from HR. Choose a new one to continue.
        </p>
      </div>

      {/* Error Message Banner */}
      {activeError && (
        <Alert
          variant="error"
          title="Password Update Failed"
          message={activeError}
        />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Temporary Password */}
        <div className="space-y-1.5">
          <label htmlFor="tempPass" className="block text-label text-secondary">
            Temporary password
          </label>
          <div className="relative flex items-center">
            <input
              id="tempPass"
              type={showTemp ? 'text' : 'password'}
              required
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full px-3 py-2 pr-16 border border-border-default focus:border-border-strong rounded-lg bg-bg-default text-primary text-body-small outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowTemp(!showTemp)}
              className="absolute right-3 text-caption text-secondary hover:text-primary font-medium cursor-pointer"
            >
              {showTemp ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label htmlFor="newPass" className="block text-label text-secondary">
            New password
          </label>
          <div className="relative flex items-center">
            <input
              id="newPass"
              type={showNew ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-3 py-2 pr-16 border border-border-default focus:border-border-strong rounded-lg bg-bg-default text-primary text-body-small outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 text-caption text-secondary hover:text-primary font-medium cursor-pointer"
            >
              {showNew ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Password Rules Box */}
        <div className="border border-border-default rounded-xl bg-bg-subtle p-4 space-y-2.5">
          <p className="text-caption text-secondary font-medium">Your new password must:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-caption text-secondary">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  hasMinLength
                    ? 'border-primary bg-primary text-white text-[10px]'
                    : 'border-border-strong bg-transparent'
                }`}
              >
                {hasMinLength && '✓'}
              </span>
              <span>Be at least 8 characters</span>
            </div>
            <div className="flex items-center gap-2.5 text-caption text-secondary">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  hasNumberAndLetter
                    ? 'border-primary bg-primary text-white text-[10px]'
                    : 'border-border-strong bg-transparent'
                }`}
              >
                {hasNumberAndLetter && '✓'}
              </span>
              <span>Include a number and a letter</span>
            </div>
            <div className="flex items-center gap-2.5 text-caption text-secondary">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isDifferentFromTemp
                    ? 'border-primary bg-primary text-white text-[10px]'
                    : 'border-border-strong bg-transparent'
                }`}
              >
                {isDifferentFromTemp && '✓'}
              </span>
              <span>Not match temporary or previously used password</span>
            </div>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPass" className="block text-label text-secondary">
            Confirm new password
          </label>
          <div className="relative flex items-center">
            <input
              id="confirmPass"
              type={showConfirm ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Type it again"
              className="w-full px-3 py-2 pr-16 border border-border-default focus:border-border-strong rounded-lg bg-bg-default text-primary text-body-small outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 text-caption text-secondary hover:text-primary font-medium cursor-pointer"
            >
              {showConfirm ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 mt-2 bg-brand-accent text-primary text-label font-medium rounded-lg hover:opacity-90 transition-opacity cursor-opacity-90 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && (
            <svg className="animate-spin h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isPending ? 'Updating password...' : 'Set password and continue'}
        </button>

        {/* Bottom Request Reset link */}
        <div className="text-center pt-1">
          {onRequestReset ? (
            <button
              type="button"
              onClick={onRequestReset}
              className="text-caption text-secondary hover:underline cursor-pointer bg-transparent border-0"
            >
              Didn't get a temporary password? <span className="underline text-primary">Request a reset</span>
            </button>
          ) : (
            <a
              href="/forgot-password"
              className="text-caption text-secondary hover:underline"
            >
              Didn't get a temporary password? <span className="underline text-primary">Request a reset</span>
            </a>
          )}
        </div>
      </form>
    </div>
  )
}
