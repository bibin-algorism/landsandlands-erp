import { QualificationLevel } from '@prisma/client';
import { FILE_KEY_PATTERN } from '../../files/file-storage.service';

/** Thrown by a normaliser when a submitted value is invalid; the message is shown to the user. */
export class FieldValueError extends Error {}

const PHONE_PATTERN = /^(\+91)?[6-9]\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const QUALIFICATION_LADDER: QualificationLevel[] = [
  QualificationLevel.NONE,
  QualificationLevel.TENTH,
  QualificationLevel.TWELFTH,
  QualificationLevel.UG_DEGREE,
  QualificationLevel.PG_DEGREE,
];

export function text(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) throw new FieldValueError('is required');
  return value.trim();
}

export function phone(value: unknown): string {
  const normalised = typeof value === 'string' ? value.replace(/[\s-]/g, '') : '';
  if (!PHONE_PATTERN.test(normalised)) throw new FieldValueError('must be a 10-digit Indian mobile number');
  return normalised;
}

export function email(value: unknown): string {
  const normalised = typeof value === 'string' ? value.trim() : '';
  if (!EMAIL_PATTERN.test(normalised)) throw new FieldValueError('must be a valid email address');
  return normalised;
}

/** Calendar date as YYYY-MM-DD. */
export function date(value: unknown): string {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value) || isNaN(Date.parse(value))) {
    throw new FieldValueError('must be a date (YYYY-MM-DD)');
  }
  return value;
}

export function oneOf<T extends string>(options: readonly T[]) {
  return (value: unknown): T => {
    if (typeof value !== 'string' || !options.includes(value as T)) {
      throw new FieldValueError(`must be one of: ${options.join(', ')}`);
    }
    return value as T;
  };
}

export function aadhaar(value: unknown): string {
  const normalised = typeof value === 'string' ? value.replace(/[\s-]/g, '') : '';
  if (!/^\d{12}$/.test(normalised)) throw new FieldValueError('must be 12 digits');
  return normalised;
}

export function licence(value: unknown): string {
  const normalised = typeof value === 'string' ? value.replace(/\s/g, '').toUpperCase() : '';
  if (!normalised) throw new FieldValueError('is required');
  return normalised;
}

export function accountNumber(value: unknown): string {
  const normalised = typeof value === 'string' ? value.replace(/[\s-]/g, '') : '';
  if (!/^\d{9,18}$/.test(normalised)) throw new FieldValueError('must be 9 to 18 digits');
  return normalised;
}

export function ifsc(value: unknown): string {
  const normalised = typeof value === 'string' ? value.trim().toUpperCase() : '';
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(normalised)) throw new FieldValueError('must be a valid 11-character IFSC');
  return normalised;
}

export function uuid(value: unknown): string {
  if (typeof value !== 'string' || !UUID_PATTERN.test(value)) throw new FieldValueError('must be an employee ID');
  return value;
}

export function fileKey(value: unknown): string {
  if (typeof value !== 'string' || !FILE_KEY_PATTERN.test(value)) {
    throw new FieldValueError('must be a document uploaded via POST /api/v1/files/employee-documents');
  }
  return value;
}

export function wholeRupees(value: unknown, min = 0): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < min) {
    throw new FieldValueError(`must be a whole number of rupees${min > 0 ? ` of at least ${min}` : ''}`);
  }
  return value;
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new FieldValueError('is invalid');
  return value as Record<string, unknown>;
}

/** Prefix nested errors with the part of the value they refer to. */
function nested<T>(label: string, fn: () => T): T {
  try {
    return fn();
  } catch (err) {
    if (err instanceof FieldValueError) throw new FieldValueError(`${label} ${err.message}`);
    throw err;
  }
}

// ------------------------------------------------------------------
// Structured values
// ------------------------------------------------------------------

export interface EmergencyContactValue {
  name: string;
  relationship: string;
  phone: string;
}

