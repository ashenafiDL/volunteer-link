import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Gender, LocationPreference, TimePreference } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationInfoDto } from './dto/education-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(newUser: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    locationId: string;
  }) {
    try {
      // Check for username and email uniqueness
      const existingEmail = await this.prisma.users.findFirst({
        where: { email: newUser.email },
      });

      if (existingEmail) {
        throw new ConflictException(
          'There is already an account with that email',
        );
      }

      const existingUsername = await this.prisma.users.findFirst({
        where: { username: newUser.username },
      });

      if (existingUsername) {
        throw new ConflictException(
          'There is already a user with that username',
        );
      }

      const checkLocation = await this.prisma.locations.findUnique({
        where: {
          id: newUser.locationId,
        },
      });

      if (!checkLocation) {
        throw new NotFoundException('Specified location does not exist');
      }

      const volunteerRole = await this.prisma.roles.findFirst({
        where: {
          name: 'Volunteer',
        },
      });

      // Encrypt the password
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;

      const createdUser = await this.prisma.users.create({
        data: {
          ...newUser,
          roleId: volunteerRole.id,
          // Make default notification preferences to true
          notificationPreference: [
            { option: 'task_assigned', value: true },
            { option: 'new_project_recommendation', value: true },
            { option: 'project_status_update', value: true },
            { option: 'deadlines', value: true },
            { option: 'application_status_update', value: true },
            { option: 'badge_and_certificate', value: true },
          ],
          // Make default social links to null
          socialLinks: [
            { platform: 'LinkedIn', url: null },
            { platform: 'GitHub', url: null },
            { platform: 'Behance', url: null },
            { platform: 'Instagram', url: null },
            { platform: 'Dribbble', url: null },
            { platform: 'Website', url: null },
          ],
        },
      });

      // Wait 15 minutes (900,000ms == 15m) and
      // if the email is not verified delete the temporary user account
      setTimeout(async () => {
        const user = await this.prisma.users.findUnique({
          where: { id: createdUser.id },
        });
        if (user.emailVerified === false) {
          await this.prisma.users.delete({
            where: { id: user.id },
          });
        }
      }, 900000);

      return createdUser;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to create a new user');
      }
    }
  }

  async findOne(selector: string) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          OR: [{ id: selector }, { username: selector }, { email: selector }],
        },
        include: {
          role: true,
          location: true,
          profilePicture: true,
          applications: true,
          badges: true,
          certificates: true,
          skills: {
            include: {
              category: true,
            },
          },
          education: true,
          contributions: true,
          donations: true,
          messages: true,
          reports: true,
          reviews: true,
          tasks: true,
          organization: true,
        },
      });

      if (!user) throw new NotFoundException();
      else return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to find user');
      }
    }
  }

  async me(id: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
        include: {
          role: true,
          location: true,
          profilePicture: true,
          applications: true,
          badges: true,
          certificates: true,
          skills: {
            include: {
              category: true,
            },
          },
          education: true,
          contributions: true,
          donations: true,
          messages: true,
          reports: true,
          reviews: true,
          tasks: true,
          organization: {
            include: {
              location: true,
              logo: true,
              owner: true,
              permit: true,
              projects: true,
            },
          },
        },
      });

      if (!user) throw new NotFoundException();
      else return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to find user');
      }
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      // check if user already exists
      const existingUser = await this.prisma.users.findFirst({
        where: { id: id },
      });

      if (!existingUser) {
        throw new NotFoundException();
      }

      // Check if username and email already exists
      if (updateUserDto.username || updateUserDto.email) {
        const checkConflict = await this.prisma.users.findFirst({
          where: {
            OR: [
              { username: updateUserDto.username },
              { email: updateUserDto.email },
            ],
          },
        });

        if (checkConflict && checkConflict.id !== id) {
          throw new ConflictException();
        }
      }

      const user = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: {
          ...updateUserDto,
          timePreference: updateUserDto.timePreference as TimePreference,
          locationPreference:
            updateUserDto.locationPreference as LocationPreference,
          socialLinks: updateUserDto.socialLinks as any,
          notificationPreference: updateUserDto.notificationPreference as any,
          gender: updateUserDto.gender as Gender,
          skills: {
            connect: updateUserDto.skills?.map((id) => ({ id })),
          },
          education: {
            create: updateUserDto.education,
          },
        },
      });

      return this.sanitizeUserData(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(
          'Please enter a unique username and email address',
        );
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      } else {
        throw new InternalServerErrorException('Failed to update user');
      }
    }
  }

  async updatePassword(id: string, hashedPassword: string) {
    try {
      const user = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user password');
    }
  }

  async updateEducation(
    id: string,
    educationId: string,
    educationInfo: EducationInfoDto,
  ) {
    try {
      // Check if the user exists
      const userExists = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      // Check the specified education exists
      const educationExists = await this.prisma.education.findUnique({
        where: {
          id: educationId,
        },
      });

      if (!userExists || !educationExists) {
        throw new NotFoundException();
      }

      // Update the user's education
      await this.prisma.education.update({
        where: {
          id: educationId,
        },
        data: educationInfo,
      });

      return { message: 'Education updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User or education not found');
      } else {
        throw new InternalServerErrorException('Failed to update education');
      }
    }
  }

  async deleteEducation(id: string, educationId: string) {
    try {
      // Check if user exists
      const userExists = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      // Check if education exists
      const educationExists = await this.prisma.education.findUnique({
        where: {
          id: educationId,
        },
      });

      if (!userExists || !educationExists) {
        throw new NotFoundException();
      }

      // Disconnect the education info from the user profile
      await this.prisma.users.update({
        where: { id: id },
        data: {
          education: {
            disconnect: { id: educationId },
          },
        },
      });

      // Delete the education info record from the database
      await this.prisma.education.delete({
        where: {
          id: educationId,
        },
      });

      return { message: 'Education deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User or education not found');
      } else {
        throw new InternalServerErrorException('Failed to delete education');
      }
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.users.delete({
        where: {
          id: id,
        },
      });

      return {
        message: 'Account deleted successfully',
      };
    } catch (err) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async removeSkill(userId: string, skillId: string) {
    try {
      // Check if the user exists
      const user = await this.prisma.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException();
      }

      // Remove skill from the user profile
      await this.prisma.users.update({
        where: { id: userId },
        data: {
          skills: {
            disconnect: { id: skillId },
          },
        },
      });

      return { message: 'Skill removed successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('A user with specified id was not found');
      } else {
        throw new InternalServerErrorException(
          'Failed to remove skill. Please try again later.',
        );
      }
    }
  }

  // Helper function to remove sensitive information from user data
  sanitizeUserData(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, verificationCode, resetCode, ...userWithoutSensitive } =
      user;
    const sanitizedUser = { ...userWithoutSensitive };
    return sanitizedUser;
  }
}
