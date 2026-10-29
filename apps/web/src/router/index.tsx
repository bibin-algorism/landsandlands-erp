import { BrowserRouter, Navigate, Routes, Route, useParams } from 'react-router-dom'
import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import Dashboard from '../pages/Dashboard'
import EmployeesPage from '../pages/employees/EmployeesPage'
import AddEmployeePage from '../pages/employees/AddEmployeePage'
import EmployeeDetailsPage from '../pages/employees/EmployeeDetailsPage'
import EmployeeEditPage from '../pages/employees/EmployeeEditPage'
import RequestChangePage from '../pages/employees/change-requests/RequestChangePage'
import MyChangeRequestsPage from '../pages/employees/change-requests/MyChangeRequestsPage'
import ChangeRequestQueuePage from '../pages/employees/change-requests/ChangeRequestQueuePage'
import ChangeRequestDetailPage from '../pages/employees/change-requests/ChangeRequestDetailPage'
import ClientsPage from '../pages/clients/ClientsPage'
import AddClientPage from '../pages/clients/AddClientPage'
import ClientDetailsPage from '../pages/clients/ClientDetailsPage'
import PasswordResetsPage from '../pages/password-resets/PasswordResetsPage'
import Home from '../pages/Home'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import DocumentTitle from './DocumentTitle'

import ButtonShowcasePage from '../pages/ButtonShowcasePage'
import PendingDocumentsPage from '../pages/approvals/PendingDocumentsPage'

/** Old /employees/change-requests/:id links → Approvals. */
function ChangeRequestRedirect() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={`/approvals/change-requests/${id}`} replace />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <DocumentTitle />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/set-password" element={<ResetPassword />} />
        <Route path="/design-system" element={<Home />} />
        <Route path="/design-system/buttons" element={<ButtonShowcasePage />} />

        {/* Protected Base Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Own record and change requests (FR-11, FR-16) */}
          <Route path="/my-profile" element={<EmployeeDetailsPage self />} />
          <Route path="/my-profile/change-requests" element={<MyChangeRequestsPage />} />
          <Route path="/my-profile/change-requests/new" element={<RequestChangePage />} />
        </Route>

        {/* Employee directory: the API scopes results (Vertical Heads see their team) */}
        <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN', 'VERTICAL_HEAD']} />}>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/people/employees" element={<EmployeesPage />} />
          <Route path="/employees/:employeeId" element={<EmployeeDetailsPage />} />
          <Route path="/people/employees/:employeeId" element={<EmployeeDetailsPage />} />
        </Route>

        {/* HR only: onboarding and direct edit (FR-01, FR-24) */}
        <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR_ADMIN']} />}>
          <Route path="/employees/new" element={<AddEmployeePage />} />
          <Route path="/employees/:employeeId/edit" element={<EmployeeEditPage />} />
        </Route>

        {/* Approvals: work waiting for a decision */}
        <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN']} />}>
          {/* Change-request review: HR, and the MD for HR's own records (FR-18) */}
          <Route path="/approvals/change-requests" element={<ChangeRequestQueuePage />} />
          <Route path="/approvals/change-requests/:id" element={<ChangeRequestDetailPage />} />
          <Route path="/approvals/password-resets" element={<PasswordResetsPage />} />
          {/* Previous paths, kept so existing links still work */}
          <Route path="/employees/change-requests" element={<Navigate to="/approvals/change-requests" replace />} />
          <Route path="/employees/change-requests/:id" element={<ChangeRequestRedirect />} />
          <Route path="/people/password-resets" element={<Navigate to="/approvals/password-resets" replace />} />
          <Route path="/people/password-reset-requests" element={<Navigate to="/approvals/password-resets" replace />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HR_ADMIN']} />}>
          <Route path="/approvals/pending-documents" element={<PendingDocumentsPage />} />
        </Route>

        {/* Admin Restricted Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={['SUPER_ADMIN', 'ADMIN', 'HR_ADMIN']}
            />
          }
        >
          {/* Client / Customer Routes */}
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/people/clients" element={<ClientsPage />} />
          <Route path="/clients/add" element={<AddClientPage />} />
          <Route path="/people/clients/add" element={<AddClientPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="/people/clients/:clientId" element={<ClientDetailsPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
