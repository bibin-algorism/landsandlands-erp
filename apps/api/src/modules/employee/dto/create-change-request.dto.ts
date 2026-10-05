import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class RequestedFieldItemDto {
  @IsString()
  @IsNotEmpty()
  fieldName: string;

  @IsString()
  @IsNotEmpty()
  proposedValue: string;

  @IsOptional()
  @IsString()
  proofDocumentUrl?: string;
}

export class CreateChangeRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestedFieldItemDto)
  fields: RequestedFieldItemDto[];
}
