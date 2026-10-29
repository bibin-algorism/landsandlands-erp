import { useState, type ReactNode } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Toast from '../../components/common/Toast'
import HistoryDrawer from '../../components/employees/HistoryDrawer'
import EmployeeSummaryCard from '../../components/employees/EmployeeSummaryCard'
import DocumentsPanel from '../../components/employees/DocumentsPanel'
import SectionPills from '../../components/employees/SectionPills'
import InfoTile, { LockIcon } from '../../components/employees/InfoTile'
import { formatDate, formatRupees } from '../../components/employees/employeeForm'
import {
  SECTION_TITLES,
  maskAadhaar,
  maskTail,
  sectionOfField,
  type EmployeeSection,
} from '../../components/employees/employeeSections'
import { useEmployeeDetails } from '../../hooks/useEmployees'
import { employeeService } from '../../services/employee.service'
import { JOB_TYPE_LABELS, ROLE_LABELS } from '../../constants/employee'
import type { EmployeeView } from '../../api/types'

/** Set by the edit page after a save (Figma "Edit 3"). */
export interface SavedChangesState {
  savedFields: string[]
  savedLabels: string[]
}

const Grid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>
)

const person = (p: { firstName: string; lastName: string; employeeId: string } | null) =>
  p ? `${p.firstName} ${p.lastName} · ${p.employeeId}` : '—'

const dateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

const money = (value: number | null | undefined) => (value === null || value === undefined ? '—' : formatRupees(value))

/** Masked restricted number with a Show / Hide toggle. */
function RevealTile({ label, value, mask, highlighted }: { label: string; value: string | null; mask: (v: string | null) => string; highlighted: boolean }) {
  const [shown, setShown] = useState(false)
  return (
    <InfoTile
      label={label}
      locked
      highlighted={highlighted}
      action={
        value && (
          <button
            type="button"
            onClick={() => setShown(!shown)}
            className="self-center px-3 py-1 rounded-full border border-border-default text-caption font-semibold text-primary cursor-pointer"
          >
            {shown ? 'Hide' : 'Show'}
          </button>
        )
      }
    >
      {shown ? value : mask(value)}
    </InfoTile>
  )
}

