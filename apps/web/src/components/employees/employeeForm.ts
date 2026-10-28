import type {
  CreateEmployeePayload,
  EmergencyContactInput,
  EmployeeBackground,
  EmployeeRoleType,
  JobType,
  QualificationLevel,
} from '../../api/types'
import {
  BUSINESS_VERTICALS,
  FUNCTIONAL_VERTICALS,
  SECOND_DOC_MAX_DAYS,
  SECOND_DOC_MIN_DAYS,
} from '../../constants/employee'

/**
 * Add-employee wizard model: form state, the BRD document checklist, per-step validation
 * and the API payload. Steps, review, success screen and side card all read from here so
 * the rules live in one place (BRD Section 8, BR-03/04/05/07/09, FR-03 to FR-10).
 */

export type DocKey =
  | 'aadhaarFront'
  | 'aadhaarBack'
  | 'drivingLicenceFront'
  | 'drivingLicenceBack'
  | 'tenthFront'
  | 'tenthBack'
  | 'twelfthFront'
  | 'twelfthBack'
  | 'ugFront'
  | 'ugBack'
  | 'pgFront'
  | 'pgBack'
  | 'relievingLetter'
  | 'payslips'
  | 'recordOfIncome'

export interface UploadedDoc {
  status: 'uploading' | 'uploaded' | 'error'
  fileName: string
  key?: string
  error?: string
}

export type PreviousOrgDoc = 'relievingLetter' | 'payslips'

export interface EmployeeFormData {
  // Step 1 · Personal
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  maritalStatus: string
  fatherName: string
  aadhaarNumber: string
  drivingLicenceNumber: string

  // Step 2 · Communication
  personalPhone: string
  secondaryPhone: string
  officialPhone: string
  personalEmail: string
  officialEmail: string
  currentAddress: string
  permanentSameAsCurrent: boolean
  permanentAddress: string
  emergencyContacts: EmergencyContactInput[]

  // Step 3 · Documents
  highestQualification: QualificationLevel | ''
  employeeBackground: EmployeeBackground | ''
  previousOrgDocStatus: 'BOTH' | 'ONE' | ''
  /** With status ONE: the document provided at joining; the other gets a due date. */
  providedPreviousOrgDoc: PreviousOrgDoc | ''
  secondDocDueInDays: string
  documents: Partial<Record<DocKey, UploadedDoc>>

  // Step 4 · Employment
  vertical: string
  role: EmployeeRoleType | ''
  jobType: JobType | ''
  joiningDate: string
  reportingAuthorityId: string
  onProbation: boolean | null
  probationPeriod: string
  financialAgreement: string

  // Step 5 · Financial (whole rupees, kept as typed text)
  takeHomePayTotal: string
  bankComponent: string
  cashComponent: string
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  branchName: string
  nextAppraisalWindow: string
}

export const INITIAL_FORM_DATA: EmployeeFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
  maritalStatus: '',
  fatherName: '',
  aadhaarNumber: '',
  drivingLicenceNumber: '',

  personalPhone: '',
  secondaryPhone: '',
  officialPhone: '',
  personalEmail: '',
  officialEmail: '',
  currentAddress: '',
  permanentSameAsCurrent: true,
  permanentAddress: '',
  emergencyContacts: [{ name: '', relationship: '', phone: '' }],

  highestQualification: '',
  employeeBackground: '',
  previousOrgDocStatus: '',
  providedPreviousOrgDoc: '',
  secondDocDueInDays: String(SECOND_DOC_MAX_DAYS),
  documents: {},

  vertical: '',
  role: '',
  jobType: '',
  joiningDate: '',
  reportingAuthorityId: '',
  onProbation: null,
  probationPeriod: '',
  financialAgreement: '',

  takeHomePayTotal: '',
  bankComponent: '',
  cashComponent: '0',
  accountHolderName: '',
  accountNumber: '',
  ifscCode: '',
  branchName: '',
  nextAppraisalWindow: '',
}

// ------------------------------------------------------------------
// Document checklist (FR-05, BR-04, BR-05)
// ------------------------------------------------------------------

