import { IsString, IsNotEmpty, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QualificationLevel } from '@landsandlands/shared';

export class EducationalDocumentItemDto {
  @IsEnum(QualificationLevel)
  @IsNotEmpty()
  qualificationLevel: QualificationLevel;

  @IsString()
  @IsNotEmpty()
  frontImageUrl: string;

  @IsString()
  @IsNotEmpty()
  backImageUrl: string;
}

export class UploadDocumentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationalDocumentItemDto)
  educationalDocuments: EducationalDocumentItemDto[];
}
