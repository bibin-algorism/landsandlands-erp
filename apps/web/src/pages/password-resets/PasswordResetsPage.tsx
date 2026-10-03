import { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import PasswordResetHeader from '../../components/password-resets/PasswordResetHeader'
import PasswordResetList, {
  MOCK_REQUESTS,
  type RequestItem,
} from '../../components/password-resets/PasswordResetList'
import PasswordResetDetail from '../../components/password-resets/PasswordResetDetail'

export default function PasswordResetsPage() {
  const [selectedRequest, setSelectedRequest] = useState<RequestItem>(
    MOCK_REQUESTS.find((r) => r.id === '4') || MOCK_REQUESTS[0]
  )

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <PasswordResetHeader />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Requests List */}
          <div className="lg:col-span-5">
            <PasswordResetList
              selectedId={selectedRequest.id}
              onSelectRequest={(item) => setSelectedRequest(item)}
            />
          </div>

          {/* Request Details */}
          <div className="lg:col-span-7">
            <PasswordResetDetail
              request={selectedRequest}
              onGenerateTempPassword={(req) => {
                console.log('Generated temp password for:', req.empCode)
              }}
              onReject={(req) => {
                console.log('Rejected request for:', req.empCode)
              }}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
