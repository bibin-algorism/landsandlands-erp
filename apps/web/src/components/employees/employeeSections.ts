/**
 * Layout shared by the employee details and edit pages (Figma "Edit 1–4"):
 * one section at a time, chosen with the "Show:" pills.
 */
export type EmployeeSection = 'Personal' | 'Communication' | 'Documents' | 'Employment' | 'Financial' | 'System data'

export const SECTION_TITLES: Record<EmployeeSection, string> = {
  Personal: 'Personal identity',
  Communication: 'Communication',
  Documents: 'Documents',
  Employment: 'Employment',
  Financial: 'Financial',
  'System data': 'System data',
}

/** The section a catalogue field is shown in. */
export function sectionOfField(key: string): EmployeeSection {
  if (key === 'documentation.aadhaarNumber' || key === 'documentation.drivingLicenceNumber') return 'Personal'
  if (key.startsWith('documentation.')) return 'Documents'
  if (key.startsWith('personal.')) return 'Personal'
  if (key.startsWith('communication.')) return 'Communication'
  if (key.startsWith('employment.')) return 'Employment'
  return 'Financial'
}

/** Restricted numbers are shown masked until the viewer chooses Show (BR-13). */
export function maskAadhaar(value?: string | null): string {
  const digits = (value ?? '').replace(/\D/g, '')
  return digits ? `XXXX XXXX ${digits.slice(-4)}` : '—'
}

export function maskTail(value?: string | null): string {
  if (!value) return '—'
  return `${'X'.repeat(Math.max(value.length - 4, 4))} ${value.slice(-4)}`
}
