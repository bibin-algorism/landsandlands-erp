import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsDateString,
  IsArray,
  IsBoolean,
  IsUUID,
  Matches,
  Min,
  ValidateIf,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  EmployeeRole,
  JobType,
  QualificationLevel,
  PreviousOrgDocStatus,
  EmployeeBackground,
  EMPLOYEE_VERTICALS,
  GENDERS,
  BLOOD_GROUPS,
  MARITAL_STATUSES,
} from '@landsandlands/shared';
import { FILE_KEY_PATTERN } from '../../files/file-storage.service';

const PHONE_PATTERN = /^(\+91)?[6-9]\d{9}$/;
const PHONE_MESSAGE = '$property must be a 10-digit Indian mobile number';
const FILE_KEY_MESSAGE = '$property must be a storage key returned by POST /api/v1/files/employee-documents';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);
const stripSpaces = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.replace(/[\s-]/g, '') : value;

export class EmergencyContactDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  relationship: string;

  @Transform(stripSpaces)
  @Matches(PHONE_PATTERN, { message: PHONE_MESSAGE })
  phone: string;
}

export class EducationalDocumentDto {
  @IsEnum(QualificationLevel)
  qualificationLevel: QualificationLevel;

  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  frontImageUrl: string;

  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  backImageUrl: string;
}

/**
 * HR onboarding payload (BRD Section 8, FR-01 to FR-10).
 * Cross-field rules (BR-05, BR-07, BR-09, FR-05) are enforced in EmployeeService.
 * Document fields carry storage keys from the Files module, not public URLs.
 */
export class CreateEmployeeDto {
  // 8.1 Personal Identity
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString({ strict: true })
  dateOfBirth: string;

  @IsIn(GENDERS)
  gender: string;

  @IsIn(BLOOD_GROUPS)
  bloodGroup: string;

  @IsIn(MARITAL_STATUSES)
  maritalStatus: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  fatherName: string;

  // 8.2 Communication Details
  @Transform(stripSpaces)
  @Matches(PHONE_PATTERN, { message: PHONE_MESSAGE })
  personalPhone: string;

  @Transform(stripSpaces)
  @Matches(PHONE_PATTERN, { message: PHONE_MESSAGE })
  secondaryPhone: string;

  @Transform(stripSpaces)
  @Matches(PHONE_PATTERN, { message: PHONE_MESSAGE })
  officialPhone: string;

  @Transform(trim)
  @IsEmail()
  personalEmail: string;

  @Transform(trim)
  @IsEmail()
  officialEmail: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  currentAddress: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  permanentAddress: string;

  // BR-03: at least one, at most three
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one emergency contact is required' })
  @ArrayMaxSize(3, { message: 'No more than three emergency contacts can be stored' })
  @ValidateNested({ each: true })
  @Type(() => EmergencyContactDto)
  emergencyContacts: EmergencyContactDto[];

  // 8.3 Documentation (BR-04: front and back images)
  @Transform(stripSpaces)
  @Matches(/^\d{12}$/, { message: 'aadhaarNumber must be 12 digits' })
  aadhaarNumber: string;

  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  aadhaarFrontUrl: string;

  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  aadhaarBackUrl: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/\s/g, '').toUpperCase() : value))
  @IsString()
  @IsNotEmpty()
  drivingLicenceNumber: string;

  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  drivingLicenceFrontUrl: string;

  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  drivingLicenceBackUrl: string;

  @IsEnum(QualificationLevel)
  highestQualification: QualificationLevel;

  // FR-05: one entry per qualification up to the highest (checked in the service)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationalDocumentDto)
  educationalDocuments: EducationalDocumentDto[];

  // BR-05: EXPERIENCED has previous-organisation documents; the others have none
  @IsEnum(EmployeeBackground)
  employeeBackground: EmployeeBackground;

  @ValidateIf((o) => o.employeeBackground === EmployeeBackground.EXPERIENCED)
  @IsIn([PreviousOrgDocStatus.BOTH, PreviousOrgDocStatus.ONE], {
    message: 'previousOrgDocStatus must be BOTH or ONE for an experienced employee',
  })
  previousOrgDocStatus?: PreviousOrgDocStatus;

  @ValidateIf((o) => o.relievingExperienceUrl !== undefined)
  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  relievingExperienceUrl?: string;

  @ValidateIf((o) => o.salarySlipUrl !== undefined)
  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  salarySlipUrl?: string;

  @ValidateIf((o) => o.previousOrgDocStatus === PreviousOrgDocStatus.ONE)
  @IsDateString({ strict: true })
  secondDocDueDate?: string;

  @ValidateIf(
    (o) =>
      o.employeeBackground === EmployeeBackground.FREELANCER ||
      o.employeeBackground === EmployeeBackground.ENTREPRENEUR,
  )
  @Matches(FILE_KEY_PATTERN, { message: FILE_KEY_MESSAGE })
  recordOfIncomeUrl?: string;

  // 8.4 Employment Details
  @IsIn(EMPLOYEE_VERTICALS)
  vertical: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsEnum(JobType)
  jobType: JobType;

  @IsDateString({ strict: true })
  joiningDate: string;

  // BR-07: everyone except the MD reports to an existing employee
  @ValidateIf((o) => o.role !== EmployeeRole.MANAGING_DIRECTOR)
  @IsUUID()
  reportingAuthorityId?: string;

  // FR-10 / BR-10: probation details only when placed on probation
  @IsBoolean()
  onProbation: boolean;

  @ValidateIf((o) => o.onProbation === true)
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  probationPeriod?: string;

  @ValidateIf((o) => o.onProbation === true)
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  financialAgreement?: string;

  // 8.5 Financial Details
  @Transform(stripSpaces)
  @Matches(/^\d{9,18}$/, { message: 'accountNumber must be 9 to 18 digits' })
  accountNumber: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value))
  @Matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: 'ifscCode must be a valid 11-character IFSC' })
  ifscCode: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  branchName: string;

  // Whole rupees. BR-09: bank + cash must equal the total (checked in the service)
  @IsInt()
  @Min(1)
  takeHomePayTotal: number;

  @IsInt()
  @Min(0)
  bankComponent: number;

  @IsInt()
  @Min(0)
  cashComponent: number;

  @IsDateString({ strict: true })
  nextAppraisalWindow: string;
}
