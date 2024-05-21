import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    private emailService;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService, emailService: EmailService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyEmail(verifyCodeDto: VerifyCodeDto): Promise<any>;
    signIn(email: string, pass: string): Promise<any>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyResetCode(verifyCodeDto: VerifyCodeDto): Promise<{
        isValid: boolean;
        token: string;
    }>;
    updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<any>;
    resetPassword(email: string, newPassword: string): Promise<any>;
    generateTokenAndUpdateUser(payload: {
        sub: string;
        email: string;
        role: string;
    }): Promise<any>;
    generatePasswordResetCode(userId: string, email: string, role: string): Promise<string>;
    generateEmailVerificationCode(userId: string, email: string, role: string): Promise<string>;
    validateToken(token: string): Promise<{
        isValid: boolean;
        token: string;
    }>;
}
