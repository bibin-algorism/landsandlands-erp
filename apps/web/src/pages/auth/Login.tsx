import { useState } from 'react'
import AuthCard from '../../components/auth/AuthCard'
import LoginForm from '../../components/auth/LoginForm'
import DeactivatedAccount from '../../components/auth/DeactivatedAccount'
import PasswordResetProgress from '../../components/auth/PasswordResetProgress'

export default function Login() {
  const [view, setView] = useState<'login' | 'deactivated' | 'password-reset-pending'>('login')

  return (
    <AuthCard>
      {view === 'login' && (
        <LoginForm onDeactivatedTest={() => setView('deactivated')} />
      )}
      {view === 'deactivated' && (
        <DeactivatedAccount onBackToSignIn={() => setView('login')} />
      )}
      {view === 'password-reset-pending' && (
        <PasswordResetProgress
          onBackToSignIn={() => setView('login')}
          onUseDifferentCode={() => setView('login')}
        />
      )}
    </AuthCard>
  )
}
