import { useState } from 'react'
import type { FieldMeta, QualificationLevel } from '../../../api/types'
import { QUALIFICATION_LABELS, RELATIONSHIPS } from '../../../constants/employee'
import { useEmployees } from '../../../hooks/useEmployees'
import { fileService } from '../../../services/file.service'
import { EDUCATION_DOCS, formatRupees } from '../employeeForm'
import { ChoicePills, Field, SelectInput } from '../FormControls'
import { inputClass } from '../formStyles'
import { DocumentCard } from '../Step3Documents'
import type { UploadedDoc } from '../employeeForm'

type Value = Record<string, unknown>

interface EditorProps {
  field: FieldMeta
  value: unknown
  onChange: (value: unknown) => void
  /** Employee being edited, excluded from the reporting-authority list. */
  employeeId?: string
}

/** Upload slots keyed by name; each resolves to a storage key. */
function useUploads() {
  const [uploads, setUploads] = useState<Record<string, UploadedDoc>>({})
  const upload = async (slot: string, file: File, onKey: (key: string) => void) => {
    setUploads((prev) => ({ ...prev, [slot]: { status: 'uploading', fileName: file.name } }))
    try {
      const res = await fileService.uploadEmployeeDocument(file)
      setUploads((prev) => ({ ...prev, [slot]: { status: 'uploaded', fileName: res.fileName, key: res.key } }))
      onKey(res.key)
    } catch (err) {
      setUploads((prev) => ({
        ...prev,
        [slot]: { status: 'error', fileName: file.name, error: err instanceof Error ? err.message : 'Upload failed' },
      }))
    }
  }
  /** Card state: a fresh upload, or "uploaded" when the value already holds a stored document. */
  const docFor = (slot: string, existingKey?: string): UploadedDoc | undefined =>
    uploads[slot] ?? (existingKey ? { status: 'uploaded', fileName: 'Current document', key: existingKey } : undefined)
  return { upload, docFor }
}

