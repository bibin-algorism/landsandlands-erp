import { useState, useEffect } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import PasswordResetHeader from '../../components/password-resets/PasswordResetHeader'
import PasswordResetList from '../../components/password-resets/PasswordResetList'
import PasswordResetDetail from '../../components/password-resets/PasswordResetDetail'
import { usePasswordResets, useActionPasswordReset } from '../../hooks/usePasswordResets'
import type { PasswordResetRequestData } from '../../api/types'

export interface ActiveCompletedState {
  request: PasswordResetRequestData
  tempPassword: string
}

export default function PasswordResetsPage() {
  const { requests, isLoading, error } = usePasswordResets()
  const { actionResetAsync, isPending } = useActionPasswordReset()

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeCompleted, setActiveCompleted] = useState<ActiveCompletedState | null>(null)

  // Auto-select first request if available and none selected (and not in active completed mode)
  useEffect(() => {
    if (!activeCompleted) {
      if (requests.length > 0 && (!selectedId || !requests.some((r) => r.id === selectedId))) {
        setSelectedId(requests[0].id)
      } else if (requests.length === 0) {
        setSelectedId(null)
      }
    }
  }, [requests, selectedId, activeCompleted])

  const selectedRequest = activeCompleted
    ? activeCompleted.request
    : requests.find((r) => r.id === selectedId) || null

  const handleGenerateTempPassword = async (request: PasswordResetRequestData) => {
    try {
      // Synchronously lock active completed state to prevent race conditions during query invalidation
      setActiveCompleted({
        request,
        tempPassword: '',
      })

      const res = await actionResetAsync({
        requestId: request.id,
        action: 'APPROVED',
      })

      const generatedPassword = res.tempPassword || res.temporaryPassword
      if (generatedPassword) {
        setActiveCompleted({
          request,
          tempPassword: generatedPassword,
        })
      }
      return generatedPassword
    } catch (err) {
      setActiveCompleted(null)
      console.error('Failed to generate temp password:', err)
      return undefined
    }
  }

  const handleReject = async (request: PasswordResetRequestData, reason?: string) => {
    try {
      await actionResetAsync({
        requestId: request.id,
        action: 'REJECTED',
        note: reason,
      })
      setSelectedId(null)
    } catch (err) {
      console.error('Failed to reject reset request:', err)
    }
  }

  const handleDone = () => {
    setActiveCompleted(null)
    if (requests.length > 0) {
      setSelectedId(requests[0].id)
    } else {
      setSelectedId(null)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <PasswordResetHeader
          pendingCount={requests.length}
          attentionText={
            requests.length === 0 && !activeCompleted
              ? 'No requests waiting right now.'
              : `${requests.length} need attention now — awaiting administrative action.`
          }
        />

        {error && (
          <div className="p-4 bg-[#FEF3F2] border border-[#FECDCA] rounded-xl text-body-small text-[#B42318]">
            {error}
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Requests List */}
          <div className="lg:col-span-5">
            <PasswordResetList
              requests={requests}
              completedRequest={activeCompleted?.request}
              selectedId={activeCompleted ? activeCompleted.request.id : selectedId}
              isLoading={isLoading}
              onSelectRequest={(item) => {
                if (!activeCompleted) {
                  setSelectedId(item.id)
                }
              }}
            />
          </div>

          {/* Request Details */}
          <div className="lg:col-span-7">
            <PasswordResetDetail
              request={selectedRequest}
              completedTempPassword={activeCompleted?.tempPassword || undefined}
              isProcessing={isPending}
              onGenerateTempPassword={handleGenerateTempPassword}
              onReject={handleReject}
              onDone={handleDone}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
