"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, prisma, emailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async register(createUserDto) {
        try {
            const newUser = await this.usersService.createUser(createUserDto);
            const fullName = `${newUser.firstName} ${newUser.lastName}`;
            const verificationCode = await this.generateEmailVerificationCode(newUser.id, newUser.email, newUser.role.name);
            try {
                return this.emailService.sendEmailVerificationCode(newUser.email, fullName, verificationCode);
            }
            catch (error) {
                this.prisma.users.delete({ where: { id: newUser.id } });
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create user. Please try again later.');
            }
        }
    }
    async verifyEmail(verifyCodeDto) {
        try {
            const user = await this.usersService.findOne(verifyCodeDto.email);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const isMatch = await bcrypt.compare(verifyCodeDto.code, user.verificationCode);
            if (isMatch) {
                const tokenValid = await this.validateToken(user.token);
                if (tokenValid.isValid) {
                    await this.prisma.users.update({
                        where: { id: user.id },
                        data: {
                            emailVerified: true,
                        },
                    });
                    this.emailService.sendAccountCreatedConfirmation(user.email, `${user.firstName} ${user.lastName}`);
                    return this.generateTokenAndUpdateUser({
                        sub: user.id,
                        email: user.email,
                        role: user.role.name,
                    });
                }
                else {
                    throw new Error();
                }
            }
            else {
                throw new common_1.NotAcceptableException('verification code incorrect');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.NotAcceptableException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to verify reset code. Please try again later.');
            }
        }
    }
    async signIn(email, pass) {
        try {
            const user = await this.usersService.findOne(email);
            const passwordsMatch = await bcrypt.compare(pass, user.password);
            if (!user || !passwordsMatch) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = {
                sub: user.id,
                email: user.email,
                role: user.role.name,
            };
            await this.prisma.users.update({
                where: { email },
                data: {
                    isActive: true,
                },
            });
            return this.generateTokenAndUpdateUser(payload);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to sign in. Please try again later.');
            }
        }
    }
    async forgotPassword(forgotPasswordDto) {
        try {
            const user = await this.usersService.findOne(forgotPasswordDto.email);
            if (!user) {
                throw new common_1.NotFoundException();
            }
            const fullName = `${user.firstName} ${user.lastName}`;
            const resetCode = await this.generatePasswordResetCode(user.id, user.email, user.role.name);
            return this.emailService.sendPasswordResetCode(user.email, resetCode, fullName);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('A user with that email cannot be found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to send password reset code. Please try again later.');
            }
        }
    }
    async verifyResetCode(verifyCodeDto) {
        try {
            const user = await this.usersService.findOne(verifyCodeDto.email);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const isMatch = await bcrypt.compare(verifyCodeDto.code, user.resetCode);
            if (isMatch) {
                return this.validateToken(user.token);
            }
            else {
                throw new common_1.NotAcceptableException('verification code incorrect');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.NotAcceptableException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to verify reset code. Please try again later.');
            }
        }
    }
    async updatePassword(id, updatePasswordDto) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.NotFoundException();
            }
            const passwordsMatch = await bcrypt.compare(updatePasswordDto.currentPassword, user.password);
            if (!passwordsMatch) {
                throw new common_1.UnauthorizedException();
            }
            const hashedPassword = await bcrypt.hash(updatePasswordDto.password, 10);
            const updatedUser = await this.usersService.updatePassword(user.id, hashedPassword);
            const fullName = `${updatedUser.firstName} ${updatedUser.lastName}`;
            this.emailService.sendPasswordChangeConfirmation(updatedUser.email, fullName);
            return this.generateTokenAndUpdateUser({
                sub: updatedUser.id,
                email: updatedUser.email,
                role: updatedUser.role.name,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException("A user with the specified id doesn't exist");
            }
            else if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException('The password is incorrect');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to check password. Please try again later.');
            }
        }
    }
    async resetPassword(email, newPassword) {
        try {
            const user = await this.usersService.findOne(email);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await this.usersService.updatePassword(user.id, hashedPassword);
            const fullName = `${updatedUser.firstName} ${updatedUser.lastName}`;
            await this.emailService.sendPasswordChangeConfirmation(updatedUser.email, fullName);
            await this.prisma.users.update({
                where: { email },
                data: {
                    isActive: true,
                },
            });
            return this.generateTokenAndUpdateUser({
                sub: updatedUser.id,
                email: updatedUser.email,
                role: updatedUser.role.name,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to reset password. Please try again later.');
            }
        }
    }
    async generateTokenAndUpdateUser(payload) {
        try {
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
            });
            const updatedUser = await this.prisma.users.update({
                where: { id: payload.sub },
                data: {
                    token: token,
                    lastLoggedInAt: new Date(),
                },
                include: {
                    role: true,
                },
            });
            const userWithoutSensitive = this.usersService.sanitizeUserData(updatedUser);
            return { ...userWithoutSensitive };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to generate token and update user. Please try again later.');
        }
    }
    async generatePasswordResetCode(userId, email, role) {
        try {
            const resetCode = (0, crypto_1.randomBytes)(3).toString('hex');
            const payload = {
                sub: userId,
                resetCode: resetCode,
                email: email,
                role: role,
            };
            const token = await this.jwtService.signAsync(payload, {
                expiresIn: '15m',
                secret: process.env.JWT_SECRET,
            });
            const hashedResetCode = await bcrypt.hash(resetCode, 10);
            await this.usersService.updateUser(userId, {
                resetCode: hashedResetCode,
                token: token,
            });
            return resetCode;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to generate reset code. Please try again later.');
        }
    }
    async generateEmailVerificationCode(userId, email, role) {
        try {
            const verificationCode = (0, crypto_1.randomBytes)(3).toString('hex');
            const payload = {
                sub: userId,
                verificationCode: verificationCode,
                email: email,
                role: role,
            };
            const token = await this.jwtService.signAsync(payload, {
                expiresIn: '15m',
                secret: process.env.JWT_SECRET,
            });
            const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);
            await this.usersService.updateUser(userId, {
                verificationCode: hashedVerificationCode,
                token: token,
            });
            return verificationCode;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to generate email verification code. Please try again later.');
        }
    }
    async validateToken(token) {
        try {
            const decodedToken = await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            const now = Date.now() / 1000;
            if (decodedToken.exp >= now) {
                return {
                    isValid: true,
                    token: token,
                };
            }
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('token expired');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map