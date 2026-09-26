import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ResetRequestStatus } from '@prisma/client';

export class AdminActionResetDto {
  @IsString()
  @IsNotEmpty({ message: 'Request ID is required' })
  requestId!: string;

  @IsEnum(ResetRequestStatus, { message: 'Action status must be APPROVED or REJECTED' })
  action!: ResetRequestStatus;

  @IsString()
  @IsOptional()
  note?: string;
}
