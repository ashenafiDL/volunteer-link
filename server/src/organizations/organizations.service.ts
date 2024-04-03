import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
    permit: Express.Multer.File,
  ) {
    try {
      // Check if the name/contactEmail/contactPhone/websiteURL is unique
      const checkConflict = await this.prisma.organizations.findFirst({
        where: {
          OR: [
            { name: createOrganizationDto.name },
            { contactEmail: createOrganizationDto.contactEmail },
            { contactPhone: createOrganizationDto.contactPhone },
            { websiteUrl: createOrganizationDto.websiteUrl },
          ],
        },
      });
      if (checkConflict) {
        throw new ConflictException(
          'An organization with the same name/websiteURL/email/phone already exists',
        );
      }

      // Check if the location with the specified ID exists
      const location = await this.prisma.locations.findUnique({
        where: { id: createOrganizationDto.locationId },
      });
      if (!location) {
        throw new NotFoundException(
          'A location with the specified ID was not found',
        );
      }

      // Create a new record in the files table for permit
      const newPermitRecord = await this.prisma.files.create({
        data: {
          filename: permit.filename,
          filePath: `./uploads/permits/${permit.filename}`,
          fileType: permit.mimetype,
          size: permit.size,
        },
      });

      // Create the organization
      const newOrganization = await this.prisma.organizations.create({
        data: {
          ...createOrganizationDto,
          permitId: newPermitRecord.id,
          verified: false,
        },
      });

      return newOrganization;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Failed to create organization. Please try again later.',
        );
      }
    }
  }
}
