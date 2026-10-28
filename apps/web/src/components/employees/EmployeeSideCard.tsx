import type { ReactNode } from 'react'
import type { CreateEmployeeResponse } from '../../api/types'
import { ROLE_LABELS } from '../../constants/employee'
import {
  PREVIOUS_ORG_DOC_LABELS,
  digitsOnly,
  formatDate,
  formatRupees,
  isDocUploaded,
  pendingPreviousOrgDoc,
  requiredDocuments,
  secondDocDueDate,
  toRupees,
  type EmployeeFormData,
} from './employeeForm'

export interface EmployeeSideCardProps {
  currentStep: number
  formData: EmployeeFormData
  managerName?: string
  createdResponse: CreateEmployeeResponse | null
  isSignInSetUp: boolean
}

const CARD_CLASS =
  'lg:col-span-4 bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 space-y-6 shadow-xs sticky top-6'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-secondary font-medium shrink-0">{label}</span>
      <span className="text-primary font-semibold text-right truncate">{children}</span>
    </div>
  )
}

function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-bg-subtle/70 border border-border-default/50 rounded-2xl p-4 space-y-1 text-left">
      <div className="text-caption font-bold text-primary">{title}</div>
      <p className="text-[12px] text-secondary leading-snug">{children}</p>
    </div>
  )
}

