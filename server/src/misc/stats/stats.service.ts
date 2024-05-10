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

  async getAgeAndGenderCount() {
    try {
      const genderCount = await this.prisma.users.groupBy({
        by: ['gender'],
        _count: {
          _all: true,
        },
      });

      const _18to34 = await this.prisma.users.count({
        where: {
          age: {
            gte: 18,
            lte: 34,
          },
        },
      });
      const _35to54 = await this.prisma.users.count({
        where: {
          age: {
            gte: 35,
            lte: 54,
          },
        },
      });
      const _55to74 = await this.prisma.users.count({
        where: {
          age: {
            gte: 55,
            lte: 74,
          },
        },
      });
      const _75AndMore = await this.prisma.users.count({
        where: {
          age: {
            gte: 75,
          },
        },
      });

      const gender = [];
      for (const item of genderCount) {
        const bb = {
          name: item.gender,
          value: item._count._all,
        };

        gender.push(bb);
      }

      return {
        gender: gender,
        age: [
          { name: '18-34', value: _18to34 },
          { name: '35-54', value: _35to54 },
          { name: '55-74', value: _55to74 },
          { name: '75 And More', value: _75AndMore },
        ],
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to load data.');
    }
  }

  async projectStat() {
    try {
      const res = [];

      const shortTerm1 = await this.countProjects('NOT_STARTED', 'SHORT_TERM');
      const longTerm1 = await this.countProjects('NOT_STARTED', 'LONG_TERM');
      const inPerson1 = await this.countProjects(
        'NOT_STARTED',
        null,
        'IN_PERSON',
      );
      const remote1 = await this.countProjects('NOT_STARTED', null);

      res.push({
        name: 'Not Started',
        shortTerm: shortTerm1,
        longTerm: longTerm1,
        inPerson: inPerson1,
        remote: remote1,
      });

      const shortTerm2 = await this.countProjects('IN_PROGRESS', 'SHORT_TERM');
      const longTerm2 = await this.countProjects('IN_PROGRESS', 'LONG_TERM');
      const inPerson2 = await this.countProjects(
        'IN_PROGRESS',
        null,
        'IN_PERSON',
      );
      const remote2 = await this.countProjects('IN_PROGRESS', null);

      res.push({
        name: 'In Progress',
        shortTerm: shortTerm2,
        longTerm: longTerm2,
        inPerson: inPerson2,
        remote: remote2,
      });

      const shortTerm3 = await this.countProjects('DONE', 'SHORT_TERM');
      const longTerm3 = await this.countProjects('DONE', 'LONG_TERM');
      const inPerson3 = await this.countProjects('DONE', null, 'IN_PERSON');
      const remote3 = await this.countProjects('DONE', null);

      res.push({
        name: 'Done',
        shortTerm: shortTerm3,
        longTerm: longTerm3,
        inPerson: inPerson3,
        remote: remote3,
      });

      return res;
    } catch (error) {}
  }

  async verifiedAndNotVerified() {
    try {
      const verifiedUser = await this.prisma.users.findMany({
        where: {
          emailVerified: true,
        },
      });
      const notVerifiedUser = await this.prisma.users.findMany({
        where: {
          emailVerified: false,
        },
      });
      const verifiedOrg = await this.prisma.organizations.findMany({
        where: {
          verified: true,
        },
      });
      const notVerifiedOrg = await this.prisma.organizations.findMany({
        where: {
          verified: false,
        },
      });

      return [
        {
          name: 'Users',
          verified: verifiedUser.length,
          unverified: notVerifiedUser.length,
        },
        {
          name: 'Org',
          verified: verifiedOrg.length,
          unverified: notVerifiedOrg.length,
        },
      ];
    } catch (error) {}
  }

  async countProjects(status, timeCommitment = null, locationId = null) {
    const whereConditions = [];
    whereConditions.push({ status: status });

    if (timeCommitment) {
      whereConditions.push({ timeCommitment: timeCommitment });
    }

    if (locationId !== null && locationId === 'IN_PERSON') {
      whereConditions.push({ locationId: { not: null } });
    } else {
      whereConditions.push({ locationId: null });
    }

    const count = await this.prisma.projects.count({
      where: {
        AND: whereConditions,
      },
    });

    return count;
  }
}
