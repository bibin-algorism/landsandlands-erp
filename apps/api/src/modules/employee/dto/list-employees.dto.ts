import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EmploymentStatus } from '@prisma/client';

export class ListEmployeesQueryDto {
  /** BRQ-14: TERMINATED lists former employees (HR and the MD only). Default ACTIVE. */
  @IsOptional()
  @IsEnum(EmploymentStatus)
  status?: EmploymentStatus;

  @IsOptional()
  @IsString()
  vertical?: string;

  @IsOptional()
  @IsString()
  field?: string;
}
