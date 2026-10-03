import AppLayout from '../components/layout/AppLayout'

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-h2 text-primary font-bold">Welcome back, Deepa 👋</h1>
            <p className="text-body-small text-secondary">
              Here is what is happening across Lands and Lands ERP today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-[#ECFDF3] text-[#027A48] text-caption font-semibold border border-[#ABE5C6]">
              System Status: Operational
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-surface-card border border-border-default rounded-2xl p-5 shadow-xs space-y-2">
            <p className="text-caption text-secondary font-medium">Pending Reset Requests</p>
            <div className="flex items-baseline justify-between">
              <span className="text-h1 font-bold text-primary">5</span>
              <span className="text-caption text-brand-accent font-semibold">Requires HR Action</span>
            </div>
          </div>

          <div className="bg-surface-card border border-border-default rounded-2xl p-5 shadow-xs space-y-2">
            <p className="text-caption text-secondary font-medium">Active Employees</p>
            <div className="flex items-baseline justify-between">
              <span className="text-h1 font-bold text-primary">128</span>
              <span className="text-caption text-[#027A48] font-semibold">+4 this month</span>
            </div>
          </div>

          <div className="bg-surface-card border border-border-default rounded-2xl p-5 shadow-xs space-y-2">
            <p className="text-caption text-secondary font-medium">Security Audits (24h)</p>
            <div className="flex items-baseline justify-between">
              <span className="text-h1 font-bold text-primary">42</span>
              <span className="text-caption text-secondary">All normal</span>
            </div>
          </div>
        </div>

        {/* Placeholder Content Card */}
        <div className="bg-surface-card border border-border-default rounded-2xl p-8 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-bg-subtle border border-border-default flex items-center justify-center mx-auto text-secondary">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h3 className="text-h3 font-semibold text-primary">ERP Dashboard Workspace</h3>
          <p className="text-body-small text-secondary max-w-md mx-auto">
            Modules for Real Estate Sales, Unit Management, CRM, Collections, and Financial Reports are active and synchronized.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
