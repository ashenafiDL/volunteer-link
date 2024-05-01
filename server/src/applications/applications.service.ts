import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async checkApplication(userId: string, projectId: string) {
    try {
      const application = await this.prisma.applications.findFirst({
        where: {
          AND: [{ userId: userId }, { projectId: projectId }],
        },
      });

      return {
        applied: application ? true : false,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to check application. Please try again.',
      );
    }
  }

  async getMyApplications(userId: string) {
    try {
      const pendingApplications = await this.prisma.applications.findMany({
        where: {
          AND: [{ userId: userId }, { status: 'PENDING' }],
        },
        include: {
          project: true,
        },
      });

      const acceptedApplications = await this.prisma.applications.findMany({
        where: {
          AND: [{ userId: userId }, { status: 'ACCEPTED' }],
        },
        include: {
          project: true,
        },
      });

      const rejectedApplications = await this.prisma.applications.findMany({
        where: {
          AND: [{ userId: userId }, { status: 'REJECTED' }],
        },
        include: {
          project: true,
        },
      });

      return {
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve applications. Please try again.',
      );
    }
  }

  async getApplicationsByProjectId(projectId: string) {
    try {
      const pendingApplications = await this.prisma.applications.findMany({
        where: {
          AND: [{ projectId: projectId }, { status: 'PENDING' }],
        },
        include: {
          user: {
            include: {
              location: true,
            },
          },
        },
      });

      const acceptedApplications = await this.prisma.applications.findMany({
        where: {
          AND: [{ projectId: projectId }, { status: 'ACCEPTED' }],
        },
        include: {
          user: true,
        },
      });

      const rejectedApplications = await this.prisma.applications.findMany({
        where: {
          AND: [{ projectId: projectId }, { status: 'REJECTED' }],
        },
        include: {
          user: true,
        },
      });

      return {
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve applications. Please try again.',
      );
    }
  }
}
