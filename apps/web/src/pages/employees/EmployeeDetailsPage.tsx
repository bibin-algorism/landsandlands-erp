import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { useEmployees, useEmployeeDetails } from '../../hooks/useEmployees'
import Avatar from '../../components/common/Avatar'

type TabType = 'Personal' | 'Communication' | 'Documents' | 'Employment' | 'Financial' | 'System data'

export default function EmployeeDetailsPage() {
  const { employeeId } = useParams<{ employeeId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('Personal')
  const [showAadhaar, setShowAadhaar] = useState(false)
  const [showPan, setShowPan] = useState(false)

  const { data: detailData } = useEmployeeDetails(employeeId)
  const { data: apiEmployees } = useEmployees()

  // Fetch employee from individual details endpoint first, or fallback to list lookup
  const foundEmployee =
    detailData ||
    apiEmployees?.find((e) => e.employeeId === employeeId || e.id === employeeId)

  const employee: any = foundEmployee || {}

  const fullName =
    employee.fullName ||
    [employee.firstName, employee.lastName].filter(Boolean).join(' ') ||
    employeeId ||
    'Employee Details'

  const TabDetailRenderer = ({ label, value }: { label: string, value: string }) => {
    return (
      <div className="bg-white border border-border-default/50 rounded-[20px] p-4">
        <div className="text-caption text-secondary">{label}</div>
        <div className="text-primary text-label mt-1">{value}</div>
      </div>
    )
  }

  const defaultDocs = [
    { name: 'Aadhaar - Front', status: 'Unverified', verified: false },
    { name: 'Aadhaar - Back', status: 'Unverified', verified: false },
    { name: 'PAN - Front', status: 'Unverified', verified: false },
    { name: 'Degree certificate', status: 'Unverified', verified: false },
  ]

  const docsList = (employee?.documents && employee.documents.length > 0) ? employee.documents : defaultDocs
  const verifiedCount = docsList.filter((d: any) => d.verified || d.status === 'Checked against original').length
  const totalCount = docsList.length

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        {/* Top Breadcrumb & Actions Row */}
        <PageHeader
          breadcrumbItems={[
            { label: 'People', path: '/employees' },
            { label: 'Employees', path: '/employees' },
            { label: employee.employeeId },
          ]}
          title={fullName}
          actions={
            <>
              <Button
                variant="secondary"
                size="medium"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                View history
              </Button>

              <Button
                variant="primary"
                size="medium"
                onClick={() => navigate(`/employees/${employee.employeeId}/edit`)}
              >
                Edit details
              </Button>
            </>
          }
        />

        {/* Floating Header Card */}
        <div className="bg-surface-card border border-border-default/85 rounded-3xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-start gap-8 lg:gap-28">
          {/* Avatar + Main Identity */}
          <div className="flex items-center gap-4 shrink-0">
            <Avatar name={fullName} size={56} />
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-primary text-label">
                  {fullName || '-'}
                </span>
                <span className="px-3 py-0.5 rounded-full text-caption font-semibold bg-[#DCFCE7] text-[#15803D]">
                  {employee.onboardingStatus || employee.employmentStatus || 'Active'}
                </span>
              </div>
              <div className="text-body-small text-secondary">
                {(employee?.communicationDetail?.officialEmail || employee?.communicationDetail?.personalEmail || employee?.email) || '-'} · {(employee?.communicationDetail?.officialPhone || employee?.communicationDetail?.personalPhone || employee?.phone) || '-'}
              </div>
            </div>
          </div>

          {/* Quick Info Attributes */}
          <div className="flex flex-wrap items-center gap-8 lg:gap-28 pt-4 lg:pt-0 border-t lg:border-t-0 border-border-default/60">
            <div>
              <div className="text-caption text-secondary font-medium capitalize tracking-wider">Employee ID</div>
              <div className="text-label text-primary mt-0.5">{employee.employeeId || employeeId || '-'}</div>
            </div>
            <div>
              <div className="text-caption text-secondary font-medium capitalize tracking-wider">Joined</div>
              <div className="text-label text-primary mt-0.5">{employee.joinedDate || employee.createdAt || '-'}</div>
            </div>
            <div>
              <div className="text-caption text-secondary font-medium capitalize tracking-wider">Reports to</div>
              <div className="text-label text-primary mt-0.5">{employee.reportsTo || '-'}</div>
            </div>
            <div>
              <div className="text-caption text-secondary font-medium capitalize tracking-wider">Job type</div>
              <div className="text-label text-primary mt-0.5">{employee.jobType || '-'}</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs & Security Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-label text-secondary font-semibold mr-1">Show:</span>
            {(['Personal', 'Communication', 'Documents', 'Employment', 'Financial', 'System data'] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.75 rounded-full text-label transition-all cursor-pointer shrink-0 ${activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-white text-secondary border border-border-default hover:text-primary hover:bg-bg-subtle'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-caption text-secondary shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Restricted details stay hidden until you choose Show</span>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Main Section Card - 7 cols) */}
          <div className="lg:col-span-7 bg-surface-glass border border-border-default/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-primary">
                {activeTab === 'Personal' && 'Personal identity'}
                {activeTab === 'Communication' && 'Communication details'}
                {activeTab === 'Documents' && 'Submitted documents'}
                {activeTab === 'Employment' && 'Employment details'}
                {activeTab === 'Financial' && 'Financial information'}
                {activeTab === 'System data' && 'System metadata'}
              </h2>

              <button
                type="button"
                className="flex items-center gap-1.5 text-caption font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </button>
            </div>

            {/* Tab Details Render */}
            {activeTab === 'Personal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <TabDetailRenderer label="Full name" value={fullName} />
                  <TabDetailRenderer label="Date of birth" value={employee.personalDetail?.dateOfBirth || employee.dateOfBirth || '-'} />
                  <TabDetailRenderer label="Gender" value={employee.personalDetail?.gender || employee.gender || '-'} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <TabDetailRenderer label="Blood group" value={employee.personalDetail?.bloodGroup || employee.bloodGroup || '-'} />
                  <TabDetailRenderer label="Father's name" value={employee.personalDetail?.fatherName || employee.fatherName || '-'} />
                  <TabDetailRenderer label="Marital status" value={employee.personalDetail?.maritalStatus || employee.maritalStatus || '-'} />
                </div>

                {/* Sensitive Masked Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#FAF9F5] border border-border-default/50 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-caption text-secondary font-medium">
                        <span>Aadhaar number</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="font-bold font-mono text-primary text-body-small mt-1">
                        {showAadhaar ? (employee.personalDetail?.aadhaarFull || employee.aadhaarFull || '-') : (employee.personalDetail?.aadhaarMasked || employee.aadhaarMasked || 'XXXX XXXX XXXX')}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAadhaar(!showAadhaar)}
                      className="px-3 py-1 bg-white border border-border-default rounded-full text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
                    >
                      {showAadhaar ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  <div className="bg-[#FAF9F5] border border-border-default/50 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-caption text-secondary font-medium">
                        <span>PAN</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="font-bold font-mono text-primary text-body-small mt-1">
                        {showPan ? (employee.personalDetail?.panFull || employee.panFull || '-') : (employee.personalDetail?.panMasked || employee.panMasked || 'XXXXX XXXX X')}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPan(!showPan)}
                      className="px-3 py-1 bg-white border border-border-default rounded-full text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
                    >
                      {showPan ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Communication' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TabDetailRenderer label="Personal phone" value={employee.communicationDetail?.personalPhone || employee.personalPhone || employee.phone || '-'} />
                  <TabDetailRenderer label="Personal email" value={employee.communicationDetail?.personalEmail || employee.personalEmail || employee.email || '-'} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TabDetailRenderer label="Current address" value={employee.communicationDetail?.currentAddress || employee.currentAddress || '-'} />
                  <TabDetailRenderer label="Permanent address" value={employee.communicationDetail?.permanentAddress || employee.permanentAddress || '-'} />
                </div>

                <TabDetailRenderer label="Emergency contact" value={employee.communicationDetail?.emergencyContact || employee.emergencyContact || '-'} />
              </div>
            )}

            {activeTab === 'Documents' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {docsList.map((doc: any, i: number) => {
                    const isVerified = doc.verified || doc.status === 'Checked against original'
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-2 ${
                          isVerified
                            ? 'bg-[#ECFDF5] border border-[#A7F3D0]'
                            : 'bg-[#FFFBEB] border border-[#FDE68A]'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-title ${
                            isVerified ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                          }`}
                        >
                          {isVerified ? '✓' : '!'}
                        </div>
                        <div className="font-bold text-primary text-body-small">{doc.name}</div>
                        <div
                          className={`text-caption font-medium ${
                            isVerified ? 'text-[#047857]' : 'text-[#B45309]'
                          }`}
                        >
                          {isVerified ? (doc.status || 'Checked against original') : 'Document unverified'}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'Employment' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TabDetailRenderer label="Vertical" value={employee.vertical || '-'} />
                  <TabDetailRenderer label="Role" value={employee.role || '-'} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TabDetailRenderer label="Probation period" value={employee.employmentDetail?.probationPeriod || employee.probationPeriod || '-'} />
                  <TabDetailRenderer label="Financial agreement" value={employee.employmentDetail?.financialAgreement || employee.financialAgreement || '-'} />
                </div>
              </div>
            )}

            {activeTab === 'Financial' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TabDetailRenderer label="Take home pay" value={employee.financialDetail?.takeHomePay || employee.takeHomePay || '-'} />
                  <TabDetailRenderer label="Bank account" value={employee.financialDetail?.bankAccount || employee.bankAccount || '-'} />
                </div>
              </div>
            )}

            {activeTab === 'System data' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TabDetailRenderer label="System Employee ID" value={employee.employeeId || employeeId || '-'} />
                  <TabDetailRenderer label="Status" value={employee.onboardingStatus || employee.employmentStatus || 'Active'} />
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Documents Summary Widget Card - 5 cols) */}
          <div className="lg:col-span-5 bg-white border border-border-default/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-title font-serif font-bold text-primary">Documents</h2>
              <span
                className={`px-3 py-1 rounded-full text-caption font-semibold ${
                  verifiedCount === totalCount && totalCount > 0
                    ? 'bg-[#DCFCE7] text-[#15803D]'
                    : 'bg-[#FEF3C7] text-[#D97706]'
                }`}
              >
                {verifiedCount} of {totalCount} verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {docsList.map((doc: any, i: number) => {
                const isVerified = doc.verified || doc.status === 'Checked against original'
                return (
                  <div
                    key={i}
                    className={`rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-2 ${
                      isVerified
                        ? 'bg-[#ECFDF5] border border-[#A7F3D0]'
                        : 'bg-[#FFFBEB] border border-[#FDE68A]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-body-small ${
                        isVerified ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                      }`}
                    >
                      {isVerified ? '✓' : '!'}
                    </div>
                    <div className="font-bold text-primary text-body-small">{doc.name}</div>
                    <div
                      className={`text-[11px] font-medium ${
                        isVerified ? 'text-[#047857]' : 'text-[#B45309]'
                      }`}
                    >
                      {isVerified ? (doc.status || 'Checked against original') : 'Document unverified'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout >
  )
}
