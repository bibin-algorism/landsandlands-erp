import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ClientType, ClientStatus } from '@landsandlands/shared';

export class CreateClientDto {
  @IsEnum(ClientType)
  @IsNotEmpty()
  clientType: ClientType;

  @IsOptional()
  @IsEnum(ClientStatus)
  status?: ClientStatus;

  // Profile Details
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  panNumber?: string;

  @IsOptional()
  @IsString()
  aadhaarNumber?: string;

  @IsOptional()
  @IsString()
  gstNumber?: string;

  // Contact Details
  @IsString()
  @IsNotEmpty()
  primaryPhone: string;

  @IsOptional()
  @IsString()
  secondaryPhone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  currentAddress?: string;

  @IsOptional()
  @IsString()
  permanentAddress?: string;

  // Ownership Details
  @IsOptional()
  @IsString()
  acquiredById?: string;

  @IsOptional()
  @IsString()
  primaryRMId?: string;
}
