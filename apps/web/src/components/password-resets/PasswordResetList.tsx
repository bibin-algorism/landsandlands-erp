import { useState } from 'react'

export interface RequestItem {
  id: string
  name: string
  empCode: string
  role: string
  reason: string
  notes?: string
  timeAgo: string
  isUrgent?: boolean
  avatarBg: string
  avatarText: string
  requestedAt: string
  lastSignIn: string
  pastResets: string
  phone: string
}

export const MOCK_REQUESTS: RequestItem[] = [
  {
    id: '1',
    name: 'Arun Kumar',
    empCode: 'L&L_48102',
    role: 'Site supervisor',
    reason: 'Someone else may know it',
    timeAgo: '3 h',
    avatarBg: 'bg-[#E0F2FE]',
    avatarText: 'text-[#0369A1]',
    requestedAt: '30 Sep, 08:15 am',
    lastSignIn: '29 Sep, 05:00 pm',
    pastResets: '0',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    name: 'Deepa N',
    empCode: 'L&L_48155',
    role: 'HR Assistant',
    reason: 'Forgot password',
    timeAgo: '2 days',
    isUrgent: true,
    avatarBg: 'bg-[#F3E8FF]',
    avatarText: 'text-[#6B21A8]',
    requestedAt: '28 Sep, 11:30 am',
    lastSignIn: '27 Sep, 04:20 pm',
    pastResets: '2 · May 2026',
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    name: 'Ravi V',
    empCode: 'L&L_48190',
    role: 'Accounts lead',
    reason: 'New phone, lost saved password',
    timeAgo: '1 day',
    isUrgent: true,
    avatarBg: 'bg-[#DCFCE7]',
    avatarText: 'text-[#15803D]',
    requestedAt: '29 Sep, 02:45 pm',
    lastSignIn: '28 Sep, 09:10 am',
    pastResets: '1 · Aug 2026',
    phone: '+91 98765 43212',
  },
  {
    id: '4',
    name: 'Priya Raman',
    empCode: 'L&L_48213',
    role: 'Sales executive',
    reason: 'Forgot password',
    timeAgo: '2 h',
    avatarBg: 'bg-[#FFEDD5]',
    avatarText: 'text-[#C2410C]',
    requestedAt: '30 Sep, 10:42 am',
    lastSignIn: '29 Sep, 6:12 pm',
    pastResets: '1 · Jun 2026',
    phone: '+91 98400 12345',
  },
  {
    id: '5',
    name: 'Meena S',
    empCode: 'L&L_48301',
    role: 'Legal officer',
    reason: "Password isn't working",
    timeAgo: '18 h',
    avatarBg: 'bg-[#E0EAFF]',
    avatarText: 'text-[#3538CD]',
    requestedAt: '29 Sep, 06:00 pm',
    lastSignIn: '29 Sep, 01:00 pm',
    pastResets: '0',
    phone: '+91 98765 43214',
  },
]

export interface PasswordResetListProps {
  selectedId: string
  onSelectRequest: (item: RequestItem) => void
}

export default function PasswordResetList({
  selectedId,
  onSelectRequest,
}: PasswordResetListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = MOCK_REQUESTS.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.empCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-surface-card border border-border-default rounded-2xl p-5 space-y-4 shadow-xs text-left">
      {/* List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h4 text-primary font-bold">Requests</h2>
        <button
          type="button"
          className="text-caption font-medium text-secondary hover:text-primary flex items-center gap-1 border border-border-default px-2.5 py-1 rounded-lg bg-bg-subtle cursor-pointer"
        >
          Priority first <span>⌄</span>
        </button>
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

      {/* Category Section Header */}
      <div className="flex items-center gap-2 pt-1 text-caption font-semibold text-secondary">
        <span className="w-2 h-2 rounded-full bg-error inline-block" />
        <span>Needs attention</span>
        <span className="text-disabled font-normal">3</span>
      </div>

      {/* Requests List */}
      <div className="space-y-2">
        {filteredRequests.map((req) => {
          const isSelected = req.id === selectedId
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
                        : `${req.avatarBg} ${req.avatarText}`
                    }`}
                  >
                    {req.avatarText ? req.name.split(' ').map((n) => n[0]).join('') : 'U'}
                  </div>
                  {/* Name & Reason */}
                  <div className="min-w-0 leading-tight">
                    <div
                      className={`text-body-small font-semibold truncate ${
                        isSelected ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {req.name}
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

                {/* Time Badge */}
                <div className="shrink-0">
                  {req.timeAgo === '2 days' || req.timeAgo === '1 day' ? (
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#FEF3F2] text-[#B42318]'
                          : 'bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]'
                      }`}
                    >
                      {req.timeAgo}
                    </span>
                  ) : (
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-brand-accent text-primary'
                          : 'bg-bg-subtle text-secondary border border-border-default'
                      }`}
                    >
                      {req.timeAgo}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
