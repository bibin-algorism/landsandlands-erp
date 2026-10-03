import React, { useState } from 'react'
import Alert from '../Alert'
import { useLogin } from '../../hooks/useAuth'

export interface LoginFormProps {
  onDeactivatedTest?: () => void
}

export default function LoginForm({ onDeactivatedTest }: LoginFormProps) {
  const [empCode, setEmpCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)

  const { login, isPending, error } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!empCode || !password) return

    const identifier = empCode.startsWith('L&L_') ? empCode : `L&L_${empCode}`
    login({ identifier, password })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState) {
      setIsCapsLockOn(e.getModifierState('CapsLock'))
    }
  }

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="text-left space-y-1">
        <h2 className="text-h2 text-primary">Sign in</h2>
        <p className="text-body-small text-secondary">
          Use your employee code and password.
        </p>
      </div>

      {/* Error Message Banner */}
      {error && (
        <Alert
          variant="error"
          title="Authentication Failed"
          message={
            <>
              {error}. Check credentials or{' '}
              <a href="/forgot-password" className="underline hover:opacity-80">
                request password reset
              </a>
              .
            </>
          }
        />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee Code */}
        <div className="space-y-1.5">
          <label htmlFor="empCode" className="block text-label text-secondary">
            Employee code
          </label>
          <div className="flex items-center border border-border-default rounded-lg overflow-hidden bg-bg-default focus-within:border-border-strong transition-colors">
            <span className="m-1.5 px-3 py-2 bg-bg-canvas text-secondary text-caption font-medium select-none rounded-sm">
              L&L_
            </span>
            <input
              id="empCode"
              type="text"
              required
              value={empCode}
              onChange={(e) => setEmpCode(e.target.value)}
              placeholder="5-digit number"
              className="w-full px-3 py-2 text-secondary text-body-small placeholder:text-disabled outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-label text-secondary">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter password"
              className={`w-full px-3 py-2 pr-16 border rounded-lg bg-bg-default text-primary text-body-small placeholder:text-disabled outline-none transition-colors ${
                error
                  ? 'border-brand-accent focus:border-brand-accent'
                  : 'border-border-default focus:border-border-strong'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-caption text-secondary hover:text-primary font-medium cursor-pointer"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-caption text-secondary">
              {isCapsLockOn && 'Caps Lock is on'}
            </span>
            <a
              href="/forgot-password"
              className="text-caption text-primary underline font-medium hover:opacity-80"
            >
              Forgot password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 mt-2 bg-brand-accent text-primary text-label font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && (
            <svg className="animate-spin h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>

        {onDeactivatedTest && (
          <div className="text-center pt-2 space-x-2">
            <button
              type="button"
              onClick={onDeactivatedTest}
              className="text-caption text-secondary hover:underline cursor-pointer"
            >
              [Demo: Deactivated State]
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