/** BR-03: one to three emergency contacts. */
export function emergencyContacts(value: unknown): EmergencyContactValue[] {
  if (!Array.isArray(value) || value.length < 1 || value.length > 3) {
    throw new FieldValueError('must list between 1 and 3 contacts');
  }
  return value.map((item, i) => {
    const contact = record(item);
    return {
      name: nested(`contact ${i + 1} name`, () => text(contact.name)),
      relationship: nested(`contact ${i + 1} relationship`, () => text(contact.relationship)),
      phone: nested(`contact ${i + 1} phone`, () => phone(contact.phone)),
    };
  });
}

export interface DocumentPairValue {
  front: string;
  back: string;
}

/** BR-04: front and back image of a document. */
export function documentPair(value: unknown): DocumentPairValue {
  const pair = record(value);
  return {
    front: nested('front image', () => fileKey(pair.front)),
    back: nested('back image', () => fileKey(pair.back)),
  };
}

export interface EducationValue {
  highestQualification: QualificationLevel;
  documents: { qualificationLevel: QualificationLevel; front: string; back: string }[];
}

/** FR-05: documents for the highest qualification and every level below it, in ladder order. */
export function education(value: unknown): EducationValue {
  const input = record(value);
  const highest = nested('highest qualification', () => oneOf(QUALIFICATION_LADDER)(input.highestQualification));
  const required = QUALIFICATION_LADDER.slice(1, QUALIFICATION_LADDER.indexOf(highest) + 1);
  const docs = Array.isArray(input.documents) ? input.documents.map(record) : [];
  const documents = required.map((level) => {
    const doc = docs.find((d) => d.qualificationLevel === level);
    if (!doc) throw new FieldValueError(`needs documents for ${level}`);
    return {
      qualificationLevel: level,
      front: nested(`${level} front image`, () => fileKey(doc.front)),
      back: nested(`${level} back image`, () => fileKey(doc.back)),
    };
  });
  if (docs.length !== required.length) {
    throw new FieldValueError('has documents that do not match the highest qualification');
  }
  return { highestQualification: highest, documents };
}

export interface ProbationValue {
  onProbation: boolean;
  probationPeriod: string | null;
  financialAgreement: string | null;
}

/** FR-10 / BR-10: details only when the employee is on probation. */
export function probation(value: unknown): ProbationValue {
  const input = record(value);
  if (typeof input.onProbation !== 'boolean') throw new FieldValueError('must say whether the employee is on probation');
  if (!input.onProbation) return { onProbation: false, probationPeriod: null, financialAgreement: null };
  return {
    onProbation: true,
    probationPeriod: nested('period', () => text(input.probationPeriod)),
    financialAgreement: nested('financial agreement', () => text(input.financialAgreement)),
  };
}

export interface PayValue {
  takeHomePayTotal: number;
  bankComponent: number;
  cashComponent: number;
  /** Required on change: the revision's effective date (BR-08). Absent when read. */
  effectiveDate?: string;
}

/** BR-09: bank + cash must equal the total. */
export function pay(value: unknown): PayValue {
  const input = record(value);
  const result: PayValue = {
    takeHomePayTotal: nested('take-home pay', () => wholeRupees(input.takeHomePayTotal, 1)),
    bankComponent: nested('bank component', () => wholeRupees(input.bankComponent)),
    cashComponent: nested('cash component', () => wholeRupees(input.cashComponent)),
    effectiveDate: nested('effective date', () => date(input.effectiveDate)),
  };
  if (result.bankComponent + result.cashComponent !== result.takeHomePayTotal) {
    throw new FieldValueError('bank and cash components must add up to the take-home pay');
  }
  return result;
}

export interface AppraisalValue {
  nextAppraisalWindow: string;
  /** Optional appraisal just completed, appended to appraisal history (BR-08). */
  completedWindow?: string;
  outcome?: string;
}

export function appraisal(value: unknown): AppraisalValue {
  const input = record(value);
  const result: AppraisalValue = {
    nextAppraisalWindow: nested('next appraisal window', () => date(input.nextAppraisalWindow)),
  };
  if (input.outcome !== undefined || input.completedWindow !== undefined) {
    result.completedWindow = nested('completed appraisal window', () => text(input.completedWindow));
    result.outcome = nested('appraisal outcome', () => text(input.outcome));
  }
  return result;
}

export { UUID_PATTERN };
