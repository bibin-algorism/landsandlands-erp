import { useRef } from 'react'
import type { EmployeeBackground, QualificationLevel } from '../../api/types'
import {
  BACKGROUND_LABELS,
  QUALIFICATION_LABELS,
  SECOND_DOC_MAX_DAYS,
  SECOND_DOC_MIN_DAYS,
} from '../../constants/employee'
import { fileService } from '../../services/file.service'
import {
  PREVIOUS_ORG_DOC_LABELS,
  formatDate,
  pendingPreviousOrgDoc,
  requiredDocuments,
  secondDocDueDate,
  type DocKey,
  type EmployeeFormData,
  type PreviousOrgDoc,
  type RequiredDoc,
  type UploadedDoc,
} from './employeeForm'
import { ChoicePills, Field, SectionTitle, StepActions, StepHeader } from './FormControls'
import { inputClass } from './formStyles'
import { useStepValidation } from './useStepValidation'

export interface Step3DocumentsProps {
  formData: EmployeeFormData
  updateFormData: (data: Partial<EmployeeFormData>) => void
  onNext: () => void
  onBack: () => void
}

interface DocumentCardProps {
  title: string
  doc?: UploadedDoc
  error?: string
  onFileSelect: (file: File) => void
}

/**
 * Upload card with a hidden <input type="file" />. Accepts a photo or PDF of the original.
 */
export function DocumentCard({ title, doc, error, onFileSelect }: DocumentCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
    e.target.value = ''
  }

  const border =
    doc?.status === 'uploaded'
      ? 'border border-border-default bg-white'
      : error || doc?.status === 'error'
        ? 'border-2 border-dashed border-error bg-white/40'
        : 'border-2 border-dashed border-[#D4D4D8] bg-white/40'

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={doc?.status === 'uploading'}
        className={`w-full min-h-[110px] rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1.5 cursor-pointer select-none hover:border-border-strong transition-colors disabled:cursor-wait ${border}`}
      >
        {doc?.status === 'uploading' ? (
          <div className="w-6 h-6 rounded-full border-2 border-[#1D4ED8] border-t-transparent animate-spin" />
        ) : (
          <div className="text-body font-semibold text-secondary">{doc?.status === 'uploaded' ? '📄' : '+'}</div>
        )}
        <div className="text-caption font-bold text-primary">{title}</div>
        <div
          className={`text-[11px] truncate max-w-[160px] ${
            doc?.status === 'error' || (error && doc?.status !== 'uploaded') ? 'text-error font-semibold' : 'text-secondary'
          }`}
          title={doc?.fileName}
        >
          {doc?.status === 'uploading'
            ? 'Uploading…'
            : doc?.status === 'uploaded'
              ? doc.fileName
              : doc?.status === 'error'
                ? doc.error || 'Upload failed — tap to retry'
                : 'Upload or take a photo'}
        </div>
      </button>
    </div>
  )
}

const QUALIFICATION_OPTIONS = (Object.keys(QUALIFICATION_LABELS) as QualificationLevel[]).map((value) => ({
  value,
  label: QUALIFICATION_LABELS[value],
}))

const BACKGROUND_OPTIONS = (Object.keys(BACKGROUND_LABELS) as EmployeeBackground[]).map((value) => ({
  value,
  label: BACKGROUND_LABELS[value],
}))

