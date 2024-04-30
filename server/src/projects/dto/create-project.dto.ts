import { ProjectStatus, TimePreference } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

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

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
