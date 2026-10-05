import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ChangeRequestAction {
  APPROVE = 'APPROVE',
  QUERY = 'QUERY',
  REJECT = 'REJECT',
}

export class ActionChangeRequestDto {
  @IsEnum(ChangeRequestAction)
  @IsNotEmpty()
  action: ChangeRequestAction;

  @IsOptional()
  @IsString()
  reason?: string;
}
