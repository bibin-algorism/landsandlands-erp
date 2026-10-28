import {
  ArrayMinSize,
  IsArray,
  IsBooleanString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ChangeRequestStatus } from '@prisma/client';
import { FILE_KEY_PATTERN } from '../../files/file-storage.service';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class RequestedFieldDto {
  @IsString()
  fieldKey: string;

  /** Validated against the field catalogue by the service. */
  @IsDefined()
  proposedValue: unknown;

  /** FR-17: proof, required for fields marked requiresProof. */
  @IsOptional()
  @Matches(FILE_KEY_PATTERN, { message: 'proofFileKey must be a storage key returned by the upload endpoint' })
  proofFileKey?: string;
}

/** FR-16 / FR-17: raise a request, or (FR-21) resubmit the queried fields. */
export class ChangeRequestFieldsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RequestedFieldDto)
  fields: RequestedFieldDto[];
}

/** FR-19: a query names the fields and gives a reason. */
export class QueryChangeRequestDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  fieldKeys: string[];

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;
}

/** FR-19: a rejection gives a reason. */
export class RejectChangeRequestDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;
}

export class ListChangeRequestsQueryDto {
  @IsOptional()
  @IsEnum(ChangeRequestStatus)
  status?: ChangeRequestStatus;

  /** FR-22: only requests past their 24-hour window. */
  @IsOptional()
  @IsBooleanString()
  overdue?: string;
}
