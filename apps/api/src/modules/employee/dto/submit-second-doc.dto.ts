import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { PreviousOrgDocStatus } from '@landsandlands/shared';

export class SubmitSecondDocDto {
  @IsEnum(PreviousOrgDocStatus)
  @IsNotEmpty()
  previousOrgDocStatus: PreviousOrgDocStatus;

  @IsOptional()
  @IsString()
  recordOfIncomeUrl?: string;

  @IsOptional()
  @IsString()
  relievingLetterUrl?: string;
}
