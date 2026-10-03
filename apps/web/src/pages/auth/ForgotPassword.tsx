import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../../components/auth/AuthCard'
import RequestPasswordReset from '../../components/auth/RequestPasswordReset'
import PasswordResetSubmitted from '../../components/auth/PasswordResetSubmitted'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resetData, setResetData] = useState({
    empCode: '48213',
    reason: 'I forgot my password',
  })

  return (
    <AuthCard
      topAction={
        !isSubmitted ? (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-caption text-secondary hover:text-primary font-medium flex items-center gap-1.5 cursor-pointer border-0 bg-transparent p-0"
          >
            <span>←</span> Back to sign in
          </button>
        ) : null
      }
    >
      {!isSubmitted ? (
        <RequestPasswordReset
          initialEmpCode={resetData.empCode}
          onSubmitRequest={(data) => {
            setResetData({ empCode: data.empCode, reason: data.reason })
            setIsSubmitted(true)
          }}
        />
      ) : (
        <PasswordResetSubmitted
          empCode={`L&L_${resetData.empCode}`}
          reason={resetData.reason}
          onBackToSignIn={() => navigate('/login')}
        />
      )}
    </AuthCard>
  )
}
