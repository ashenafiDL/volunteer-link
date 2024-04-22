import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    try {
      // Total number of users
      const totalUserCount = await this.prisma.users.count();

      // Number of users that are active in the last 30 days
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);
      const monthlyActiveUserCount = await this.prisma.users.count({
        where: {
          lastLoggedInAt: {
            gte: cutoffDate,
          },
        },
      });

      // Deactivated accounts
      const deactivatedAccountsCount = await this.prisma.users.count({
        where: {
          isActive: false,
        },
      });

      // Total number of projects
      const totalProjectCount = await this.prisma.projects.count();

      // Total number of organizations
      const totalOrganizationsCount = await this.prisma.organizations.count();

      const response = {
        users: {
          total: totalUserCount,
          active: monthlyActiveUserCount,
          deactivatedAccounts: deactivatedAccountsCount,
        },
        projects: {
          total: totalProjectCount,
        },
        organizations: {
          total: totalOrganizationsCount,
        },
      };

      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get summary. Please try again later.',
      );
    }
  }
}