function SectionContent({ section, employee, changed }: { section: EmployeeSection; employee: EmployeeView; changed: Set<string> }) {
  const { personal, communication, documentation, employment, financial, system } = employee
  const hl = (key: string) => changed.has(key)

  switch (section) {
    case 'Personal':
      return (
        <Grid>
          <InfoTile label="First name" highlighted={hl('personal.firstName')}>{employee.firstName}</InfoTile>
          <InfoTile label="Last name" highlighted={hl('personal.lastName')}>{employee.lastName}</InfoTile>
          <InfoTile label="Date of birth" highlighted={hl('personal.dateOfBirth')}>{formatDate(personal?.dateOfBirth)}</InfoTile>
          <InfoTile label="Gender" highlighted={hl('personal.gender')}>{personal?.gender}</InfoTile>
          <InfoTile label="Blood group" highlighted={hl('personal.bloodGroup')}>{personal?.bloodGroup}</InfoTile>
          <InfoTile label="Father's name" highlighted={hl('personal.fatherName')}>{personal?.fatherName}</InfoTile>
          <InfoTile label="Marital status" highlighted={hl('personal.maritalStatus')}>{personal?.maritalStatus}</InfoTile>
          {employee.access.restrictedVisible && (
            <>
              <RevealTile label="Aadhaar number" value={documentation?.aadhaarNumber ?? null} mask={maskAadhaar} highlighted={hl('documentation.aadhaarNumber')} />
              <RevealTile label="Driving licence" value={documentation?.drivingLicenceNumber ?? null} mask={maskTail} highlighted={hl('documentation.drivingLicenceNumber')} />
            </>
          )}
        </Grid>
      )
    case 'Communication':
      return (
        <Grid>
          <InfoTile label="Personal phone" highlighted={hl('communication.personalPhone')}>{communication?.personalPhone}</InfoTile>
          <InfoTile label="Secondary phone" highlighted={hl('communication.secondaryPhone')}>{communication?.secondaryPhone}</InfoTile>
          <InfoTile label="Official phone" highlighted={hl('communication.officialPhone')}>{communication?.officialPhone}</InfoTile>
          <InfoTile label="Personal email" highlighted={hl('communication.personalEmail')}>{communication?.personalEmail}</InfoTile>
          <InfoTile label="Official email" highlighted={hl('communication.officialEmail')}>{communication?.officialEmail}</InfoTile>
          <InfoTile label="Current address" wide highlighted={hl('communication.currentAddress')}>{communication?.currentAddress}</InfoTile>
          <InfoTile label="Permanent address" wide highlighted={hl('communication.permanentAddress')}>{communication?.permanentAddress}</InfoTile>
          <InfoTile label="Emergency contacts" wide highlighted={hl('communication.emergencyContacts')}>
            {communication?.emergencyContacts.map((c, i) => (
              <div key={i}>
                {c.name} ({c.relationship}) · {c.phone}
              </div>
            ))}
          </InfoTile>
        </Grid>
      )
    case 'Employment':
      return (
        <Grid>
          <InfoTile label="Vertical" highlighted={hl('employment.vertical')}>{employment?.vertical}</InfoTile>
          <InfoTile label="Role" highlighted={hl('employment.role')}>{employment ? ROLE_LABELS[employment.role] : null}</InfoTile>
          <InfoTile label="Job type" highlighted={hl('employment.jobType')}>{employment ? JOB_TYPE_LABELS[employment.jobType] : null}</InfoTile>
          <InfoTile label="Joining date" locked>{formatDate(employment?.joiningDate)}</InfoTile>
          <InfoTile label="Reporting authority" highlighted={hl('employment.reportingAuthorityId')}>
            {person(employment?.reportingAuthority ?? null)}
          </InfoTile>
          <InfoTile label="Probation" highlighted={hl('employment.probation')}>
            {employment?.probation
              ? `${employment.probation.probationPeriod} · ${employment.probation.financialAgreement}`
              : 'Not on probation'}
          </InfoTile>
          {employment?.exitDate && <InfoTile label="Exit date">{formatDate(employment.exitDate)}</InfoTile>}
          {employment?.exitReason && <InfoTile label="Exit reason">{employment.exitReason}</InfoTile>}
          <InfoTile label="Transfer history" wide>
            {employment?.transferHistory.length
              ? employment.transferHistory.map((t, i) => (
                  <div key={i}>
                    {t.fromVertical} → {t.toVertical} · {formatDate(t.transferredAt)}
                  </div>
                ))
              : 'None'}
          </InfoTile>
          <InfoTile label="Promotion history" wide>
            {employment?.promotionHistory.length
              ? employment.promotionHistory.map((p, i) => (
                  <div key={i}>
                    {ROLE_LABELS[p.fromRole]} → {ROLE_LABELS[p.toRole]} · {formatDate(p.promotedAt)}
                  </div>
                ))
              : 'None'}
          </InfoTile>
        </Grid>
      )
    case 'Financial':
      return financial ? (
        <Grid>
          <InfoTile label="Take-home pay" locked highlighted={hl('financial.takeHomePay')}>{money(financial.takeHomePayTotal)} / month</InfoTile>
          <InfoTile label="Bank / cash" locked>{`${money(financial.bankComponent)} / ${money(financial.cashComponent)}`}</InfoTile>
          <InfoTile label="Next appraisal window" locked highlighted={hl('financial.appraisal')}>{formatDate(financial.nextAppraisalWindow)}</InfoTile>
          <InfoTile label="Account holder" locked highlighted={hl('financial.accountHolderName')}>{financial.accountHolderName}</InfoTile>
          <RevealTile label="Account number" value={financial.accountNumber} mask={maskTail} highlighted={hl('financial.accountNumber')} />
          <InfoTile label="IFSC" locked highlighted={hl('financial.ifscCode')}>{financial.ifscCode}</InfoTile>
          <InfoTile label="Branch" locked highlighted={hl('financial.branchName')}>{financial.branchName}</InfoTile>
          <InfoTile label="Pay revisions" wide>
            {financial.payRevisions.length
              ? financial.payRevisions.map((p, i) => (
                  <div key={i}>
                    {money(p.previousPay)} → {money(p.newPay)} · effective {formatDate(p.effectiveDate)}
                  </div>
                ))
              : 'None'}
          </InfoTile>
          <InfoTile label="Appraisals" wide>
            {financial.appraisals.length
              ? financial.appraisals.map((a, i) => (
                  <div key={i}>
                    {a.appraisalWindow}: {a.outcome}
                  </div>
                ))
              : 'None'}
          </InfoTile>
        </Grid>
      ) : (
        <p className="text-caption text-secondary">Financial details are restricted.</p>
      )
    case 'System data':
      return (
        <Grid>
          <InfoTile label="Employee ID" locked>{employee.employeeId}</InfoTile>
          <InfoTile label="Status">{employee.employmentStatus === 'ACTIVE' ? 'Active' : 'Terminated'}</InfoTile>
          <InfoTile label="Created on">{dateTime(system.createdAt)}</InfoTile>
          <InfoTile label="Created by">{person(system.createdBy)}</InfoTile>
          <InfoTile label="Onboarding completed">{dateTime(system.onboardingCompletedAt)}</InfoTile>
          <InfoTile label="Last updated on">{dateTime(system.updatedAt)}</InfoTile>
          <InfoTile label="Last updated by">{person(system.lastUpdatedBy)}</InfoTile>
        </Grid>
      )
  }
}

