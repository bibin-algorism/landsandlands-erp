import { useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Avatar from '../../components/common/Avatar'
import StatusBadge from '../../components/common/StatusBadge'
import HistoryDrawer from '../../components/employees/HistoryDrawer'
import { formatDate, formatRupees } from '../../components/employees/employeeForm'
import { useEmployeeDetails } from '../../hooks/useEmployees'
import { employeeService } from '../../services/employee.service'
import {
  BACKGROUND_LABELS,
  JOB_TYPE_LABELS,
  QUALIFICATION_LABELS,
  ROLE_LABELS,
} from '../../constants/employee'
import type { EmployeeView } from '../../api/types'

type TabType = 'Personal' | 'Communication' | 'Documentation' | 'Employment' | 'Financial' | 'System data'

function Detail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-caption font-medium text-secondary">{label}</div>
      <div className="text-body-small font-semibold text-primary break-words">{value || '—'}</div>
    </div>
  )
}

const Grid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">{children}</div>
)

const person = (p: { firstName: string; lastName: string; employeeId: string } | null) =>
  p ? `${p.firstName} ${p.lastName} · ${p.employeeId}` : '—'

const dateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

const money = (value: number | null | undefined) => (value === null || value === undefined ? '—' : formatRupees(value))

function TabContent({ tab, employee }: { tab: TabType; employee: EmployeeView }) {
  const { personal, communication, documentation, employment, financial, system } = employee
  switch (tab) {
    case 'Personal':
      return (
        <Grid>
          <Detail label="First name" value={employee.firstName} />
          <Detail label="Last name" value={employee.lastName} />
          <Detail label="Date of birth" value={formatDate(personal?.dateOfBirth)} />
          <Detail label="Gender" value={personal?.gender} />
          <Detail label="Blood group" value={personal?.bloodGroup} />
          <Detail label="Marital status" value={personal?.maritalStatus} />
          <Detail label="Father's name" value={personal?.fatherName} />
        </Grid>
      )
    case 'Communication':
      return (
        <div className="space-y-6">
          <Grid>
            <Detail label="Personal phone" value={communication?.personalPhone} />
            <Detail label="Secondary phone" value={communication?.secondaryPhone} />
            <Detail label="Official phone" value={communication?.officialPhone} />
            <Detail label="Personal email" value={communication?.personalEmail} />
            <Detail label="Official email" value={communication?.officialEmail} />
            <Detail label="Current address" value={communication?.currentAddress} />
            <Detail label="Permanent address" value={communication?.permanentAddress} />
          </Grid>
          <Detail
            label="Emergency contacts"
            value={communication?.emergencyContacts.map((c, i) => (
              <div key={i}>
                {c.name} ({c.relationship}) · {c.phone}
              </div>
            ))}
          />
        </div>
      )
    case 'Documentation':
      return (
        <Grid>
          {employee.access.restrictedVisible && (
            <>
              <Detail label="Aadhaar number" value={documentation?.aadhaarNumber} />
              <Detail label="Driving licence number" value={documentation?.drivingLicenceNumber} />
            </>
          )}
          <Detail
            label="Highest qualification"
            value={documentation ? QUALIFICATION_LABELS[documentation.highestQualification] : null}
          />
          <Detail
            label="Work background"
            value={documentation?.employeeBackground ? BACKGROUND_LABELS[documentation.employeeBackground] : null}
          />
          {documentation?.isIncomplete && (
            <Detail label="Previous-organisation document due" value={formatDate(documentation.secondDocDueDate)} />
          )}
        </Grid>
      )
    case 'Employment':
      return (
        <div className="space-y-6">
          <Grid>
            <Detail label="Vertical" value={employment?.vertical} />
            <Detail label="Role" value={employment ? ROLE_LABELS[employment.role] : null} />
            <Detail label="Job type" value={employment ? JOB_TYPE_LABELS[employment.jobType] : null} />
            <Detail label="Joining date" value={formatDate(employment?.joiningDate)} />
            <Detail label="Reporting authority" value={person(employment?.reportingAuthority ?? null)} />
            <Detail
              label="Probation"
              value={
                employment?.probation
                  ? `${employment.probation.probationPeriod} · ${employment.probation.financialAgreement}`
                  : 'Not on probation'
              }
            />
            {employment?.exitDate && <Detail label="Exit date" value={formatDate(employment.exitDate)} />}
            {employment?.exitReason && <Detail label="Exit reason" value={employment.exitReason} />}
          </Grid>
          <Detail
            label="Transfer history"
            value={
              employment?.transferHistory.length
                ? employment.transferHistory.map((t, i) => (
                    <div key={i}>
                      {t.fromVertical} → {t.toVertical} · {formatDate(t.transferredAt)}
                    </div>
                  ))
                : 'None'
            }
          />
          <Detail
            label="Promotion history"
            value={
              employment?.promotionHistory.length
                ? employment.promotionHistory.map((p, i) => (
                    <div key={i}>
                      {ROLE_LABELS[p.fromRole]} → {ROLE_LABELS[p.toRole]} · {formatDate(p.promotedAt)}
                    </div>
                  ))
                : 'None'
            }
          />
        </div>
      )
    case 'Financial':
      return financial ? (
        <div className="space-y-6">
          <Grid>
            <Detail label="Take-home pay" value={`${money(financial.takeHomePayTotal)} / month`} />
            <Detail label="Bank / cash" value={`${money(financial.bankComponent)} / ${money(financial.cashComponent)}`} />
            <Detail label="Account holder" value={financial.accountHolderName} />
            <Detail label="Account number" value={financial.accountNumber} />
            <Detail label="IFSC" value={financial.ifscCode} />
            <Detail label="Branch" value={financial.branchName} />
            <Detail label="Next appraisal window" value={formatDate(financial.nextAppraisalWindow)} />
          </Grid>
          <Detail
            label="Pay revisions"
            value={
              financial.payRevisions.length
                ? financial.payRevisions.map((p, i) => (
                    <div key={i}>
                      {money(p.previousPay)} → {money(p.newPay)} · effective {formatDate(p.effectiveDate)}
                    </div>
                  ))
                : 'None'
            }
          />
          <Detail
            label="Appraisals"
            value={
              financial.appraisals.length
                ? financial.appraisals.map((a, i) => (
                    <div key={i}>
                      {a.appraisalWindow}: {a.outcome}
                    </div>
                  ))
                : 'None'
            }
          />
        </div>
      ) : (
        <p className="text-caption text-secondary">Financial details are restricted.</p>
      )
    case 'System data':
      return (
        <Grid>
          <Detail label="Employee ID" value={employee.employeeId} />
          <Detail label="Status" value={employee.employmentStatus === 'ACTIVE' ? 'Active' : 'Terminated'} />
          <Detail label="Created on" value={dateTime(system.createdAt)} />
          <Detail label="Created by" value={person(system.createdBy)} />
          <Detail label="Onboarding completed on" value={dateTime(system.onboardingCompletedAt)} />
          <Detail label="Last updated on" value={dateTime(system.updatedAt)} />
          <Detail label="Last updated by" value={person(system.lastUpdatedBy)} />
        </Grid>
      )
  }
}