export default function Step3Documents({
  formData,
  updateFormData,
  onNext,
  onBack,
}: Step3DocumentsProps) {
  const { errors, handleSubmit } = useStepValidation(3, formData, onNext)
  const docs = requiredDocuments(formData)
  const pendingDoc = pendingPreviousOrgDoc(formData)
  const dueDate = secondDocDueDate(formData)

  const handleUpload = async (key: DocKey, file: File) => {
    updateFormData({ documents: { [key]: { status: 'uploading', fileName: file.name } } })
    try {
      const uploaded = await fileService.uploadEmployeeDocument(file)
      updateFormData({
        documents: { [key]: { status: 'uploaded', fileName: uploaded.fileName, key: uploaded.key } },
      })
    } catch (err) {
      updateFormData({
        documents: {
          [key]: {
            status: 'error',
            fileName: file.name,
            error: err instanceof Error ? err.message : 'Upload failed',
          },
        },
      })
    }
  }

  const renderCards = (group: RequiredDoc['group']) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {docs
        .filter((doc) => doc.group === group)
        .map((doc) => (
          <DocumentCard
            key={doc.key}
            title={doc.label}
            doc={formData.documents[doc.key]}
            error={errors[`documents.${doc.key}`]}
            onFileSelect={(file) => handleUpload(doc.key, file)}
          />
        ))}
    </div>
  )

  const missingDocErrors = Object.entries(errors).filter(([field]) => field.startsWith('documents.'))

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 text-left">
      <StepHeader
        title="Documents"
        subtitle="Photograph the front and back of each original document (BR-04)."
      />

      {missingDocErrors.length > 0 && (
        <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-4 py-2.5 text-caption font-medium text-[#B42318]">
          {missingDocErrors.length} document{missingDocErrors.length > 1 ? 's are' : ' is'} still needed.
          Everything except a previous-employer document must be collected today.
        </div>
      )}

      {/* SECTION 1: IDENTITY (BRD 8.3 #2, #4) */}
      <div className="space-y-4 pt-2">
        <SectionTitle first>IDENTITY</SectionTitle>
        {renderCards('Identity')}
      </div>

      {/* SECTION 2: EDUCATION (FR-04, FR-05) */}
      <div className="space-y-4">
        <SectionTitle>EDUCATION</SectionTitle>
        <Field label="Highest qualification" error={errors.highestQualification}>
          <ChoicePills
            options={QUALIFICATION_OPTIONS}
            value={formData.highestQualification}
            onChange={(highestQualification) => updateFormData({ highestQualification })}
          />
        </Field>
        {formData.highestQualification && formData.highestQualification !== 'NONE' && (
          <>
            <p className="text-caption text-secondary">
              Documents are needed for the highest qualification and every qualification below it.
            </p>
            {renderCards('Education')}
          </>
        )}
      </div>

      {/* SECTION 3: PREVIOUS ORGANISATION (BR-05, FR-06, FR-07, FR-09) */}
      <div className="space-y-4">
        <SectionTitle>PREVIOUS ORGANISATION</SectionTitle>

        <Field label="Work background" error={errors.employeeBackground}>
          <ChoicePills
            options={BACKGROUND_OPTIONS}
            value={formData.employeeBackground}
            onChange={(employeeBackground) => updateFormData({ employeeBackground })}
          />
        </Field>

        {formData.employeeBackground === 'EXPERIENCED' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Documents provided today"
              error={errors.previousOrgDocStatus}
              hint="3 months' payslips and the relieving letter"
            >
              <ChoicePills
                options={[
                  { value: 'BOTH' as const, label: 'Both' },
                  { value: 'ONE' as const, label: 'Only one' },
                ]}
                value={formData.previousOrgDocStatus}
                onChange={(previousOrgDocStatus) => updateFormData({ previousOrgDocStatus })}
              />
            </Field>

            {formData.previousOrgDocStatus === 'ONE' && (
              <Field label="Which one is provided?" error={errors.providedPreviousOrgDoc}>
                <ChoicePills
                  options={(Object.keys(PREVIOUS_ORG_DOC_LABELS) as PreviousOrgDoc[]).map((value) => ({
                    value,
                    label: PREVIOUS_ORG_DOC_LABELS[value],
                  }))}
                  value={formData.providedPreviousOrgDoc}
                  onChange={(providedPreviousOrgDoc) => updateFormData({ providedPreviousOrgDoc })}
                />
              </Field>
            )}
          </div>
        )}

        {pendingDoc && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <Field
              label={`${PREVIOUS_ORG_DOC_LABELS[pendingDoc]} due (days after joining)`}
              htmlFor="secondDocDueInDays"
              error={errors.secondDocDueInDays}
              hint={
                dueDate
                  ? `Due by ${formatDate(dueDate)}. The record stays Incomplete until it arrives.`
                  : 'The due date is calculated once the joining date is set in Employment.'
              }
            >
              <input
                id="secondDocDueInDays"
                type="number"
                min={SECOND_DOC_MIN_DAYS}
                max={SECOND_DOC_MAX_DAYS}
                value={formData.secondDocDueInDays}
                onChange={(e) => updateFormData({ secondDocDueInDays: e.target.value })}
                className={inputClass(errors.secondDocDueInDays)}
              />
            </Field>
          </div>
        )}

        {renderCards('Previous organisation')}
        {renderCards('Income')}

        {formData.employeeBackground === 'FRESHER' && (
          <div className="p-4 bg-bg-subtle/60 border border-border-default/60 rounded-2xl text-caption text-secondary font-medium">
            Fresher — no previous organisation documents required.
          </div>
        )}
        {(formData.employeeBackground === 'FREELANCER' ||
          formData.employeeBackground === 'ENTREPRENEUR') && (
          <p className="text-caption text-secondary">
            A record of income (for example a bank statement or tax return) is required instead of
            previous organisation documents.
          </p>
        )}
      </div>

      <StepActions onBack={onBack} nextLabel="Continue to Employment" />
    </form>
  )
}
