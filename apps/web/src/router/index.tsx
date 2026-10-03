import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import Dashboard from '../pages/Dashboard'
import PasswordResetsPage from '../pages/password-resets/PasswordResetsPage'
import Home from '../pages/Home'
import ProtectedRoute from '../components/auth/ProtectedRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/set-password" element={<ResetPassword />} />
        <Route path="/design-system" element={<Home />} />

        {/* Protected Base Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Restricted Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN']}
              requiredPermission="password_resets:read"
            />
          }
        >
          <Route path="/people/password-resets" element={<PasswordResetsPage />} />
          <Route path="/people/password-reset-requests" element={<PasswordResetsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
