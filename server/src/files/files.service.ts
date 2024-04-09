import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs-extra';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async changeProfileImage(email: string, file: Express.Multer.File) {
    try {
      // Check if the user exists
      const existingUser = await this.prisma.users.findUnique({
        where: { email },
      });

      if (!existingUser) {
        throw new NotFoundException();
      }

      // If the user has a profile picture, delete the existing one
      if (existingUser.profilePictureId) {
        const existingFile = await this.prisma.files.delete({
          where: { id: existingUser.profilePictureId },
        });

        try {
          await fs.remove(`${existingFile.filePath}`);
        } catch (error) {
          throw new InternalServerErrorException();
        }
      }

      // Create a new record in the files table
      const newFile = await this.prisma.files.create({
        data: {
          filename: file.filename,
          filePath: `./uploads/profile-pictures/${file.filename}`,
          fileType: file.mimetype,
          size: file.size,
        },
      });

      // Update the user with the created file
      await this.prisma.users.update({
        where: { email },
        data: {
          profilePictureId: newFile.id,
        },
      });

      return { massage: 'User profile picture updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User with specified email does not exist');
      } else {
        throw new InternalServerErrorException(
          'Failed to update user profile image. Please try again later.',
        );
      }
    }
  }

  async findProfilePicturePath(email: string): Promise<string> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email, profilePictureId: { not: null } },
      });

      if (!user) {
        throw new NotFoundException();
      }

      const file = await this.prisma.files.findUnique({
        where: { id: user.profilePictureId },
      });

      return file.filePath;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          'User with specified email cannot be found',
        );
      } else {
        throw new InternalServerErrorException(
          'Error while fetching profile picture. Please try again',
        );
      }
    }
  }

  async findLogoPath(id: string): Promise<string> {
    try {
      const org = await this.prisma.organizations.findUnique({
        where: {
          id,
          logo: {
            NOT: null,
          },
        },
      });

      if (!org) {
        throw new NotFoundException();
      }

      const file = await this.prisma.files.findUnique({
        where: { id: org.logoId },
      });

      return file.filePath;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          'Organization with specified ID cannot be found',
        );
      } else {
        throw new InternalServerErrorException(
          'Error while fetching profile picture. Please try again',
        );
      }
    }
  }

  async deleteProfilePicture(id: string) {
    // Check if the user exists and has profile picture
    const user = await this.prisma.users.findUnique({
      where: { id, profilePictureId: { not: null } },
    });

    if (!user) {
      throw new NotFoundException(
        'A user with the specified ID cannot be found',
      );
    }

    // Delete the record from files table
    const file = await this.prisma.files.delete({
      where: { id: user.profilePictureId },
    });

    // Delete the file from the file system
    try {
      await fs.remove(file.filePath);
    } catch (err) {
      throw new InternalServerErrorException(
        'Failed to delete the file from the file system',
      );
    }

    try {
      await this.prisma.users.update({
        where: { id },
        data: {
          profilePictureId: null,
        },
      });

      return { message: 'Profile picture deleted successful' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while deleting profile picture. Please try again',
      );
    }
  }
}
