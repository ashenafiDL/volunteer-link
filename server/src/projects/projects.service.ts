import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      // Check if organization exists
      const organizationExists = await this.prisma.organizations.findUnique({
        where: { id: createProjectDto.organizationId },
      });
      if (!organizationExists) {
        throw new NotFoundException(
          'Organization with the specified ID is not found.',
        );
      }

      // Create the project
      const project = await this.prisma.projects.create({
        data: {
          organization: {
            connect: {
              id: createProjectDto.organizationId,
            },
          },
          title: createProjectDto.title,
          description: createProjectDto.description,
          startDate: createProjectDto.startDate,
          endDate: createProjectDto.endDate,
          status: 'NOT_STARTED',
          timeCommitment: createProjectDto.timeCommitment,
        },
      });

      // If location is specified, connect it to the project
      if (createProjectDto.locationId) {
        // Validate location existence
        const locationExists = await this.prisma.locations.findFirst({
          where: { id: createProjectDto.locationId },
        });
        if (!locationExists) {
          throw new NotFoundException('Location not found');
        }

        const updatedProject = await this.prisma.projects.update({
          where: { id: project.id },
          data: {
            location: {
              connect: {
                id: createProjectDto.locationId,
              },
            },
          },
        });

        return updatedProject;
      }

      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return error;
      } else {
        throw new InternalServerErrorException(
          'Failed to create project. Please try again.',
        );
      }
    }
  }

  async getLatestProjects(days: number) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      const projects = await this.prisma.projects.findMany({
        where: {
          createdAt: {
            gte: cutoffDate,
          },
        },
        include: {
          location: true,
          organization: true,
          applications: true,
          contributions: true,
          donations: true,
          messages: true,
          skillsRequired: true,
          tasks: true,
        },
      });
      return projects;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve projects. Please try again.',
      );
    }
  }

  async getInProgressProjects(organizationId: string) {
    try {
      // Check if the organization exists
      const organizationExists = await this.prisma.organizations.findUnique({
        where: { id: organizationId },
      });
      if (!organizationExists) {
        throw new NotFoundException(
          'Organization with the specified ID is not found.',
        );
      }

      // Retrieve in progress projects projects
      const projects = await this.prisma.projects.findMany({
        where: {
          OR: [{ status: 'NOT_STARTED' }, { status: 'IN_PROGRESS' }],
        },
        include: {
          location: true,
          organization: true,
          applications: true,
          contributions: true,
          donations: true,
          messages: true,
          skillsRequired: true,
          tasks: true,
        },
      });

      return projects;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return error;
      } else {
        throw new InternalServerErrorException(
          'Failed to retrieve projects. Please try again.',
        );
      }
    }
  }

  async getFinishedProjects(organizationId: string) {
    try {
      // Check if the organization exists
      const organizationExists = await this.prisma.organizations.findUnique({
        where: { id: organizationId },
      });
      if (!organizationExists) {
        throw new NotFoundException(
          'Organization with the specified ID is not found.',
        );
      }

      // Retrieve finished projects projects
      const projects = await this.prisma.projects.findMany({
        where: {
          status: 'DONE',
        },
      });

      return projects;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return error;
      } else {
        throw new InternalServerErrorException(
          'Failed to retrieve projects. Please try again.',
        );
      }
    }
  }
}