export interface RequiredDoc {
  key: DocKey
  label: string
  group: 'Identity' | 'Education' | 'Previous organisation' | 'Income'
}

export const EDUCATION_DOCS: Record<
  Exclude<QualificationLevel, 'NONE'>,
  { label: string; front: DocKey; back: DocKey }
> = {
  TENTH: { label: '10th mark sheet', front: 'tenthFront', back: 'tenthBack' },
  TWELFTH: { label: '12th mark sheet', front: 'twelfthFront', back: 'twelfthBack' },
  UG_DEGREE: { label: 'UG degree certificate', front: 'ugFront', back: 'ugBack' },
  PG_DEGREE: { label: 'PG degree certificate', front: 'pgFront', back: 'pgBack' },
}

const QUALIFICATION_ORDER: QualificationLevel[] = ['NONE', 'TENTH', 'TWELFTH', 'UG_DEGREE', 'PG_DEGREE']

export const PREVIOUS_ORG_DOC_LABELS: Record<PreviousOrgDoc, string> = {
  relievingLetter: 'Relieving letter',
  payslips: "Last 3 months' payslips",
}

/** Qualification levels whose documents are required: the highest and every level below it. */
export function requiredQualificationLevels(
  data: EmployeeFormData,
): Exclude<QualificationLevel, 'NONE'>[] {
  if (!data.highestQualification) return []
  const top = QUALIFICATION_ORDER.indexOf(data.highestQualification)
  return QUALIFICATION_ORDER.slice(1, top + 1) as Exclude<QualificationLevel, 'NONE'>[]
}

/** The previous-organisation document still to come, when only one was provided. */
export function pendingPreviousOrgDoc(data: EmployeeFormData): PreviousOrgDoc | null {
  if (data.employeeBackground !== 'EXPERIENCED' || data.previousOrgDocStatus !== 'ONE') return null
  if (!data.providedPreviousOrgDoc) return null
  return data.providedPreviousOrgDoc === 'relievingLetter' ? 'payslips' : 'relievingLetter'
}

export function requiredDocuments(data: EmployeeFormData): RequiredDoc[] {
  const docs: RequiredDoc[] = [
    { key: 'aadhaarFront', label: 'Aadhaar · front', group: 'Identity' },
    { key: 'aadhaarBack', label: 'Aadhaar · back', group: 'Identity' },
    { key: 'drivingLicenceFront', label: 'Driving licence · front', group: 'Identity' },
    { key: 'drivingLicenceBack', label: 'Driving licence · back', group: 'Identity' },
  ]

  for (const level of requiredQualificationLevels(data)) {
    const doc = EDUCATION_DOCS[level]
    docs.push(
      { key: doc.front, label: `${doc.label} · front`, group: 'Education' },
      { key: doc.back, label: `${doc.label} · back`, group: 'Education' },
    )
  }

  if (data.employeeBackground === 'EXPERIENCED') {
    const provided: PreviousOrgDoc[] =
      data.previousOrgDocStatus === 'BOTH'
        ? ['relievingLetter', 'payslips']
        : data.previousOrgDocStatus === 'ONE' && data.providedPreviousOrgDoc
          ? [data.providedPreviousOrgDoc]
          : []
    for (const key of provided) {
      docs.push({ key, label: PREVIOUS_ORG_DOC_LABELS[key], group: 'Previous organisation' })
    }
  }

  if (data.employeeBackground === 'FREELANCER' || data.employeeBackground === 'ENTREPRENEUR') {
    docs.push({ key: 'recordOfIncome', label: 'Record of income', group: 'Income' })
  }

  return docs
}

export function isDocUploaded(data: EmployeeFormData, key: DocKey): boolean {
  const doc = data.documents[key]
  return doc?.status === 'uploaded' && !!doc.key
}

// ------------------------------------------------------------------
// Dates
// ------------------------------------------------------------------

const DAY_MS = 24 * 60 * 60 * 1000

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function addDaysIso(isoDate: string, days: number): string {
  return new Date(new Date(isoDate).getTime() + days * DAY_MS).toISOString().slice(0, 10)
}