/** Employee record (FR-11 to FR-14). Also serves /my-profile for the signed-in employee. */
export default function EmployeeDetailsPage({ self = false }: { self?: boolean }) {
  const params = useParams<{ employeeId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('Personal')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [docError, setDocError] = useState<string | null>(null)
  const { data: employee, isLoading, error } = useEmployeeDetails(self ? 'me' : params.employeeId)

  if (isLoading || error || !employee) {
    return (
      <AppLayout>
        <div className="p-6 text-caption text-secondary">
          {isLoading ? 'Loading…' : (error?.message ?? 'Employee not found')}
        </div>
      </AppLayout>
    )
  }

  const fullName = `${employee.firstName} ${employee.lastName}`
  // BRQ-06: groups the viewer may open; Financial only when restricted data is visible
  const tabs: TabType[] = [
    'Personal',
    'Communication',
    'Documentation',
    'Employment',
    ...(employee.access.restrictedVisible ? (['Financial'] as TabType[]) : []),
    'System data',
  ]
  const documents = employee.documentation?.documents ?? []

  const openDocument = async (document: string) => {
    setDocError(null)
    try {
      await employeeService.openDocument(employee.id, document)
    } catch (err) {
      setDocError(err instanceof Error ? err.message : 'Could not open the document')
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-left w-full pb-16">
        <PageHeader
          breadcrumbItems={
            self
              ? [{ label: 'My profile' }]
              : [
                  { label: 'People', path: '/employees' },
                  { label: 'Employees', path: '/employees' },
                  { label: employee.employeeId },
                ]
          }
          title={fullName}
          actions={
            <>
              <Button variant="secondary" size="medium" onClick={() => setHistoryOpen(true)}>
                View history
              </Button>
              {employee.access.canRequestChange && (
                <>
                  <Button variant="secondary" size="medium" onClick={() => navigate('/my-profile/change-requests')}>
                    My requests
                  </Button>
                  <Button variant="primary" size="medium" onClick={() => navigate('/my-profile/change-requests/new')}>
                    Request a change
                  </Button>
                </>
              )}
              {employee.access.canEdit && (
                <Button variant="primary" size="medium" onClick={() => navigate(`/employees/${employee.employeeId}/edit`)}>
                  Edit details
                </Button>
              )}
            </>
          }
        />

        <div className="bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 shadow-xs flex flex-wrap items-center gap-4">
          <Avatar name={fullName} size={56} />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-h4 font-serif font-bold text-primary">{fullName}</span>
              <StatusBadge
                value={employee.employmentStatus === 'TERMINATED' ? 'Terminated' : employee.isIncomplete ? 'Incomplete' : 'Active'}
                color={
                  employee.employmentStatus === 'TERMINATED'
                    ? 'bg-[#FEE2E2] text-[#B91C1C]'
                    : employee.isIncomplete
                      ? 'bg-[#FEF3C7] text-[#B45309]'
                      : 'bg-[#DCFCE7] text-[#15803D]'
                }
              />
            </div>
            <div className="text-caption text-secondary">
              {employee.employeeId} · {employee.employment?.vertical ?? '—'} ·{' '}
              {employee.employment ? ROLE_LABELS[employee.employment.role] : '—'} ·{' '}
              {employee.communication?.officialEmail ?? '—'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-white text-secondary border border-border-default hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
          {!employee.access.restrictedVisible && (
            <span className="text-caption text-secondary ml-2">Restricted details are hidden.</span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 shadow-xs">
            <TabContent tab={activeTab} employee={employee} />
          </div>

          <div className="lg:col-span-4 bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 shadow-xs space-y-3">
            <h3 className="text-h4 font-serif font-bold text-primary">Documents</h3>
            {docError && <p className="text-caption text-error">{docError}</p>}
            {documents.length === 0 && <p className="text-caption text-secondary">No documents.</p>}
            {documents.map((doc) => (
              <div
                key={doc.document}
                className="flex items-center justify-between bg-white border border-border-default rounded-xl px-3 py-2"
              >
                <span className="text-caption font-medium text-primary">{doc.label}</span>
                <button
                  type="button"
                  onClick={() => openDocument(doc.document)}
                  className="text-caption font-semibold text-primary underline cursor-pointer"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HistoryDrawer employeeId={employee.id} open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </AppLayout>
  )
}
