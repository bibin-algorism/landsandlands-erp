import type { FieldGroup, FieldMeta } from '../../../api/types'
import { todayIso } from '../employeeForm'

export const GROUP_LABELS: Record<FieldGroup, string> = {
  PERSONAL: 'Personal identity',
  COMMUNICATION: 'Communication',
  DOCUMENTATION: 'Documentation',
  EMPLOYMENT: 'Employment',
  FINANCIAL: 'Financial',
}

export const GROUP_ORDER: FieldGroup[] = ['PERSONAL', 'COMMUNICATION', 'DOCUMENTATION', 'EMPLOYMENT', 'FINANCIAL']

type Value = Record<string, unknown>

/** Starting value for an editor, from the field's current value. */
export function initialEditorValue(field: FieldMeta, current: unknown): unknown {
  switch (field.type) {
    case 'pay':
      return { ...((current as Value) ?? { takeHomePayTotal: 0, bankComponent: 0, cashComponent: 0 }), effectiveDate: todayIso() }
    case 'appraisal':
      return { nextAppraisalWindow: (current as Value)?.nextAppraisalWindow ?? '', completedWindow: '', outcome: '' }
    case 'probation':
      return current ?? { onProbation: false, probationPeriod: null, financialAgreement: null }
    case 'contacts':
      return current ?? [{ name: '', relationship: '', phone: '' }]
    case 'education':
    case 'documentPair':
      return current
    default:
      return current ?? ''
  }
}

/** Value to send to the API (drops optional parts left empty). */
export function submitValue(field: FieldMeta, value: unknown): unknown {
  if (field.type === 'appraisal') {
    const v = value as Value
    return v.outcome || v.completedWindow
      ? v
      : { nextAppraisalWindow: v.nextAppraisalWindow }
  }
  return value
}

/** Whether an editor value differs from the current value. */
export function hasChanged(field: FieldMeta, current: unknown, value: unknown): boolean {
  if (field.type === 'pay') {
    const a = (current ?? {}) as Value
    const b = (value ?? {}) as Value
    return ['takeHomePayTotal', 'bankComponent', 'cashComponent'].some((k) => a[k] !== b[k])
  }
  if (field.type === 'appraisal') {
    const v = value as Value
    return (current as Value)?.nextAppraisalWindow !== v.nextAppraisalWindow || !!v.outcome
  }
  return JSON.stringify(current ?? null) !== JSON.stringify(value ?? null)
}

/** Storage keys inside a value (documents), for "view" links. */
export function fileKeysOf(field: FieldMeta, value: unknown): { label: string; key: string }[] {
  if (!value) return []
  if (field.type === 'documentPair') {
    const v = value as { front?: string; back?: string }
    return [
      ...(v.front ? [{ label: 'Front', key: v.front }] : []),
      ...(v.back ? [{ label: 'Back', key: v.back }] : []),
    ]
  }
  if (field.type === 'education') {
    const v = value as { documents?: { qualificationLevel: string; front: string; back: string }[] }
    return (v.documents ?? []).flatMap((d) => [
      { label: `${d.qualificationLevel} front`, key: d.front },
      { label: `${d.qualificationLevel} back`, key: d.back },
    ])
  }
  return []
}