export function formatDate(isoDate?: string | null): string {
  if (!isoDate) return '—'
  const d = new Date(isoDate)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** BR-05 due date for the missing previous-organisation document, once the joining date is known. */
export function secondDocDueDate(data: EmployeeFormData): string | null {
  if (!pendingPreviousOrgDoc(data) || !data.joiningDate) return null
  const days = Number(data.secondDocDueInDays)
  if (!Number.isInteger(days)) return null
  return addDaysIso(data.joiningDate, days)
}

// ------------------------------------------------------------------
// Validation
// ------------------------------------------------------------------

export type FormErrors = Record<string, string>

const PHONE_PATTERN = /^(\+91)?[6-9]\d{9}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/

export const digitsOnly = (value: string) => value.replace(/[\s-]/g, '')
export const toRupees = (value: string) => (value.trim() === '' ? NaN : Number(value))
export const formatRupees = (value: number) => `₹${value.toLocaleString('en-IN')}`

const ALL_VERTICALS: readonly string[] = [...BUSINESS_VERTICALS, ...FUNCTIONAL_VERTICALS]

function required(errors: FormErrors, field: string, value: string, label: string) {
  if (!value.trim()) errors[field] = `${label} is required`
}

function phone(errors: FormErrors, field: string, value: string, label: string) {
  if (!value.trim()) errors[field] = `${label} is required`
  else if (!PHONE_PATTERN.test(digitsOnly(value))) errors[field] = `${label} must be a 10-digit mobile number`
}

function email(errors: FormErrors, field: string, value: string, label: string) {
  if (!value.trim()) errors[field] = `${label} is required`
  else if (!EMAIL_PATTERN.test(value.trim())) errors[field] = `${label} is not a valid email`
}

function validatePersonal(data: EmployeeFormData): FormErrors {
  const errors: FormErrors = {}
  required(errors, 'firstName', data.firstName, 'First name')
  required(errors, 'lastName', data.lastName, 'Last name')
  required(errors, 'dateOfBirth', data.dateOfBirth, 'Date of birth')
  if (data.dateOfBirth && data.dateOfBirth >= todayIso()) {
    errors.dateOfBirth = 'Date of birth must be in the past'
  }
  required(errors, 'gender', data.gender, 'Gender')
  required(errors, 'bloodGroup', data.bloodGroup, 'Blood group')
  required(errors, 'maritalStatus', data.maritalStatus, 'Marital status')
  required(errors, 'fatherName', data.fatherName, "Father's name")
  if (!/^\d{12}$/.test(digitsOnly(data.aadhaarNumber))) {
    errors.aadhaarNumber = 'Aadhaar number must be 12 digits'
  }
  required(errors, 'drivingLicenceNumber', data.drivingLicenceNumber, 'Driving licence number')
  return errors
}

function validateCommunication(data: EmployeeFormData): FormErrors {
  const errors: FormErrors = {}
  phone(errors, 'personalPhone', data.personalPhone, 'Personal phone')
  phone(errors, 'secondaryPhone', data.secondaryPhone, 'Secondary phone')
  phone(errors, 'officialPhone', data.officialPhone, 'Official phone')
  email(errors, 'personalEmail', data.personalEmail, 'Personal email')
  email(errors, 'officialEmail', data.officialEmail, 'Official email')
  required(errors, 'currentAddress', data.currentAddress, 'Current address')
  if (!data.permanentSameAsCurrent) {
    required(errors, 'permanentAddress', data.permanentAddress, 'Permanent address')
  }
  if (data.emergencyContacts.length < 1 || data.emergencyContacts.length > 3) {
    errors.emergencyContacts = 'Add between 1 and 3 emergency contacts'
  }
  data.emergencyContacts.forEach((contact, i) => {
    required(errors, `emergencyContacts.${i}.name`, contact.name, 'Name')
    required(errors, `emergencyContacts.${i}.relationship`, contact.relationship, 'Relationship')
    phone(errors, `emergencyContacts.${i}.phone`, contact.phone, 'Phone')
  })
  return errors
}

function validateDocuments(data: EmployeeFormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.highestQualification) errors.highestQualification = 'Select the highest qualification'
  if (!data.employeeBackground) errors.employeeBackground = 'Select the work background'
  if (data.employeeBackground === 'EXPERIENCED') {
    if (!data.previousOrgDocStatus) {
      errors.previousOrgDocStatus = 'Select which previous-organisation documents are provided'
    }
    if (data.previousOrgDocStatus === 'ONE') {
      if (!data.providedPreviousOrgDoc) {
        errors.providedPreviousOrgDoc = 'Select the document provided today'
      }
      const days = Number(data.secondDocDueInDays)
      if (!Number.isInteger(days) || days < SECOND_DOC_MIN_DAYS || days > SECOND_DOC_MAX_DAYS) {
        errors.secondDocDueInDays = `Due date must be ${SECOND_DOC_MIN_DAYS} to ${SECOND_DOC_MAX_DAYS} days after joining`
      }
    }
  }
  for (const doc of requiredDocuments(data)) {
    const state = data.documents[doc.key]
    if (state?.status === 'uploading') errors[`documents.${doc.key}`] = `${doc.label} is still uploading`
    else if (!isDocUploaded(data, doc.key)) errors[`documents.${doc.key}`] = `${doc.label} is required`
  }
  return errors
}

