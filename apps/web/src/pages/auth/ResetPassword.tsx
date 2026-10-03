import { useNavigate } from 'react-router-dom'
import AuthCard from '../../components/auth/AuthCard'
import SetNewPassword from '../../components/auth/SetNewPassword'

export default function ResetPassword() {
  const navigate = useNavigate()

  return (
    <AuthCard>
      <SetNewPassword
        onRequestReset={() => {
          navigate('/forgot-password')
        }}
      />
    </AuthCard>
  )
}
