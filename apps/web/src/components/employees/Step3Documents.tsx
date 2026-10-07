import { useRef } from 'react'
import type { CreateEmployeePayload, QualificationLevel, PreviousOrgDocStatus, EmployeeBackground } from '../../api/types'

export interface Step3DocumentsProps {
  formData: CreateEmployeePayload
  updateFormData: (data: Partial<CreateEmployeePayload>) => void
  onNext: () => void
  onBack: () => void
}

export type DocumentCardState = 'missing' | 'uploading' | 'uploaded' | 'verified' | 'default'

interface DocumentCardProps {
  title: string
  subtitle?: string
  state?: DocumentCardState
  progress?: number
  fileName?: string
  dueDate?: string
  onFileSelect?: (file: File) => void
}

/**
 * Interactive Document Upload Card with hidden <input type="file" /> handler.
 */
export function DocumentCard({
  title,
  subtitle = 'Upload or take a photo',
  state = 'default',
  progress = 0,
  fileName,
  dueDate,
  onFileSelect,
  inputKey,
}: DocumentCardProps & { inputKey?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onFileSelect) {
      onFileSelect(file)
    }
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        id={inputKey ? `doc-input-${inputKey}` : undefined}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {state === 'uploading' && (
        <div
          onClick={handleClick}
          className="w-full min-h-[110px] bg-white border border-border-default rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 shadow-xs cursor-pointer select-none"
        >
          <div className="w-7 h-7 rounded-full border-2 border-[#1D4ED8] border-t-transparent animate-spin" />
          <div>
            <div className="text-caption font-bold text-primary">{title}</div>
            <div className="text-[11px] text-secondary font-medium">
              Uploading... {progress}%
            </div>
          </div>
        </div>
      )}

      {(state === 'uploaded' || state === 'verified') && (
        <div
          onClick={handleClick}
          className="w-full min-h-[110px] bg-white border border-border-default rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 shadow-xs cursor-pointer select-none hover:border-border-strong transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-bg-subtle text-primary flex items-center justify-center text-caption font-bold">
            📄
          </div>
          <div>
            <div className="text-caption font-bold text-primary">{title}</div>
            <div className="text-[11px] text-secondary truncate max-w-[140px]" title={fileName}>
              {fileName || 'document.pdf'}
            </div>
          </div>
        </div>
      )}

      {(state === 'default' || state === 'missing') && (
        <div
          onClick={handleClick}
          className="w-full min-h-[110px] border-2 border-dashed border-[#D4D4D8] bg-white/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1.5 hover:border-border-strong hover:bg-white/60 transition-colors cursor-pointer select-none"
        >
          <div className="text-body font-semibold text-secondary">+</div>
          <div>
            <div className="text-caption font-bold text-primary">{title}</div>
            <div
              className={`text-[11px] ${
                dueDate ? 'text-[#B42318] font-semibold' : 'text-secondary'
              }`}
            >
              {dueDate ? `Due by ${dueDate}` : subtitle}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Step3Documents({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step3DocumentsProps) {
  const qualification = (formData.highestQualification as QualificationLevel) || 'UG_DEGREE'
  const background = (formData.employeeBackground as EmployeeBackground) || 'FRESHER'
  const docStatus = (formData.previousOrgDocStatus as PreviousOrgDocStatus) || 'BOTH'

  const docFiles = formData.documentFiles || {}

  const getDocInfo = (key: string) => {
    return docFiles[key] || { status: 'missing' }
  }

  const handleUploadFile = (docKey: string, file: File) => {
    // Set to uploading state with progress
    updateFormData({
      documentFiles: {
        [docKey]: { status: 'uploading' as const, fileName: file.name, progress: 64 },
      },
    })

    // Simulate completion
    setTimeout(() => {
      updateFormData({
        documentFiles: {
          [docKey]: { status: 'uploaded' as const, fileName: file.name },
        },
      })
    }, 600)
  }

  const handleQualificationChange = (val: QualificationLevel) => {
    updateFormData({ highestQualification: val })
  }

  const handleBackgroundChange = (val: EmployeeBackground) => {
    updateFormData({ employeeBackground: val })
  }

  const handleDocStatusChange = (val: PreviousOrgDocStatus) => {
    updateFormData({ previousOrgDocStatus: val })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  // Education info banner text mapping
  const getEducationBannerText = () => {
    switch (qualification) {
      case 'TENTH':
        return "For 10th Standard we need: 10th mark sheet."
      case 'TWELFTH':
        return "For 12th Standard we need: 10th and 12th mark sheets."
      case 'UG_DEGREE':
        return "For a Bachelor's degree we need: degree certificate, 12th and 10th mark sheets."
      case 'PG_DEGREE':
        return "For a Master's degree we need: master's certificate, degree certificate, 12th and 10th mark sheets."
      default:
        return "Please upload your highest education certificates."
    }
  }

  // Dynamic 30-day due date calculation
  const getDynamicDueDate = (days = 30, baseDate?: string) => {
    const start = baseDate ? new Date(baseDate) : new Date()
    const target = new Date(start.getTime() + days * 24 * 60 * 60 * 1000)
    const day = target.getDate()
    const month = target.toLocaleString('en-US', { month: 'short' })
    const year = target.getFullYear()
    return `${day} ${month} ${year}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-h2 font-serif font-bold text-primary">Documents</h2>
        <p className="text-caption text-secondary font-medium">
          Take a clear photo of the front and back of each original document.
        </p>
      </div>

      {/* SECTION 1: IDENTITY */}
      <div className="space-y-3 pt-2">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          IDENTITY
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <DocumentCard
            inputKey="aadhaarFront"
            title="Aadhaar · Front"
            state={getDocInfo('aadhaarFront').status}
            fileName={getDocInfo('aadhaarFront').fileName}
            progress={getDocInfo('aadhaarFront').progress}
            onFileSelect={(file) => handleUploadFile('aadhaarFront', file)}
          />

          <DocumentCard
            inputKey="aadhaarBack"
            title="Aadhaar · Back"
            state={getDocInfo('aadhaarBack').status}
            fileName={getDocInfo('aadhaarBack').fileName}
            progress={getDocInfo('aadhaarBack').progress}
            onFileSelect={(file) => handleUploadFile('aadhaarBack', file)}
          />

          <DocumentCard
            inputKey="panFront"
            title="PAN · Front"
            state={getDocInfo('panFront').status}
            fileName={getDocInfo('panFront').fileName}
            progress={getDocInfo('panFront').progress}
            onFileSelect={(file) => handleUploadFile('panFront', file)}
          />

          <DocumentCard
            inputKey="drivingLicence"
            title="Driving licence · Front"
            state={getDocInfo('drivingLicence').status}
            fileName={getDocInfo('drivingLicence').fileName}
            progress={getDocInfo('drivingLicence').progress}
            onFileSelect={(file) => handleUploadFile('drivingLicence', file)}
          />
        </div>
      </div>

      {/* SECTION 2: EDUCATION */}
      <div className="space-y-4 pt-4 border-t border-border-default/50">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          EDUCATION
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
            <div className="space-y-1.5">
              <label className="block text-caption font-semibold text-secondary">
                Highest qualification <span className="text-error">*</span>
              </label>
              <select
                value={qualification}
                onChange={(e) => handleQualificationChange(e.target.value as QualificationLevel)}
                className="w-full px-3.5 py-2.5 bg-bg-default border border-border-default rounded-xl text-body-small text-primary outline-none focus:border-border-strong transition-colors"
              >
                <option value="UG_DEGREE">Bachelor's degree</option>
                <option value="PG_DEGREE">Master's degree</option>
                <option value="TWELFTH">12th Standard</option>
                <option value="TENTH">10th Standard</option>
              </select>
            </div>

            {/* Conditional Info Badge */}
            <div className="bg-[#EFF6FF] text-[#1D4ED8] rounded-xl px-3.5 py-2.5 text-caption font-medium flex items-center gap-2 border border-[#BFDBFE]">
              <span>ⓘ</span>
              <span>{getEducationBannerText()}</span>
            </div>
          </div>

          {/* Conditional Education Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
            <DocumentCard
              inputKey="10thMarkSheet"
              title="10th mark sheet"
              state={getDocInfo('10thMarkSheet').status}
              fileName={getDocInfo('10thMarkSheet').fileName}
              progress={getDocInfo('10thMarkSheet').progress}
              onFileSelect={(file) => handleUploadFile('10thMarkSheet', file)}
            />

            {(qualification === 'TWELFTH' || qualification === 'UG_DEGREE' || qualification === 'PG_DEGREE') && (
              <DocumentCard
                inputKey="12thMarkSheet"
                title="12th mark sheet"
                state={getDocInfo('12thMarkSheet').status}
                fileName={getDocInfo('12thMarkSheet').fileName}
                progress={getDocInfo('12thMarkSheet').progress}
                onFileSelect={(file) => handleUploadFile('12thMarkSheet', file)}
              />
            )}

            {(qualification === 'UG_DEGREE' || qualification === 'PG_DEGREE') && (
              <DocumentCard
                inputKey="degreeCertificate"
                title="Degree certificate"
                state={getDocInfo('degreeCertificate').status}
                fileName={getDocInfo('degreeCertificate').fileName}
                progress={getDocInfo('degreeCertificate').progress}
                onFileSelect={(file) => handleUploadFile('degreeCertificate', file)}
              />
            )}

            {qualification === 'PG_DEGREE' && (
              <DocumentCard
                inputKey="mastersCertificate"
                title="Master's certificate"
                state={getDocInfo('mastersCertificate').status}
                fileName={getDocInfo('mastersCertificate').fileName}
                progress={getDocInfo('mastersCertificate').progress}
                onFileSelect={(file) => handleUploadFile('mastersCertificate', file)}
              />
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: PREVIOUS EMPLOYMENT */}
      <div className="space-y-4 pt-4 border-t border-border-default/50">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-secondary">
          PREVIOUS EMPLOYMENT
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Work background pills */}
          <div className="space-y-2">
            <label className="block text-caption font-semibold text-secondary">
              Work background <span className="text-error">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'Experienced', value: 'EXPERIENCED' },
                { label: 'Fresher', value: 'FRESHER' },
                { label: 'Freelancer', value: 'FREELANCER' },
                { label: 'Entrepreneur', value: 'ENTREPRENEUR' },
              ].map((bg) => (
                <button
                  key={bg.value}
                  type="button"
                  onClick={() => handleBackgroundChange(bg.value as EmployeeBackground)}
                  className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer ${
                    background === bg.value
                      ? 'bg-[#18181B] text-white shadow-xs'
                      : 'bg-white border border-[#D4D4D8] text-secondary hover:text-primary'
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Documents from previous employer pills (only for Experienced) */}
          {background === 'EXPERIENCED' && (
            <div className="space-y-2">
              <label className="block text-caption font-semibold text-secondary">
                Documents from previous employer <span className="text-error">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: 'Both', value: 'BOTH' },
                  { label: 'Only one', value: 'ONE' },
                  { label: 'None yet', value: 'NONE' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleDocStatusChange(opt.value as PreviousOrgDocStatus)}
                    className={`px-4 py-2 rounded-full text-caption font-semibold transition-all cursor-pointer ${
                      docStatus === opt.value
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'bg-white border border-[#D4D4D8] text-secondary hover:text-primary'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conditional Previous Employment Upload Cards */}
        {background === 'EXPERIENCED' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <DocumentCard
              inputKey="relievingExperience"
              title="Relieving / Experience Letter"
              state={getDocInfo('relievingExperience').status}
              fileName={getDocInfo('relievingExperience').fileName}
              progress={getDocInfo('relievingExperience').progress}
              dueDate={
                getDocInfo('relievingExperience').status === 'missing'
                  ? getDynamicDueDate(30, formData.joiningDate)
                  : undefined
              }
              onFileSelect={(file) => handleUploadFile('relievingExperience', file)}
            />

            <DocumentCard
              inputKey="salarySlip"
              title="Salary slip"
              state={getDocInfo('salarySlip').status}
              fileName={getDocInfo('salarySlip').fileName}
              progress={getDocInfo('salarySlip').progress}
              onFileSelect={(file) => handleUploadFile('salarySlip', file)}
            />
          </div>
        )}

        {(background === 'FREELANCER' || background === 'ENTREPRENEUR') && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <DocumentCard
              inputKey="recordOfIncome"
              title="Income proof"
              subtitle="Bank statement or Tax returns"
              state={getDocInfo('recordOfIncome').status}
              fileName={getDocInfo('recordOfIncome').fileName}
              progress={getDocInfo('recordOfIncome').progress}
              onFileSelect={(file) => handleUploadFile('recordOfIncome', file)}
            />
          </div>
        )}

        {background === 'FRESHER' && (
          <div className="p-4 bg-bg-subtle/60 border border-border-default/60 rounded-2xl text-caption text-secondary font-medium">
            Fresher — no previous employer documents required.
          </div>
        )}

        {/* Bottom Banner */}
        <div className="bg-[#EFF6FF] text-[#1D4ED8] rounded-xl px-4 py-2.5 text-caption font-medium flex items-center gap-2 border border-[#BFDBFE]">
          <span>ⓘ</span>
          <span>
            {background === 'FRESHER'
              ? 'Fresher → no previous-employer documents required.'
              : background === 'EXPERIENCED'
              ? 'Previous employer documents can be submitted now or scheduled.'
              : 'Freelancer / Entrepreneur → income proof required instead.'}
          </span>
        </div>
      </div>

      {/* Form Bottom Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-border-default">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 bg-white border border-border-default rounded-xl text-caption font-semibold text-primary hover:bg-bg-subtle transition-colors cursor-pointer shadow-xs"
        >
          Back
        </button>

        <span className="text-caption text-secondary font-medium hidden sm:inline-block">
          <span className="text-[#047857]">✓</span> Saved automatically · 10:42 am
        </span>

        <button
          type="submit"
          className="px-6 py-2.5 bg-brand-accent text-primary text-caption font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
        >
          Continue to Employment
        </button>
      </div>
    </form>
  )
}
