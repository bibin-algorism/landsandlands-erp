import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../../components/auth/AuthCard'
import RequestPasswordReset from '../../components/auth/RequestPasswordReset'
import PasswordResetSubmitted from '../../components/auth/PasswordResetSubmitted'
import { useRequestReset } from '../../hooks/useAuth'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { requestResetAsync, isPending, error } = useRequestReset()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resetData, setResetData] = useState({
    empCode: '',
    reason: 'I forgot my password',
  })

  const handleSubmitRequest = async (data: { empCode: string; reason: string; notes: string }) => {
    const rawEmpCode = data.empCode.trim()
    const formattedIdentifier = rawEmpCode.startsWith('L&L_')
      ? rawEmpCode
      : `L&L_${rawEmpCode}`

    let fullReason = data.reason
    if (data.notes && data.notes.trim()) {
      fullReason = `${data.reason} - Note: ${data.notes.trim()}`
    }

    if (fullReason.length < 10) {
      fullReason = `${fullReason} (Password reset request)`
    }

    try {
      await requestResetAsync({
        identifier: formattedIdentifier,
        reason: fullReason,
      })
      setResetData({ empCode: rawEmpCode, reason: fullReason })
      setIsSubmitted(true)
    } catch {
      // Error handled by mutation state
    }
  }

  return (
    <AuthCard
      topAction={
        !isSubmitted ? (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-caption text-secondary hover:text-primary font-medium flex items-center gap-1.5 cursor-pointer border-0 bg-transparent p-0 mb-8"
          >
            <span>←</span> Back to sign in
          </button>
        ) : null
      }
    >
      {!isSubmitted ? (
        <RequestPasswordReset
          initialEmpCode={resetData.empCode}
          isPending={isPending}
          error={error}
          onSubmitRequest={handleSubmitRequest}
        />
      ) : (
        <PasswordResetSubmitted
          empCode={resetData.empCode.startsWith('L&L_') ? resetData.empCode : `L&L_${resetData.empCode}`}
          reason={resetData.reason}
          onBackToSignIn={() => navigate('/login')}
        />
      )}
    </AuthCard>
  )
}