/** Employee record (FR-11 to FR-14). Also serves /my-profile for the signed-in employee. */
export default function EmployeeDetailsPage({ self = false }: { self?: boolean }) {
  const params = useParams<{ employeeId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const saved = (location.state as SavedChangesState | null) ?? null
  const firstSavedSection = saved?.savedFields.map(sectionOfField)[0]

  const [section, setSection] = useState<EmployeeSection>(firstSavedSection ?? 'Personal')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(!!saved)
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
  const sections: EmployeeSection[] = [
    'Personal',
    'Communication',
    'Documents',
    'Employment',
    ...(employee.access.restrictedVisible ? (['Financial'] as EmployeeSection[]) : []),
    'System data',
  ]
  const changed = new Set(saved?.savedFields ?? [])
  const sectionWasUpdated = saved?.savedFields.some((key) => sectionOfField(key) === section)

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
      <div className="space-y-6 text-left w-full pb-24">
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
                <Button variant="primary" size="medium" onClick={() => navigate('/my-profile/change-requests/new')}>
                  Request a change
                </Button>
              )}
              {employee.access.canEdit && (
                <Button variant="primary" size="medium" onClick={() => navigate(`/employees/${employee.employeeId}/edit`)}>
                  Edit details
                </Button>
              )}
            </>
          }
        />

        <EmployeeSummaryCard employee={employee} />

        <SectionPills
          active={section}
          onSelect={setSection}
          available={sections}
          note={
            employee.access.restrictedVisible ? (
              <>
                <LockIcon /> Restricted details stay hidden until you choose Show
              </>
            ) : (
              <>
                <LockIcon /> Restricted details are not visible to you
              </>
            )
          }
        />

        {section === 'Documents' ? (
          <div className="space-y-2">
            {docError && <p className="text-caption text-error">{docError}</p>}
            <DocumentsPanel employee={employee} onOpen={openDocument} />
          </div>
        ) : (
          <div className="bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-h4 font-serif font-bold text-primary">{SECTION_TITLES[section]}</h3>
              <div className="flex items-center gap-4 text-caption text-secondary">
                {sectionWasUpdated && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FACC15]" /> Updated just now
                  </span>
                )}
                <button type="button" onClick={() => setHistoryOpen(true)} className="font-semibold text-primary cursor-pointer">
                  History
                </button>
              </div>
            </div>
            <SectionContent section={section} employee={employee} changed={changed} />
          </div>
        )}
      </div>

      {toastVisible && saved && (
        <Toast onClose={() => setToastVisible(false)}>
          <span>
            Changes saved · {saved.savedLabels.join(', ')} updated
          </span>
          <button
            type="button"
            onClick={() => {
              setToastVisible(false)
              setHistoryOpen(true)
            }}
            className="text-[#FACC15] font-semibold underline cursor-pointer"
          >
            View history
          </button>
        </Toast>
      )}

      <HistoryDrawer employeeId={employee.id} open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </AppLayout>
  )
}
