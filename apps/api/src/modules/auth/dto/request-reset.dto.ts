import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RequestResetDto {
  @IsString()
  @IsNotEmpty({ message: 'Employee code or identifier is required' })
  identifier!: string;

  @IsString()
  @IsNotEmpty({ message: 'Reason for password reset is required' })
  @MinLength(10, { message: 'Reason must be at least 10 characters long' })
  reason!: string;
}
