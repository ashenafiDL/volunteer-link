import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);

      const fullName = `${newUser.firstName} ${newUser.lastName}`;

      this.emailService.sendAccountCreatedConfirmation(newUser.email, fullName);

      return this.generateTokenAndUpdateUser({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Failed to create user. Please try again later.',
        );
      }
    }
  }

  async signIn(email: string, pass: string): Promise<any> {
    try {
      // Find the user with the given email
      const user = await this.usersService.findOne(email);

      const passwordsMatch = await bcrypt.compare(pass, user.password);

      // Validate if the user exists and if passwords match using bcrypt
      if (!user || !passwordsMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate the JWT token with minimal user information
      const payload = {
        sub: user.id,
        email: user.email,
      };

      return this.generateTokenAndUpdateUser(payload);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Failed to sign in. Please try again later.',
        );
      }
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const user = await this.usersService.findOne(forgotPasswordDto.email);

      if (!user) {
        throw new NotFoundException();
      }

      const fullName = `${user.firstName} ${user.lastName}`;
      const resetCode = await this.generatePasswordResetCode(
        user.id,
        user.email,
      );

      return this.emailService.sendPasswordResetCode(
        user.email,
        resetCode,
        fullName,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('A user with that email cannot be found');
      } else {
        throw new InternalServerErrorException(
          'Failed to send password reset code. Please try again later.',
        );
      }
    }
  }

  async verifyResetCode(verifyResetCodeDto: VerifyResetCodeDto) {
    try {
      const user = await this.usersService.findOne(verifyResetCodeDto.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isMatch = await bcrypt.compare(
        verifyResetCodeDto.resetCode,
        user.resetCode,
      );

      if (isMatch) {
        return this.validateToken(user.token);
      } else {
        throw new NotAcceptableException('verification code incorrect');
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof NotAcceptableException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Failed to verify reset code. Please try again later.',
        );
      }
    }
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      const user = await this.usersService.findOne(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await this.usersService.updatePassword(
        user.id,
        hashedPassword,
      );

      const fullName = `${updatedUser.firstName} ${updatedUser.lastName}`;

      this.emailService.sendPasswordChangeConfirmation(
        updatedUser.email,
        fullName,
      );

      return this.generateTokenAndUpdateUser({
        sub: updatedUser.id,
        email: updatedUser.email,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Failed to reset password. Please try again later.',
        );
      }
    }
  }

  // A helper function to generate a JWT token and update user information
  // the function returns user data without sensitive information
  async generateTokenAndUpdateUser(payload: { sub: string; email: string }) {
    try {
      const token = await this.jwtService.signAsync(payload);

      const updatedUser = await this.prisma.users.update({
        where: { id: payload.sub },
        data: {
          token: token,
          lastLoggedInAt: new Date(),
        },
      });

      const userWithoutSensitive =
        this.usersService.sanitizeUserData(updatedUser);

      return { ...userWithoutSensitive };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to generate token and update user. Please try again later.',
      );
    }
  }

  // A helper function to generate a password reset code
  async generatePasswordResetCode(userId: string, email: string) {
    try {
      const resetCode = randomBytes(3).toString('hex');

      const payload = {
        sub: userId,
        resetCode: resetCode,
        email: email,
      };

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: jwtConstants.secret,
      });

      const hashedResetCode = await bcrypt.hash(resetCode, 10);

      await this.usersService.updateUser(userId, {
        resetCode: hashedResetCode,
        token: token,
      });

      return resetCode;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to generate reset code. Please try again later.',
      );
    }
  }

  // A helper function to validate JWT tokens
  async validateToken(token: string) {
    try {
      // decode the token.
      const decodedToken = await this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      // convert milliseconds to seconds.
      const now = Date.now() / 1000;

      // token not expired.
      if (decodedToken.exp >= now) {
        return {
          isValid: true,
          token: token,
        };
      }
    } catch (error) {
      throw new RequestTimeoutException('token expired');
    }
  }
}
