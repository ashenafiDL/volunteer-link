import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// Weights for recommendation score
const SKILLS_WEIGHT = 20;
const LOCATION_WEIGHT = 10;
const TIME_WEIGHT = 10;

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async recommendProject(projectId: string) {
    try {
      // Check if user exists
      const user = await this.prisma.users.findUnique({
        where: { id: projectId },
        include: {
          skills: true,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Fetch projects
      const projects = await this.prisma.projects.findMany({
        include: {
          skillsRequired: {
            include: {
              skill: true,
            },
          },
          location: true,
        },
      });

      // Calculate recommendation score
      const recommendations = projects.map((project) => {
        let score = 0;

        // Skill Matching
        const userSkills = user.skills.map((skill) => skill.id);
        const projectSkills = project.skillsRequired.map(
          (skill) => skill.skillId,
        );
        const matchingSkills = userSkills.filter((skill) =>
          projectSkills.includes(skill),
        );
        score += matchingSkills.length * SKILLS_WEIGHT;

        // Location Preference
        if (
          user.locationPreference === 'BOTH' ||
          (user.locationPreference === 'IN_PERSON' &&
            project.locationId === user.locationId) ||
          (user.locationPreference === 'REMOTE' && !project.locationId)
        ) {
          score += LOCATION_WEIGHT;
        }

        // Time Preference
        if (
          user.timePreference === 'BOTH' ||
          user.timePreference === project.timeCommitment
        ) {
          score += TIME_WEIGHT;
        }

        return { project, score };
      });

      const filteredRecommendations = recommendations.filter(
        (recommendation) => recommendation.score > 0,
      );
      filteredRecommendations.sort((a, b) => b.score - a.score);

      return filteredRecommendations;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return error;
      } else {
        throw new InternalServerErrorException(
          'Failed to fetch recommendations. Please try again later.',
        );
      }
    }
  }
}
