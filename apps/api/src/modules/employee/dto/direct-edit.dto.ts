import { IsISO8601, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

/** HR direct edit (FR-24): field key → new value, validated against the field catalogue. */
export class DirectEditDto {
  @IsObject()
  changes: Record<string, unknown>;

  /** Optional for direct edits (implementation plan, decision 4). */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  /** The record's updatedAt when the edit form was loaded; a newer record returns 409. */
  @IsISO8601()
  expectedUpdatedAt: string;
}