export default function EmployeeSideCard({
  currentStep,
  formData,
  managerName,
  createdResponse,
  isSignInSetUp,
}: EmployeeSideCardProps) {
  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'New employee'
  const initials =
    fullName === 'New employee'
      ? '—'
      : `${formData.firstName[0] ?? ''}${formData.lastName[0] ?? ''}`.toUpperCase()

  const docs = requiredDocuments(formData)
  const uploadedCount = docs.filter((doc) => isDocUploaded(formData, doc.key)).length
  const pendingDoc = pendingPreviousOrgDoc(formData)
  const dueDate = secondDocDueDate(formData)

  if (currentStep === 3) {
    return (
      <div className={CARD_CLASS}>
        <h3 className="text-h3 font-serif font-bold text-primary">Document checklist</h3>

        <div className="text-caption font-semibold text-secondary border-b border-border-default/60 pb-3">
          {uploadedCount} of {docs.length} uploaded
        </div>

        <div className="space-y-3 text-caption">
          {docs.map((doc) => {
            const state = formData.documents[doc.key]
            const uploaded = isDocUploaded(formData, doc.key)
            return (
              <div key={doc.key} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-primary font-medium">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      uploaded ? 'bg-[#047857]' : state?.status === 'uploading' ? 'bg-[#F59E0B]' : 'bg-[#B42318]'
                    }`}
                  />
                  {doc.label}
                </span>
                <span
                  className={`font-semibold ${
                    uploaded ? 'text-[#047857]' : state?.status === 'uploading' ? 'text-[#F59E0B]' : 'text-[#B42318]'
                  }`}
                >
                  {uploaded ? 'uploaded' : state?.status === 'uploading' ? 'uploading…' : 'missing'}
                </span>
              </div>
            )
          })}
          {pendingDoc && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-primary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                {PREVIOUS_ORG_DOC_LABELS[pendingDoc]}
              </span>
              <span className="font-semibold text-[#B45309]">
                {dueDate ? `due ${formatDate(dueDate)}` : 'due later'}
              </span>
            </div>
          )}
        </div>

        <InfoBox title="Can't collect everything today?">
          Only a previous-employer document can come later — it gets a due date 2 weeks to 1 month after
          joining. Everything else is needed on the joining day.
        </InfoBox>
      </div>
    )
  }

  const total = toRupees(formData.takeHomePayTotal)
  const cash = toRupees(formData.cashComponent)

  return (
    <div className={CARD_CLASS}>
      <h3 className="text-h3 font-serif font-bold text-primary">
        {currentStep === 7 ? 'Done' : 'New employee'}
      </h3>

      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-caption flex items-center justify-center shadow-xs shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-body-small font-bold text-primary">{fullName}</div>
          <div className="text-[12px] text-secondary font-medium">
            {createdResponse ? (
              <>
                <span className="font-bold">{createdResponse.employeeId}</span> ·{' '}
                {createdResponse.isIncomplete ? 'Incomplete' : 'Active'}
              </>
            ) : (
              'ID is created when you finish'
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2 text-caption border-t border-border-default/60">
        {currentStep === 1 && (
          <>
            <Row label="Date of birth">{formatDate(formData.dateOfBirth)}</Row>
            <Row label="Aadhaar">
              {formData.aadhaarNumber ? `••••${digitsOnly(formData.aadhaarNumber).slice(-4)}` : '—'}
            </Row>
            <Row label="Driving licence">{formData.drivingLicenceNumber || '—'}</Row>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Row label="Personal phone">{formData.personalPhone || '—'}</Row>
            <Row label="Official email">{formData.officialEmail || '—'}</Row>
            <Row label="Emergency contact">
              {formData.emergencyContacts[0]?.name
                ? `${formData.emergencyContacts[0].name} (${formData.emergencyContacts[0].relationship || '—'})`
                : '—'}
            </Row>
          </>
        )}
        {currentStep === 4 && (
          <>
            <Row label="Role">{formData.role ? ROLE_LABELS[formData.role] : '—'}</Row>
            <Row label="Vertical">{formData.vertical || '—'}</Row>
            <Row label="Reports to">
              {formData.role === 'MANAGING_DIRECTOR' ? 'No one (MD)' : managerName || '—'}
            </Row>
            <Row label="Joining date">{formatDate(formData.joiningDate)}</Row>
          </>
        )}
        {currentStep === 5 && (
          <>
            <Row label="Take-home pay">{Number.isInteger(total) ? `${formatRupees(total)} / mo` : '—'}</Row>
            <Row label="Paid via">
              {!Number.isInteger(total) || !Number.isInteger(cash)
                ? '—'
                : cash === 0
                  ? 'Bank transfer'
                  : cash === total
                    ? 'Cash'
                    : 'Bank + cash'}
            </Row>
            <Row label="IFSC">{formData.ifscCode || '—'}</Row>
          </>
        )}
        {(currentStep === 6 || currentStep === 7) && (
          <>
            <Row label="Documents">
              {uploadedCount} of {docs.length}
            </Row>
            <Row label="Status">
              {createdResponse
                ? createdResponse.isIncomplete
                  ? 'Incomplete'
                  : 'Active'
                : pendingDoc
                  ? 'Incomplete'
                  : 'Active'}
            </Row>
            {pendingDoc && <Row label="Document due">{formatDate(dueDate)}</Row>}
            <Row label="Sign-in">
              {currentStep === 6 ? 'Set up after create' : isSignInSetUp ? 'Credentials shared ✓' : 'Not set up yet'}
            </Row>
          </>
        )}
      </div>

      {currentStep === 1 && (
        <InfoBox title="Have these ready">
          Original Aadhaar and driving licence, education certificates and previous-employer documents. Each
          one is photographed in Documents.
        </InfoBox>
      )}
      {currentStep === 2 && (
        <InfoBox title="Emergency contacts">At least one and up to three contacts are required.</InfoBox>
      )}
      {currentStep === 4 && (
        <InfoBox title="Reporting line matters">
          The reporting authority sees this employee in their team. Restricted details stay hidden from them.
        </InfoBox>
      )}
      {currentStep === 5 && (
        <InfoBox title="Restricted information">
          Pay and bank details are visible only to HR, the MD, the COO and the employee.
        </InfoBox>
      )}
      {currentStep === 6 && (
        <InfoBox title="What happens next">
          An Employee ID (LL-XXXXX) is generated and can never be changed. Then you can share the sign-in.
        </InfoBox>
      )}
      {currentStep === 7 && (
        <InfoBox title="Recorded">Onboarding is saved to the Audit & Edit Trail.</InfoBox>
      )}
    </div>
  )
}
