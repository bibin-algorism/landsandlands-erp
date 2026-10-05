import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class DirectEditDto {
  @IsObject()
  @IsNotEmpty()
  fieldUpdates: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
