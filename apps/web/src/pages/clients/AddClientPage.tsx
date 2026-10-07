import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { useCreateClient } from '../../hooks/useClients'
import type { ClientType, CreateClientPayload } from '../../api/types'

export default function AddClientPage() {
  const navigate = useNavigate()
  const createClientMutation = useCreateClient()

  const [clientType, setClientType] = useState<ClientType>('INDIVIDUAL')
  const [formData, setFormData] = useState<CreateClientPayload>({
    clientType: 'INDIVIDUAL',
    firstName: '',
    lastName: '',
    companyName: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    panNumber: '',
    aadhaarNumber: '',
    gstNumber: '',
    currentAddress: '',
    permanentAddress: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (type: ClientType) => {
    setClientType(type)
    setFormData((prev) => ({ ...prev, clientType: type }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.primaryPhone) {
      setErrorMsg('Primary Phone is required.')
      return
    }

    if (clientType === 'INDIVIDUAL' && !formData.firstName) {
      setErrorMsg('First Name is required for individual clients.')
      return
    }

    if (clientType === 'CORPORATE' && !formData.companyName) {
      setErrorMsg('Company Name is required for corporate clients.')
      return
    }

    try {
      await createClientMutation.mutateAsync(formData)
      navigate('/clients')
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to create client.')
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-left max-w-4xl mx-auto pb-16">
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/clients' },
            { label: 'Clients', path: '/clients' },
            { label: 'Add client' },
          ]}
          title="Create New Client"
        />

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-body-small">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Type Selector */}
          <div className="bg-surface-card border border-border-default rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-label font-semibold text-primary">Client Type</h2>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleTypeChange('INDIVIDUAL')}
                className={`flex-1 py-3 px-4 rounded-2xl border font-medium text-body-small transition-all cursor-pointer ${
                  clientType === 'INDIVIDUAL'
                    ? 'border-brand-accent bg-brand-subtle text-primary font-semibold shadow-xs'
                    : 'border-border-default bg-bg-canvas text-secondary hover:text-primary'
                }`}
              >
                Individual Client
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('CORPORATE')}
                className={`flex-1 py-3 px-4 rounded-2xl border font-medium text-body-small transition-all cursor-pointer ${
                  clientType === 'CORPORATE'
                    ? 'border-brand-accent bg-brand-subtle text-primary font-semibold shadow-xs'
                    : 'border-border-default bg-bg-canvas text-secondary hover:text-primary'
                }`}
              >
                Corporate / Entity
              </button>
            </div>
          </div>

          {/* Basic & Profile Information */}
          <div className="bg-surface-card border border-border-default rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-label font-semibold text-primary">
              {clientType === 'INDIVIDUAL' ? 'Individual Profile' : 'Corporate Details'}
            </h2>

            {clientType === 'INDIVIDUAL' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-body-small font-medium text-secondary mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-body-small font-medium text-secondary mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-body-small font-medium text-secondary mb-1">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent uppercase"
                  />
                </div>
                <div>
                  <label className="block text-body-small font-medium text-secondary mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                    placeholder="12 digit Aadhaar"
                    className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-body-small font-medium text-secondary mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter registered company name"
                    className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-body-small font-medium text-secondary mb-1">GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="GSTIN number"
                    className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent uppercase"
                  />
                </div>
                <div>
                  <label className="block text-body-small font-medium text-secondary mb-1">Company PAN</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="Company PAN"
                    className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent uppercase"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div className="bg-surface-card border border-border-default rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-label font-semibold text-primary">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-body-small font-medium text-secondary mb-1">
                  Primary Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div>
                <label className="block text-body-small font-medium text-secondary mb-1">Secondary Phone</label>
                <input
                  type="text"
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleChange}
                  placeholder="Alternate phone number"
                  className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-body-small font-medium text-secondary mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="client@example.com"
                  className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-body-small font-medium text-secondary mb-1">Current Address</label>
                <textarea
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Enter address..."
                  className="w-full px-4 py-2.5 bg-bg-canvas border border-border-default rounded-xl text-body-small text-primary focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              variant="secondary"
              size="medium"
              onClick={() => navigate('/clients')}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="medium"
              type="submit"
            >
              {createClientMutation.isPending ? 'Saving...' : 'Save & Onboard Client'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
