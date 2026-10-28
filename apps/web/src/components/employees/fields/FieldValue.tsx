import type { FieldMeta } from '../../../api/types'
import { QUALIFICATION_LABELS } from '../../../constants/employee'
import { useEmployees } from '../../../hooks/useEmployees'
import { formatDate, formatRupees } from '../employeeForm'
import { fileKeysOf } from './fieldEditing'

type Value = Record<string, unknown>

function EmployeeName({ id }: { id: string }) {
  const { data } = useEmployees()
  const emp = data?.find((e) => e.id === id)
  return <>{emp ? `${emp.firstName} ${emp.lastName} · ${emp.employeeId}` : id}</>
}

/**
 * Read-only rendering of a catalogue field value. Pass onOpenFile to show "view"
 * links for document values.
 */
export default function FieldValue({
  field,
  value,
  onOpenFile,
}: {
  field: Pick<FieldMeta, 'type' | 'options'> & Partial<FieldMeta>
  value: unknown
  onOpenFile?: (key: string) => void
}) {
  if (value === null || value === undefined || value === '') return <span className="text-secondary">—</span>
  const v = value as Value

  const files = fileKeysOf(field as FieldMeta, value)
  const fileLinks = onOpenFile && files.length > 0 && (
    <span className="flex flex-wrap gap-2 mt-1">
      {files.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onOpenFile(f.key)}
          className="text-caption font-semibold text-primary underline cursor-pointer"
        >
          View {f.label.toLowerCase()}
        </button>
      ))}
    </span>
  )

  switch (field.type) {
    case 'select':
      return <>{field.options?.find((o) => o.value === value)?.label ?? String(value)}</>
    case 'date':
      return <>{formatDate(value as string)}</>
    case 'employeeRef':
      return <EmployeeName id={value as string} />
    case 'contacts':
      return (
        <span className="block space-y-0.5">
          {(value as { name: string; relationship: string; phone: string }[]).map((c, i) => (
            <span key={i} className="block">
              {c.name} ({c.relationship}) · {c.phone}
            </span>
          ))}
        </span>
      )
    case 'documentPair':
      return <span className="block">Front and back uploaded{fileLinks}</span>
    case 'education': {
      const level = v.highestQualification as keyof typeof QUALIFICATION_LABELS
      const count = (v.documents as unknown[] | undefined)?.length ?? 0
      return (
        <span className="block">
          {QUALIFICATION_LABELS[level] ?? String(level)}
          {count > 0 && ` · ${count} document${count > 1 ? 's' : ''}`}
          {fileLinks}
        </span>
      )
    }
    case 'probation':
      return v.onProbation ? <>{`${v.probationPeriod} · ${v.financialAgreement}`}</> : <>Not on probation</>
    case 'pay':
      return (
        <>
          {formatRupees(v.takeHomePayTotal as number)} / month (bank {formatRupees(v.bankComponent as number)}, cash{' '}
          {formatRupees(v.cashComponent as number)}){v.effectiveDate ? ` · effective ${formatDate(v.effectiveDate as string)}` : ''}
        </>
      )
    case 'appraisal':
      return (
        <span className="block">
          Next appraisal {formatDate(v.nextAppraisalWindow as string)}
          {v.outcome ? (
            <span className="block text-secondary">
              Completed {String(v.completedWindow)}: {String(v.outcome)}
            </span>
          ) : null}
        </span>
      )
    default:
      return <>{String(value)}</>
  }
}
