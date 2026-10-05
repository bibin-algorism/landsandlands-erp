import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EmployeeRole,
  JobType,
  QualificationLevel,
  PreviousOrgDocStatus,
  EmployeeBackground,
} from '@landsandlands/shared';

export class EmergencyContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  relationship: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateEmployeeDto {
  // Personal Details
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  bloodGroup: string;

  @IsString()
  @IsNotEmpty()
  maritalStatus: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  // Communication Details
  @IsString()
  @IsNotEmpty()
  personalPhone: string;

  @IsOptional()
  @IsString()
  secondaryPhone?: string;

  @IsString()
  @IsNotEmpty()
  officialPhone: string;

  @IsEmail()
  @IsNotEmpty()
  personalEmail: string;

  @IsEmail()
  @IsNotEmpty()
  officialEmail: string;

  @IsString()
  @IsNotEmpty()
  currentAddress: string;

  @IsString()
  @IsNotEmpty()
  permanentAddress: string;

  // Emergency Contacts
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmergencyContactDto)
  emergencyContacts: EmergencyContactDto[];

  // Document & Background Details
  @IsString()
  @IsNotEmpty()
  aadhaarNumber: string;

  @IsOptional()
  @IsString()
  aadhaarFrontUrl?: string;

  @IsOptional()
  @IsString()
  aadhaarBackUrl?: string;

  @IsString()
  @IsNotEmpty()
  drivingLicenceNumber: string;

  @IsOptional()
  @IsString()
  drivingLicenceFrontUrl?: string;

  @IsOptional()
  @IsString()
  drivingLicenceBackUrl?: string;

  @IsEnum(QualificationLevel)
  @IsNotEmpty()
  highestQualification: QualificationLevel;

  @IsOptional()
  @IsEnum(PreviousOrgDocStatus)
  previousOrgDocStatus?: PreviousOrgDocStatus;

  @IsOptional()
  @IsEnum(EmployeeBackground)
  employeeBackground?: EmployeeBackground;

  @IsOptional()
  @IsString()
  recordOfIncomeUrl?: string;

  // Employment Details
  @IsString()
  @IsNotEmpty()
  vertical: string;

  @IsEnum(EmployeeRole)
  @IsNotEmpty()
  role: EmployeeRole;

  @IsEnum(JobType)
  @IsNotEmpty()
  jobType: JobType;

  @IsDateString()
  @IsNotEmpty()
  joiningDate: string;

  @IsOptional()
  @IsString()
  reportingAuthorityId?: string;

  // Probation Details
  @IsString()
  @IsNotEmpty()
  probationPeriod: string;

  @IsString()
  @IsNotEmpty()
  financialAgreement: string;

  // Financial Details
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @IsString()
  @IsNotEmpty()
  ifscCode: string;

  @IsString()
  @IsNotEmpty()
  branchName: string;

  @IsNumber()
  @IsNotEmpty()
  takeHomePayTotal: number;

  @IsOptional()
  @IsNumber()
  cashComponent?: number;

  @IsOptional()
  @IsNumber()
  bankComponent?: number;

  @IsDateString()
  @IsNotEmpty()
  nextAppraisalWindow: string;

  // User Auth Account Creation
  @IsString()
  @IsNotEmpty()
  initialPassword: string;
}