function validateEmployment(data: EmployeeFormData): FormErrors {
  const errors: FormErrors = {}
  if (!ALL_VERTICALS.includes(data.vertical)) errors.vertical = 'Select a vertical'
  if (!data.role) errors.role = 'Select a role'
  if (!data.jobType) errors.jobType = 'Select a job type'
  required(errors, 'joiningDate', data.joiningDate, 'Joining date')
  if (data.joiningDate && data.dateOfBirth && data.joiningDate <= data.dateOfBirth) {
    errors.joiningDate = 'Joining date must be after the date of birth'
  }
  if (data.role && data.role !== 'MANAGING_DIRECTOR' && !data.reportingAuthorityId) {
    errors.reportingAuthorityId = 'Select who this employee reports to'
  }
  if (data.onProbation === null) errors.onProbation = 'Choose whether the employee is on probation'
  if (data.onProbation) {
    required(errors, 'probationPeriod', data.probationPeriod, 'Probation period')
    required(errors, 'financialAgreement', data.financialAgreement, 'Financial agreement')
  }
  return errors
}

function validateFinancial(data: EmployeeFormData): FormErrors {
  const errors: FormErrors = {}
  const total = toRupees(data.takeHomePayTotal)
  const bank = toRupees(data.bankComponent)
  const cash = toRupees(data.cashComponent)
  if (!Number.isInteger(total) || total < 1) errors.takeHomePayTotal = 'Enter the monthly take-home pay in rupees'
  if (!Number.isInteger(bank) || bank < 0) errors.bankComponent = 'Enter the amount paid to the bank (0 if none)'
  if (!Number.isInteger(cash) || cash < 0) errors.cashComponent = 'Enter the amount paid in cash (0 if none)'
  if (!errors.takeHomePayTotal && !errors.bankComponent && !errors.cashComponent && bank + cash !== total) {
    errors.payMismatch = 'Bank and cash amounts must add up to the take-home pay'
  }
  required(errors, 'accountHolderName', data.accountHolderName, 'Account holder name')
  if (!/^\d{9,18}$/.test(digitsOnly(data.accountNumber))) {
    errors.accountNumber = 'Account number must be 9 to 18 digits'
  }
  if (!IFSC_PATTERN.test(data.ifscCode.trim().toUpperCase())) {
    errors.ifscCode = 'Enter a valid 11-character IFSC'
  }
  required(errors, 'branchName', data.branchName, 'Branch name')
  required(errors, 'nextAppraisalWindow', data.nextAppraisalWindow, 'Next appraisal window')
  return errors
}

