import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StakeholderType } from '@landsandlands/shared';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'EMP_1002', description: 'Unique identifier or Employee Code' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiPropertyOptional({ example: 'Password123!', description: 'Initial password (auto-generated if omitted)' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({ enum: StakeholderType, example: StakeholderType.EMPLOYEE })
  @IsOptional()
  @IsEnum(StakeholderType)
  stakeholderType?: StakeholderType;

  @ApiPropertyOptional({ example: true, description: 'Force password change on first login' })
  @IsOptional()
  @IsBoolean()
  mustChangePassword?: boolean;

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'john.doe@landsandlands.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;
}
