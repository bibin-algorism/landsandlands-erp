import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Avatar from '../../components/common/Avatar'
import StatusBadge from '../../components/common/StatusBadge'
import { useClientDetails } from '../../hooks/useClients'

type ClientTabType = 'Overview & Profile' | 'Contact Information' | 'RM & Ownership'

export default function ClientDetailsPage() {
  const { clientId } = useParams<{ clientId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ClientTabType>('Overview & Profile')

  const { data: client, isLoading, isError } = useClientDetails(clientId)

  const clientName = client?.name || client?.clientCode || 'Client Details'
  const isCorporate = client?.clientType === 'CORPORATE'

  const TabDetailRenderer = ({ label, value }: { label: string; value: string | undefined | null }) => {
    return (
      <div className="bg-white border border-border-default/50 rounded-[20px] p-4 shadow-xs">
        <div className="text-caption text-secondary font-medium">{label}</div>
        <div className="text-primary text-label mt-1 font-semibold">{value || '-'}</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-12 text-center text-secondary font-medium">Loading client details...</div>
      </AppLayout>
    )
  }

  if (isError || !client) {
    return (
      <AppLayout>
        <div className="p-12 text-center space-y-4">
          <div className="text-red-500 font-semibold text-lg">Client Not Found</div>
          <Button variant="secondary" size="medium" onClick={() => navigate('/clients')}>
            Back to Clients
          </Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        {/* Page Header */}
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/clients' },
            { label: 'Clients', path: '/clients' },
            { label: client.clientCode || 'Details' },
          ]}
          title={clientName}
          actions={
            <Button
              variant="secondary"
              size="medium"
              onClick={() => navigate('/clients')}
            >
              Back to list
            </Button>
          }
        />

        {/* Floating Header Card */}
        <div className="bg-surface-card border border-border-default/85 rounded-3xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-start gap-8 lg:gap-20">
          {/* Avatar + Main Identity */}
          <div className="flex items-center gap-4 shrink-0">
            <Avatar name={clientName} size={56} />
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-primary text-label">
                  {clientName}
                </span>
                <StatusBadge label={client.status || 'ACTIVE'} />
              </div>
              <div className="text-body-small text-secondary">
                {isCorporate ? 'Corporate Client' : 'Individual Client'} · Code: {client.clientCode}
              </div>
            </div>
          </div>

          {/* Quick Info Attributes */}
          <div className="flex flex-wrap items-center gap-8 lg:gap-20 pt-4 lg:pt-0 border-t lg:border-t-0 border-border-default/60">
            <div>
              <div className="text-caption text-secondary font-medium tracking-wider">Primary Phone</div>
              <div className="text-label text-primary mt-0.5">{client.contact?.primaryPhone || '-'}</div>
            </div>
            <div>
              <div className="text-caption text-secondary font-medium tracking-wider">Email</div>
              <div className="text-label text-primary mt-0.5">{client.contact?.email || '-'}</div>
            </div>
            <div>
              <div className="text-caption text-secondary font-medium tracking-wider">Primary RM</div>
              <div className="text-label text-primary mt-0.5">
                {client.primaryRM ? `${client.primaryRM.firstName} ${client.primaryRM.lastName}` : '-'}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-border-default/80 pb-2">
          {(['Overview & Profile', 'Contact Information', 'RM & Ownership'] as ClientTabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-body-small font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-secondary hover:text-primary hover:bg-bg-subtle'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview & Profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TabDetailRenderer label="Client Code" value={client.clientCode} />
            <TabDetailRenderer label="Client Type" value={client.clientType} />
            <TabDetailRenderer label="Status" value={client.status} />

            {isCorporate ? (
              <>
                <TabDetailRenderer label="Company Name" value={client.profile?.companyName} />
                <TabDetailRenderer label="GST Number" value={client.profile?.gstNumber} />
                <TabDetailRenderer label="Company PAN" value={client.profile?.panNumber} />
              </>
            ) : (
              <>
                <TabDetailRenderer label="First Name" value={client.profile?.firstName} />
                <TabDetailRenderer label="Last Name" value={client.profile?.lastName} />
                <TabDetailRenderer label="PAN Number" value={client.profile?.panNumber} />
                <TabDetailRenderer label="Aadhaar Number" value={client.profile?.aadhaarNumber} />
              </>
            )}
          </div>
        )}

        {activeTab === 'Contact Information' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TabDetailRenderer label="Primary Phone" value={client.contact?.primaryPhone} />
            <TabDetailRenderer label="Secondary Phone" value={client.contact?.secondaryPhone} />
            <TabDetailRenderer label="Email Address" value={client.contact?.email} />
            <div className="md:col-span-2 lg:col-span-3">
              <TabDetailRenderer label="Current Address" value={client.contact?.currentAddress} />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <TabDetailRenderer label="Permanent Address" value={client.contact?.permanentAddress} />
            </div>
          </div>
        )}

        {activeTab === 'RM & Ownership' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TabDetailRenderer
              label="Primary RM"
              value={client.primaryRM ? `${client.primaryRM.firstName} ${client.primaryRM.lastName} (${client.primaryRM.employeeId})` : '-'}
            />
            <TabDetailRenderer
              label="Acquired / Onboarded By"
              value={client.acquiredBy ? `${client.acquiredBy.firstName} ${client.acquiredBy.lastName} (${client.acquiredBy.employeeId})` : '-'}
            />
            <TabDetailRenderer
              label="Created At"
              value={client.createdAt ? new Date(client.createdAt).toLocaleDateString() : '-'}
            />
          </div>
        )}
      </div>
    </AppLayout>
  )
}
