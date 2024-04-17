import { TimePreference } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  organizationId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  locationId: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsEnum(TimePreference)
  timeCommitment: TimePreference;

  @IsInt()
  @Min(1)
  openPositions?: number = 1;
}
