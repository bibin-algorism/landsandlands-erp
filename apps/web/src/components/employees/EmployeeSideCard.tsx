import type { CreateEmployeePayload, CreateEmployeeResponse } from '../../api/types'

export interface EmployeeSideCardProps {
  currentStep: number
  formData: CreateEmployeePayload
  createdResponse: CreateEmployeeResponse | null
  isSignInSetUp: boolean
}

export default function EmployeeSideCard({
  currentStep,
  formData,
  createdResponse,
  isSignInSetUp,
}: EmployeeSideCardProps) {
  const firstName = formData.firstName || ''
  const lastName = formData.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim() || 'New Employee'

  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : firstName
      ? firstName.slice(0, 2).toUpperCase()
      : 'PR'

  if (currentStep === 3) {
    const docFiles = formData.documentFiles || {}
    const qual = formData.highestQualification || 'UG_DEGREE'
    const bg = formData.employeeBackground || 'FRESHER'

    const items: Array<{ key: string; label: string; dueDate?: string }> = [
      { key: 'aadhaarFront', label: 'Aadhaar (front & back)' },
      { key: 'panFront', label: 'PAN' },
      { key: 'drivingLicence', label: 'Driving licence' },
      { key: '10thMarkSheet', label: '10th mark sheet' },
    ]

    if (qual === 'TWELFTH' || qual === 'UG_DEGREE' || qual === 'PG_DEGREE') {
      items.push({ key: '12thMarkSheet', label: '12th mark sheet' })
    }
    if (qual === 'UG_DEGREE' || qual === 'PG_DEGREE') {
      items.push({ key: 'degreeCertificate', label: 'Degree certificate' })
    }
    if (qual === 'PG_DEGREE') {
      items.push({ key: 'mastersCertificate', label: "Master's certificate" })
    }

    if (bg === 'EXPERIENCED') {
      const target = new Date(
        (formData.joiningDate ? new Date(formData.joiningDate) : new Date()).getTime() +
          30 * 24 * 60 * 60 * 1000
      )
      const dueStr = `${target.getDate()} ${target.toLocaleString('en-US', { month: 'short' })}`
      items.push({ key: 'relievingExperience', label: 'Relieving / Experience Letter', dueDate: dueStr })
      items.push({ key: 'salarySlip', label: 'Salary slip' })
    } else if (bg === 'FREELANCER' || bg === 'ENTREPRENEUR') {
      items.push({ key: 'recordOfIncome', label: 'Income proof' })
    }

    const checklist = items.map((item) => {
      const doc = docFiles[item.key] || { status: 'missing' }
      return {
        key: item.key,
        label: item.label,
        status: doc.status,
        dueDate: item.dueDate,
      }
    })

    const uploadedCount = checklist.filter(
      (i) => i.status === 'uploaded' || i.status === 'verified'
    ).length

    return (
      <div className="lg:col-span-4 bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 space-y-6 shadow-xs sticky top-6">
        <h3 className="text-h3 font-serif font-bold text-primary">Document checklist</h3>

        <div className="flex items-center justify-between text-caption font-semibold border-b border-border-default/60 pb-3">
          <span className="text-secondary">
            {uploadedCount} of {checklist.length} uploaded
          </span>
        </div>

        <div className="space-y-3 text-caption">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-primary font-medium">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.status === 'uploaded' || item.status === 'verified'
                      ? 'bg-[#047857]'
                      : item.status === 'uploading'
                      ? 'bg-[#F59E0B]'
                      : 'bg-[#B42318]'
                  }`}
                />
                {item.label}
              </span>
              {item.status === 'uploaded' || item.status === 'verified' ? (
                <span className="font-semibold text-[#047857]">uploaded</span>
              ) : item.status === 'uploading' ? (
                <span className="font-semibold text-[#F59E0B]">uploading...</span>
              ) : item.dueDate ? (
                <span className="font-semibold text-[#B42318]">Due {item.dueDate}</span>
              ) : (
                <span className="font-semibold text-[#B42318]">missing</span>
              )}
            </div>
          ))}
        </div>

        <div className="bg-bg-subtle/70 border border-border-default/50 rounded-2xl p-4 space-y-1 text-left">
          <div className="text-caption font-bold text-primary">Can't collect everything today?</div>
          <p className="text-[12px] text-secondary leading-snug">
            Previous-employer documents can come later — they get a due date. Everything else is needed on the joining day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-4 bg-[#ffffffc7] backdrop-blur-xs border border-border-default/80 rounded-3xl p-6 space-y-6 shadow-xs sticky top-6">
      {/* Card Header */}
      <h3 className="text-h3 font-serif font-bold text-primary">
        {currentStep === 7 ? 'Done' : 'New employee'}
      </h3>

      {/* Avatar + Subtitle */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-caption flex items-center justify-center shadow-xs shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-body-small font-bold text-primary">{fullName}</div>
          <div className="text-[12px] text-secondary font-medium">
            {currentStep === 7 ? (
              <>
                <span className="font-bold">{createdResponse?.employeeId || 'LL-7K2Q9'}</span> · Incomplete
              </>
            ) : (
              'ID is created when you finish'
            )}
          </div>
        </div>
      </div>

      {/* Key Value Table */}
      <div className="space-y-3 pt-2 text-caption border-t border-border-default/60">
        <div className="flex items-center justify-between">
          <span className="text-secondary font-medium">Name</span>
          <span className="text-primary font-semibold">{fullName}</span>
        </div>

        {currentStep === 1 ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Date of birth</span>
              <span className="text-primary font-semibold">{formData.dateOfBirth || '—'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Aadhaar</span>
              <span className="text-[#047857] font-semibold flex items-center gap-1">
                {formData.aadhaarNumber ? 'No duplicate ✓' : 'Pending'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">PAN</span>
              <span className="text-primary font-semibold">{formData.panNumber || '—'}</span>
            </div>
          </>
        ) : currentStep === 2 ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Personal phone</span>
              <span className="text-primary font-semibold">{formData.personalPhone || '—'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Current city</span>
              <span className="text-primary font-semibold">
                {formData.currentAddress
                  ? formData.currentAddress.split(',').pop()?.trim() || '—'
                  : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Emergency contact</span>
              <span className="text-primary font-semibold">
                {formData.emergencyContacts && formData.emergencyContacts[0]
                  ? `${formData.emergencyContacts[0].name} (${formData.emergencyContacts[0].relationship})`
                  : 'None added'}
              </span>
            </div>
          </>
        ) : currentStep === 4 ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Role</span>
              <span className="text-primary font-semibold">
                {formData.role === 'EXECUTIVE'
                  ? 'Sales executive'
                  : formData.role === 'VERTICAL_HEAD'
                  ? 'Vertical Head'
                  : formData.role || '—'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Vertical</span>
              <span className="text-primary font-semibold">{formData.vertical || '—'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Reports to</span>
              <span className="text-primary font-semibold">
                {formData.reportingAuthorityId || '—'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Joining date</span>
              <span className="text-primary font-semibold">
                {formData.joiningDate
                  ? (() => {
                      try {
                        const d = new Date(formData.joiningDate)
                        return isNaN(d.getTime())
                          ? formData.joiningDate
                          : `${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`
                      } catch {
                        return formData.joiningDate
                      }
                    })()
                  : '—'}
              </span>
            </div>
          </>
        ) : currentStep === 5 ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Take-home pay</span>
              <span className="text-primary font-bold">
                {formData.takeHomePayTotal
                  ? `₹${formData.takeHomePayTotal.toLocaleString('en-IN')} / mo`
                  : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Paid via</span>
              <span className="text-primary font-semibold">
                {!formData.cashComponent || formData.cashComponent === 0
                  ? '100% Bank transfer'
                  : formData.cashComponent === formData.takeHomePayTotal
                  ? '100% Cash'
                  : 'Split (Bank + Cash)'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Bank account</span>
              <span className="text-primary font-semibold">
                {formData.accountNumber
                  ? `${formData.ifscCode?.toUpperCase().startsWith('HDFC') ? 'HDFC' : 'Bank'} ****${formData.accountNumber.slice(-4)}`
                  : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Probation ends</span>
              <span className="text-primary font-semibold">
                {(() => {
                  const months = parseInt(formData.probationPeriod || '6', 10) || 6
                  const start = formData.joiningDate ? new Date(formData.joiningDate) : new Date()
                  const target = new Date(start)
                  target.setMonth(target.getMonth() + months)
                  return `${target.getDate()} ${target.toLocaleString('en-US', { month: 'short' })} ${target.getFullYear()}`
                })()}
              </span>
            </div>
          </>
        ) : currentStep === 6 ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Employee ID</span>
              <span className="text-primary font-semibold">Created on finish</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Status after create</span>
              <span className="text-primary font-semibold">
                {(() => {
                  const docFiles = formData.documentFiles || {}
                  const qual = formData.highestQualification || 'UG_DEGREE'
                  const bg = formData.employeeBackground || 'FRESHER'
                  const items = ['aadhaarFront', 'panFront', 'drivingLicence', '10thMarkSheet']
                  if (qual === 'TWELFTH' || qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('12thMarkSheet')
                  if (qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('degreeCertificate')
                  if (qual === 'PG_DEGREE') items.push('mastersCertificate')
                  if (bg === 'EXPERIENCED') items.push('relievingExperience', 'salarySlip')
                  else if (bg === 'FREELANCER' || bg === 'ENTREPRENEUR') items.push('recordOfIncome')

                  const missing = items.filter(
                    (k) => docFiles[k]?.status !== 'uploaded' && docFiles[k]?.status !== 'verified'
                  ).length
                  return missing > 0 ? 'Incomplete' : 'Active'
                })()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Documents</span>
              <span className="text-primary font-semibold">
                {(() => {
                  const docFiles = formData.documentFiles || {}
                  const qual = formData.highestQualification || 'UG_DEGREE'
                  const bg = formData.employeeBackground || 'FRESHER'
                  const items = ['aadhaarFront', 'panFront', 'drivingLicence', '10thMarkSheet']
                  if (qual === 'TWELFTH' || qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('12thMarkSheet')
                  if (qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('degreeCertificate')
                  if (qual === 'PG_DEGREE') items.push('mastersCertificate')
                  if (bg === 'EXPERIENCED') items.push('relievingExperience', 'salarySlip')
                  else if (bg === 'FREELANCER' || bg === 'ENTREPRENEUR') items.push('recordOfIncome')

                  const uploaded = items.filter(
                    (k) => docFiles[k]?.status === 'uploaded' || docFiles[k]?.status === 'verified'
                  ).length
                  return `${uploaded} of ${items.length}`
                })()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Sign-in</span>
              <span className="text-primary font-semibold">Set up next</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Documents due</span>
              <span className="text-primary font-semibold">
                {(() => {
                  const start = formData.joiningDate ? new Date(formData.joiningDate) : new Date()
                  const target = new Date(start)
                  target.setDate(target.getDate() + 30)
                  return `${target.getDate()} ${target.toLocaleString('en-US', { month: 'short' })} ${target.getFullYear()}`
                })()}
              </span>
            </div>
          </>
        ) : currentStep === 7 ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Employee ID</span>
              <span className="text-primary font-semibold">{createdResponse?.employeeId || 'LL-7K2Q9'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Status</span>
              <span className="text-primary font-semibold">
                {(() => {
                  const docFiles = formData.documentFiles || {}
                  const qual = formData.highestQualification || 'UG_DEGREE'
                  const bg = formData.employeeBackground || 'FRESHER'
                  const items = ['aadhaarFront', 'panFront', 'drivingLicence', '10thMarkSheet']
                  if (qual === 'TWELFTH' || qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('12thMarkSheet')
                  if (qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('degreeCertificate')
                  if (qual === 'PG_DEGREE') items.push('mastersCertificate')
                  if (bg === 'EXPERIENCED') items.push('relievingExperience', 'salarySlip')
                  else if (bg === 'FREELANCER' || bg === 'ENTREPRENEUR') items.push('recordOfIncome')

                  const missing = items.filter(
                    (k) => docFiles[k]?.status !== 'uploaded' && docFiles[k]?.status !== 'verified'
                  ).length
                  return missing > 0 ? 'Incomplete' : 'Active'
                })()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Documents</span>
              <span className="text-primary font-semibold">
                {(() => {
                  const docFiles = formData.documentFiles || {}
                  const qual = formData.highestQualification || 'UG_DEGREE'
                  const bg = formData.employeeBackground || 'FRESHER'
                  const items = ['aadhaarFront', 'panFront', 'drivingLicence', '10thMarkSheet']
                  if (qual === 'TWELFTH' || qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('12thMarkSheet')
                  if (qual === 'UG_DEGREE' || qual === 'PG_DEGREE') items.push('degreeCertificate')
                  if (qual === 'PG_DEGREE') items.push('mastersCertificate')
                  if (bg === 'EXPERIENCED') items.push('relievingExperience', 'salarySlip')
                  else if (bg === 'FREELANCER' || bg === 'ENTREPRENEUR') items.push('recordOfIncome')

                  const uploaded = items.filter(
                    (k) => docFiles[k]?.status === 'uploaded' || docFiles[k]?.status === 'verified'
                  ).length
                  return `${uploaded} of ${items.length}`
                })()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary font-medium">Sign-in</span>
              <span className={isSignInSetUp ? 'text-[#047857] font-semibold' : 'text-primary font-semibold'}>
                {isSignInSetUp ? 'Credentials generated ✓' : 'Not set up yet'}
              </span>
            </div>
          </>
        ) : null}
      </div>

      {/* Bottom Info Box */}
      <div className="bg-bg-subtle/70 border border-border-default/50 rounded-2xl p-4 space-y-1 text-left">
        {currentStep === 1 ? (
          <>
            <div className="text-caption font-bold text-primary">Have these ready</div>
            <p className="text-[12px] text-secondary leading-snug">
              Original Aadhaar, PAN and a photo of the employee. Documents are photographed in Step 3.
            </p>
          </>
        ) : currentStep === 2 ? (
          <>
            <div className="text-caption font-bold text-primary">Official phone & email</div>
            <p className="text-[12px] text-secondary leading-snug">
              Official credentials are set in Step 4 once the business vertical & role are defined.
            </p>
          </>
        ) : currentStep === 4 ? (
          <>
            <div className="text-caption font-bold text-primary">Reporting line matters</div>
            <p className="text-[12px] text-secondary leading-snug">
              {formData.reportingAuthorityId === 'LL-7K2Q9' ? 'Karthik' : 'Arun'} will see {formData.firstName || 'Priya'} in "My team". Restricted details stay hidden from him.
            </p>
          </>
        ) : currentStep === 5 ? (
          <>
            <div className="text-caption font-bold text-primary">Private information</div>
            <p className="text-[12px] text-secondary leading-snug">
              Pay and bank details are restricted. Vertical heads and colleagues never see them.
            </p>
          </>
        ) : currentStep === 7 ? (
          <>
            <div className="text-caption font-bold text-primary">Recorded</div>
            <p className="text-[12px] text-secondary leading-snug">
              Created by Deepa N on 30 Sep 2026, 11:05 am. Saved to the Audit & Edit Trail.
            </p>
          </>
        ) : (
          <>
            <div className="text-caption font-bold text-primary">What happens next</div>
            <p className="text-[12px] text-secondary leading-snug">
              An Employee ID (LL-XXXXX) is generated and can't be changed. Then you can set up {formData.firstName || 'Priya'}'s sign-in.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