function ContactsEditor({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const contacts = (value as { name: string; relationship: string; phone: string }[]) ?? []
  const set = (i: number, key: string, v: string) =>
    onChange(contacts.map((c, idx) => (idx === i ? { ...c, [key]: v } : c)))
  return (
    <div className="space-y-3">
      {contacts.map((c, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
          <Field label={`Contact ${i + 1} · Name`}>
            <input value={c.name} onChange={(e) => set(i, 'name', e.target.value)} className={inputClass()} />
          </Field>
          <Field label="Relationship">
            <SelectInput
              value={c.relationship}
              onChange={(v) => set(i, 'relationship', v)}
              placeholder="Select"
              options={RELATIONSHIPS}
            />
          </Field>
          <Field label="Phone">
            <input type="tel" value={c.phone} onChange={(e) => set(i, 'phone', e.target.value)} className={inputClass()} />
          </Field>
          <button
            type="button"
            disabled={contacts.length === 1}
            onClick={() => onChange(contacts.filter((_, idx) => idx !== i))}
            className="px-3 py-2.5 text-caption font-semibold text-secondary hover:text-error cursor-pointer disabled:invisible"
          >
            Remove
          </button>
        </div>
      ))}
      {contacts.length < 3 && (
        <button
          type="button"
          onClick={() => onChange([...contacts, { name: '', relationship: '', phone: '' }])}
          className="text-caption font-bold text-primary cursor-pointer"
        >
          + Add another contact
        </button>
      )}
    </div>
  )
}

function DocumentPairEditor({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const pair = (value as { front?: string; back?: string }) ?? {}
  const { upload, docFor } = useUploads()
  return (
    <div className="grid grid-cols-2 gap-3 max-w-md">
      {(['front', 'back'] as const).map((side) => (
        <DocumentCard
          key={side}
          title={side === 'front' ? 'Front' : 'Back'}
          doc={docFor(side, pair[side])}
          onFileSelect={(file) => upload(side, file, (key) => onChange({ ...pair, [side]: key }))}
        />
      ))}
    </div>
  )
}

const LEVELS: QualificationLevel[] = ['NONE', 'TENTH', 'TWELFTH', 'UG_DEGREE', 'PG_DEGREE']

function EducationEditor({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const v = (value as { highestQualification: QualificationLevel; documents: { qualificationLevel: QualificationLevel; front?: string; back?: string }[] }) ?? {
    highestQualification: 'NONE' as QualificationLevel,
    documents: [],
  }
  const { upload, docFor } = useUploads()
  const required = LEVELS.slice(1, LEVELS.indexOf(v.highestQualification) + 1) as Exclude<QualificationLevel, 'NONE'>[]
  const docOf = (level: QualificationLevel) => v.documents.find((d) => d.qualificationLevel === level)

  const setLevel = (highestQualification: QualificationLevel) => {
    const keep = LEVELS.slice(1, LEVELS.indexOf(highestQualification) + 1)
    onChange({ highestQualification, documents: v.documents.filter((d) => keep.includes(d.qualificationLevel)) })
  }
  const setDoc = (level: QualificationLevel, side: 'front' | 'back', key: string) => {
    const existing = docOf(level) ?? { qualificationLevel: level }
    onChange({
      ...v,
      documents: [...v.documents.filter((d) => d.qualificationLevel !== level), { ...existing, [side]: key }],
    })
  }

  return (
    <div className="space-y-3">
      <ChoicePills
        options={LEVELS.map((l) => ({ value: l, label: QUALIFICATION_LABELS[l] }))}
        value={v.highestQualification}
        onChange={setLevel}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {required.flatMap((level) =>
          (['front', 'back'] as const).map((side) => (
            <DocumentCard
              key={`${level}-${side}`}
              title={`${EDUCATION_DOCS[level].label} · ${side}`}
              doc={docFor(`${level}-${side}`, docOf(level)?.[side])}
              onFileSelect={(file) => upload(`${level}-${side}`, file, (key) => setDoc(level, side, key))}
            />
          )),
        )}
      </div>
    </div>
  )
}

function ProbationEditor({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const v = value as Value
  return (
    <div className="space-y-3">
      <ChoicePills
        options={[
          { value: 'yes' as const, label: 'On probation' },
          { value: 'no' as const, label: 'Not on probation' },
        ]}
        value={v.onProbation ? 'yes' : 'no'}
        onChange={(choice) =>
          onChange(
            choice === 'yes'
              ? { onProbation: true, probationPeriod: v.probationPeriod ?? '', financialAgreement: v.financialAgreement ?? '' }
              : { onProbation: false, probationPeriod: null, financialAgreement: null },
          )
        }
      />
      {Boolean(v.onProbation) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Probation period">
            <input
              value={String(v.probationPeriod ?? '')}
              onChange={(e) => onChange({ ...v, probationPeriod: e.target.value })}
              placeholder="e.g. 6 months"
              className={inputClass()}
            />
          </Field>
          <Field label="Financial agreement">
            <input
              value={String(v.financialAgreement ?? '')}
              onChange={(e) => onChange({ ...v, financialAgreement: e.target.value })}
              className={inputClass()}
            />
          </Field>
        </div>
      )}
    </div>
  )
}

function PayEditor({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const v = value as { takeHomePayTotal: number; bankComponent: number; cashComponent: number; effectiveDate: string }
  const num = (s: string) => Number(s.replace(/\D/g, '') || 0)
  const matches = v.bankComponent + v.cashComponent === v.takeHomePayTotal
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Field label="Take-home pay (₹)">
          <input
            inputMode="numeric"
            value={v.takeHomePayTotal}
            onChange={(e) => onChange({ ...v, takeHomePayTotal: num(e.target.value), bankComponent: Math.max(num(e.target.value) - v.cashComponent, 0) })}
            className={inputClass()}
          />
        </Field>
        <Field label="Bank (₹)">
          <input inputMode="numeric" value={v.bankComponent} onChange={(e) => onChange({ ...v, bankComponent: num(e.target.value) })} className={inputClass(matches ? undefined : 'x')} />
        </Field>
        <Field label="Cash (₹)">
          <input inputMode="numeric" value={v.cashComponent} onChange={(e) => onChange({ ...v, cashComponent: num(e.target.value) })} className={inputClass(matches ? undefined : 'x')} />
        </Field>
        <Field label="Effective from">
          <input type="date" value={v.effectiveDate} onChange={(e) => onChange({ ...v, effectiveDate: e.target.value })} className={inputClass()} />
        </Field>
      </div>
      {!matches && (
        <p className="text-[11px] font-medium text-error">
          Bank {formatRupees(v.bankComponent)} + cash {formatRupees(v.cashComponent)} must equal {formatRupees(v.takeHomePayTotal)}
        </p>
      )}
    </div>
  )
}

function AppraisalEditor({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const v = value as { nextAppraisalWindow: string; completedWindow: string; outcome: string }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Field label="Next appraisal window">
        <input type="date" value={v.nextAppraisalWindow} onChange={(e) => onChange({ ...v, nextAppraisalWindow: e.target.value })} className={inputClass()} />
      </Field>
      <Field label="Completed appraisal (optional)" required={false}>
        <input value={v.completedWindow} onChange={(e) => onChange({ ...v, completedWindow: e.target.value })} placeholder="e.g. Oct 2026" className={inputClass()} />
      </Field>
      <Field label="Outcome (optional)" required={false}>
        <input value={v.outcome} onChange={(e) => onChange({ ...v, outcome: e.target.value })} placeholder="e.g. 10% raise" className={inputClass()} />
      </Field>
    </div>
  )
}

function EmployeeRefEditor({ value, onChange, employeeId }: { value: unknown; onChange: (v: unknown) => void; employeeId?: string }) {
  const { data, isLoading } = useEmployees()
  const options = (data ?? [])
    .filter((e) => e.employmentStatus === 'ACTIVE' && e.id !== employeeId)
    .map((e) => ({ value: e.id, label: `${e.firstName} ${e.lastName} · ${e.employeeId}` }))
  return (
    <SelectInput
      value={String(value ?? '')}
      onChange={onChange}
      placeholder={isLoading ? 'Loading employees…' : 'Select reporting authority'}
      options={options}
    />
  )
}

/** Editor for one catalogue field, chosen by its type. */
export default function FieldEditor({ field, value, onChange, employeeId }: EditorProps) {
  switch (field.type) {
    case 'contacts':
      return <ContactsEditor value={value} onChange={onChange} />
    case 'documentPair':
      return <DocumentPairEditor value={value} onChange={onChange} />
    case 'education':
      return <EducationEditor value={value} onChange={onChange} />
    case 'probation':
      return <ProbationEditor value={value} onChange={onChange} />
    case 'pay':
      return <PayEditor value={value} onChange={onChange} />
    case 'appraisal':
      return <AppraisalEditor value={value} onChange={onChange} />
    case 'employeeRef':
      return <EmployeeRefEditor value={value} onChange={onChange} employeeId={employeeId} />
    case 'select':
      return (
        <SelectInput value={String(value ?? '')} onChange={onChange} placeholder={`Select ${field.label.toLowerCase()}`} options={field.options ?? []} />
      )
    case 'longText':
      return <textarea rows={2} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={inputClass()} />
    case 'date':
      return <input type="date" value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={inputClass()} />
    default: {
      const upper = field.type === 'ifsc' || field.type === 'licence'
      return (
        <input
          type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
          inputMode={['aadhaar', 'accountNumber', 'phone'].includes(field.type) ? 'numeric' : undefined}
          value={String(value ?? '')}
          onChange={(e) => onChange(upper ? e.target.value.toUpperCase() : e.target.value)}
          className={`${inputClass()} ${upper ? 'uppercase' : ''}`}
        />
      )
    }
  }
}
