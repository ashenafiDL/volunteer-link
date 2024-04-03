import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @ApiProperty({ description: 'The name of the organization' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'The mission statement of the organization' })
  mission: string;

  @IsUrl()
  @ApiProperty({ description: "The URL of the organization's website" })
  websiteUrl: string;

  @IsString()
  @ApiProperty({
    description: 'The ID of the location where the organization is based',
  })
  locationId: string;

  @IsEmail()
  @ApiProperty({
    description: "The email address of the organization's contact",
  })
  contactEmail: string;

  @IsPhoneNumber()
  @ApiProperty({
    description: "The phone number of the organization's contact",
  })
  contactPhone: string;

  @IsDateString()
  @ApiProperty({ description: 'The founding date of the organization' })
  foundingDate: Date;
}
