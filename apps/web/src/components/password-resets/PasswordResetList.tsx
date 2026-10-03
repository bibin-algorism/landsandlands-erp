import { useState } from 'react'
import type { PasswordResetRequestData } from '../../api/types'

export interface PasswordResetListProps {
  requests: PasswordResetRequestData[]
  completedRequest?: PasswordResetRequestData | null
  selectedId: string | null
  onSelectRequest: (item: PasswordResetRequestData) => void
  isLoading?: boolean
}

export default function PasswordResetList({
  requests,
  completedRequest,
  selectedId,
  onSelectRequest,
  isLoading,
}: PasswordResetListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Combine pending requests and active completed request if present
  const allDisplayRequests = [...requests]
  if (completedRequest && !allDisplayRequests.some((r) => r.id === completedRequest.id)) {
    allDisplayRequests.unshift(completedRequest)
  }

  const filteredRequests = allDisplayRequests.filter((req) => {
    const term = searchTerm.toLowerCase()
    const name = `${req.user?.profile?.firstName || ''} ${req.user?.profile?.lastName || ''}`.trim() || 'Employee'
    const empCode = req.identifier || ''
    return name.toLowerCase().includes(term) || empCode.toLowerCase().includes(term)
  })

  return (
    <div className="bg-surface-card border border-border-default rounded-2xl p-5 space-y-4 shadow-xs text-left min-h-[480px]">
      {/* List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h4 text-primary font-bold">Requests</h2>
        {allDisplayRequests.length > 0 && (
          <div className="flex items-center gap-1 bg-bg-subtle px-2.5 py-1 rounded-lg border border-border-default text-caption text-secondary font-medium">
            <span>Priority first</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <svg
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-disabled"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search name or employee code"
          className="w-full pl-9 pr-3 py-2 bg-bg-default border border-border-default rounded-xl text-body-small text-primary placeholder:text-disabled outline-none focus:border-border-strong transition-colors"
        />
      </div>

      {/* Category Section Header if items exist */}
      {filteredRequests.length > 0 && (
        <div className="flex items-center gap-2 pt-1 text-caption font-semibold text-secondary">
          <span className="w-2 h-2 rounded-full bg-error inline-block" />
          <span>Needs attention</span>
          <span className="text-disabled font-normal">{filteredRequests.length}</span>
        </div>
      )}

      {/* Requests List */}
      {isLoading ? (
        <div className="py-24 text-center text-secondary text-body-small animate-pulse">
          Loading requests from database...
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="py-28 px-4 text-center space-y-1 flex flex-col items-center justify-center">
          <div className="text-body-small font-bold text-primary">No requests waiting</div>
          <div className="text-caption text-secondary">New requests will appear here.</div>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredRequests.map((req) => {
            const isSelected = req.id === selectedId
            const isDone = completedRequest?.id === req.id
            const fullName = `${req.user?.profile?.firstName || ''} ${req.user?.profile?.lastName || ''}`.trim() || req.identifier
            const initials = fullName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase() || 'U'

            const timeAgo = req.requestedAt
              ? new Date(req.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : 'Recently'

            return (
              <div
                key={req.id}
                onClick={() => onSelectRequest(req)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-bg-default border-border-default hover:border-border-strong text-primary'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-semibold text-caption ${
                        isSelected
                          ? 'bg-[#FFEDD5] text-[#C2410C]'
                          : 'bg-[#E0EAFF] text-[#3538CD]'
                      }`}
                    >
                      {initials}
                    </div>
                    {/* Name & Reason */}
                    <div className="min-w-0 leading-tight">
                      <div
                        className={`text-body-small font-semibold truncate ${
                          isSelected ? 'text-white' : 'text-primary'
                        }`}
                      >
                        {fullName} ({req.identifier})
                      </div>
                      <div
                        className={`text-caption truncate ${
                          isSelected ? 'text-[#D6D3D1]' : 'text-secondary'
                        }`}
                      >
                        {req.reason}
                      </div>
                    </div>
                  </div>

                  {/* Status / Time Badge */}
                  <div className="shrink-0">
                    {isDone ? (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857]">
                        Done
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-brand-accent text-primary'
                            : 'bg-bg-subtle text-secondary border border-border-default'
                        }`}
                      >
                        {timeAgo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
