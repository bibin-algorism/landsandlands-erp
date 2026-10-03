import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  LoginCredentials,
  LoginResponse,
  RequestResetPayload,
  RequestResetResponse,
} from '../api/types'

export function useLogin() {
  const navigate = useNavigate()

  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.mustChangePassword) {
        // Pass temporary token securely via Router Location state (in-memory, no localStorage leak)
        navigate('/set-password', { state: { tempToken: data.tempToken } })
      } else {
        // Store standard session token and navigate to dashboard
        localStorage.setItem('access_token', data?.accessToken)
        localStorage.setItem('user_info', JSON.stringify(data?.user))
        navigate('/dashboard')
      }
    },
  })

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
    reset: mutation.reset,
  }
}

export function useRequestReset() {
  const mutation = useMutation<RequestResetResponse, Error, RequestResetPayload>({
    mutationFn: (payload) => authService.requestReset(payload),
  })

  return {
    requestReset: mutation.mutate,
    requestResetAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
    reset: mutation.reset,
  }
}

export function useChangePassword() {
  const navigate = useNavigate()

  const mutation = useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: (payload) => authService.changePassword(payload),
    onSuccess: () => {
      navigate('/login')
    },
  })

  return {
    changePassword: mutation.mutate,
    changePasswordAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
    reset: mutation.reset,
  }
}

export function useLogout() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
    localStorage.removeItem('temp_token')
    navigate('/login')
  }

  return { logout }
}