export const STEP_VALIDATORS: Record<number, (data: EmployeeFormData) => FormErrors> = {
  1: validatePersonal,
  2: validateCommunication,
  3: validateDocuments,
  4: validateEmployment,
  5: validateFinancial,
}

export function validateStep(step: number, data: EmployeeFormData): FormErrors {
  return STEP_VALIDATORS[step]?.(data) ?? {}
}

// ------------------------------------------------------------------
// Payload
// ------------------------------------------------------------------

function docKey(data: EmployeeFormData, key: DocKey): string {
  const doc = data.documents[key]
  if (!doc?.key) throw new Error(`Document ${key} has not been uploaded`)
  return doc.key
}

/** Build the POST /employees body. Call only after every step validates. */
export function buildCreatePayload(data: EmployeeFormData): CreateEmployeePayload {
  const background = data.employeeBackground as EmployeeBackground
  const isExperienced = background === 'EXPERIENCED'
  const provided = new Set(requiredDocuments(data).map((doc) => doc.key))
  const optionalDoc = (key: DocKey) => (provided.has(key) ? docKey(data, key) : undefined)
  const dueDate = secondDocDueDate(data)

  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    bloodGroup: data.bloodGroup,
    maritalStatus: data.maritalStatus,
    fatherName: data.fatherName.trim(),

    personalPhone: digitsOnly(data.personalPhone),
    secondaryPhone: digitsOnly(data.secondaryPhone),
    officialPhone: digitsOnly(data.officialPhone),
    personalEmail: data.personalEmail.trim(),
    officialEmail: data.officialEmail.trim(),
    currentAddress: data.currentAddress.trim(),
    permanentAddress: data.permanentSameAsCurrent
      ? data.currentAddress.trim()
      : data.permanentAddress.trim(),
    emergencyContacts: data.emergencyContacts.map((c) => ({
      name: c.name.trim(),
      relationship: c.relationship,
      phone: digitsOnly(c.phone),
    })),

    aadhaarNumber: digitsOnly(data.aadhaarNumber),
    aadhaarFrontUrl: docKey(data, 'aadhaarFront'),
    aadhaarBackUrl: docKey(data, 'aadhaarBack'),
    drivingLicenceNumber: data.drivingLicenceNumber.trim(),
    drivingLicenceFrontUrl: docKey(data, 'drivingLicenceFront'),
    drivingLicenceBackUrl: docKey(data, 'drivingLicenceBack'),
    highestQualification: data.highestQualification as QualificationLevel,
    educationalDocuments: requiredQualificationLevels(data).map((level) => ({
      qualificationLevel: level,
      frontImageUrl: docKey(data, EDUCATION_DOCS[level].front),
      backImageUrl: docKey(data, EDUCATION_DOCS[level].back),
    })),
    employeeBackground: background,
    previousOrgDocStatus: isExperienced ? (data.previousOrgDocStatus as 'BOTH' | 'ONE') : undefined,
    relievingExperienceUrl: optionalDoc('relievingLetter'),
    salarySlipUrl: optionalDoc('payslips'),
    secondDocDueDate: dueDate ?? undefined,
    recordOfIncomeUrl: optionalDoc('recordOfIncome'),

    vertical: data.vertical,
    role: data.role as EmployeeRoleType,
    jobType: data.jobType as JobType,
    joiningDate: data.joiningDate,
    reportingAuthorityId: data.role === 'MANAGING_DIRECTOR' ? undefined : data.reportingAuthorityId,
    onProbation: data.onProbation === true,
    probationPeriod: data.onProbation ? data.probationPeriod.trim() : undefined,
    financialAgreement: data.onProbation ? data.financialAgreement.trim() : undefined,

    takeHomePayTotal: toRupees(data.takeHomePayTotal),
    bankComponent: toRupees(data.bankComponent),
    cashComponent: toRupees(data.cashComponent),
    accountHolderName: data.accountHolderName.trim(),
    accountNumber: digitsOnly(data.accountNumber),
    ifscCode: data.ifscCode.trim().toUpperCase(),
    branchName: data.branchName.trim(),
    nextAppraisalWindow: data.nextAppraisalWindow,
  }
}
