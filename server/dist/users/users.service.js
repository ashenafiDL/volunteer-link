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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(newUser) {
        try {
            const existingEmail = await this.prisma.users.findFirst({
                where: { email: newUser.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('There is already an account with that email');
            }
            const existingUsername = await this.prisma.users.findFirst({
                where: { username: newUser.username },
            });
            if (existingUsername) {
                throw new common_1.ConflictException('There is already a user with that username');
            }
            const checkLocation = await this.prisma.locations.findUnique({
                where: {
                    id: newUser.locationId,
                },
            });
            if (!checkLocation) {
                throw new common_1.NotFoundException('Specified location does not exist');
            }
            const volunteerRole = await this.prisma.roles.findFirst({
                where: {
                    name: 'Volunteer',
                },
            });
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashedPassword;
            const createdUser = await this.prisma.users.create({
                data: {
                    ...newUser,
                    roleId: volunteerRole.id,
                    notificationPreference: [
                        { option: 'task_assigned', value: true },
                        { option: 'new_project_recommendation', value: true },
                        { option: 'project_status_update', value: true },
                        { option: 'deadlines', value: true },
                        { option: 'application_status_update', value: true },
                        { option: 'badge_and_certificate', value: true },
                    ],
                    socialLinks: [
                        { platform: 'LinkedIn', url: null },
                        { platform: 'GitHub', url: null },
                        { platform: 'Behance', url: null },
                        { platform: 'Instagram', url: null },
                        { platform: 'Dribbble', url: null },
                        { platform: 'Website', url: null },
                    ],
                },
                include: {
                    role: true,
                },
            });
            return createdUser;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create a new user');
            }
        }
    }
    async createAdmin(newAdmin) {
        try {
            const existingEmail = await this.prisma.users.findFirst({
                where: { email: newAdmin.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('There is already an account with that email');
            }
            const existingUsername = await this.prisma.users.findFirst({
                where: { username: newAdmin.username },
            });
            if (existingUsername) {
                throw new common_1.ConflictException('There is already a user with that username');
            }
            const adminRole = await this.prisma.roles.findFirst({
                where: {
                    name: 'Admin',
                },
            });
            const hashedPassword = await bcrypt.hash(newAdmin.password, 10);
            newAdmin.password = hashedPassword;
            const createdUser = await this.prisma.users.create({
                data: {
                    ...newAdmin,
                    roleId: adminRole.id,
                },
                include: {
                    role: true,
                },
            });
            return createdUser;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create a new user');
            }
        }
    }
    async findOne(selector) {
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
                    badges: {
                        include: {
                            badge: true,
                        },
                        orderBy: {
                            badge: {
                                threshold: 'asc',
                            },
                        },
                    },
                    certificates: true,
                    skills: {
                        include: {
                            category: true,
                        },
                    },
                    education: true,
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
                            _count: {
                                select: {
                                    projects: {
                                        where: {
                                            status: 'DONE',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!user)
                throw new common_1.NotFoundException();
            else
                return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to find user');
            }
        }
    }
    async me(id) {
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
                    badges: {
                        include: {
                            badge: true,
                        },
                        orderBy: {
                            badge: {
                                threshold: 'asc',
                            },
                        },
                    },
                    certificates: true,
                    skills: {
                        include: {
                            category: true,
                        },
                    },
                    education: true,
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
                            _count: {
                                select: {
                                    projects: {
                                        where: {
                                            status: 'DONE',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!user)
                throw new common_1.NotFoundException();
            else
                return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to find user');
            }
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            const existingUser = await this.prisma.users.findFirst({
                where: { id: id },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException();
            }
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
                    throw new common_1.ConflictException();
                }
            }
            const user = await this.prisma.users.update({
                where: {
                    id: id,
                },
                data: {
                    ...updateUserDto,
                    timePreference: updateUserDto.timePreference,
                    locationPreference: updateUserDto.locationPreference,
                    socialLinks: updateUserDto.socialLinks,
                    notificationPreference: updateUserDto.notificationPreference,
                    gender: updateUserDto.gender,
                    skills: {
                        connect: updateUserDto.skills?.map((id) => ({ id })),
                    },
                    education: {
                        create: updateUserDto.education,
                    },
                },
            });
            return this.sanitizeUserData(user);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('Please enter a unique username and email address');
            }
            else if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('User not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update user');
            }
        }
    }
    async updatePassword(id, hashedPassword) {
        try {
            const user = await this.prisma.users.update({
                where: {
                    id: id,
                },
                data: {
                    password: hashedPassword,
                },
                include: {
                    role: true,
                },
            });
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update user password');
        }
    }
    async updateEducation(id, educationId, educationInfo) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: {
                    id: id,
                },
            });
            const educationExists = await this.prisma.education.findUnique({
                where: {
                    id: educationId,
                },
            });
            if (!userExists || !educationExists) {
                throw new common_1.NotFoundException();
            }
            await this.prisma.education.update({
                where: {
                    id: educationId,
                },
                data: educationInfo,
            });
            return { message: 'Education updated successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('User or education not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update education');
            }
        }
    }
    async deleteEducation(id, educationId) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: {
                    id: id,
                },
            });
            const educationExists = await this.prisma.education.findUnique({
                where: {
                    id: educationId,
                },
            });
            if (!userExists || !educationExists) {
                throw new common_1.NotFoundException();
            }
            await this.prisma.users.update({
                where: { id: id },
                data: {
                    education: {
                        disconnect: { id: educationId },
                    },
                },
            });
            await this.prisma.education.delete({
                where: {
                    id: educationId,
                },
            });
            return { message: 'Education deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('User or education not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to delete education');
            }
        }
    }
    async deactivateAccount(id) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException("User doesn't exist");
            }
            const isActive = await this.isActive(id);
            if (!isActive) {
                throw new common_1.ConflictException('Account already deactivated');
            }
            await this.prisma.users.update({
                where: {
                    id: id,
                },
                data: {
                    isActive: false,
                },
            });
            return {
                message: 'Account deactivated successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to deactivate account');
            }
        }
    }
    async deleteUser(id) {
        try {
            await this.prisma.users.delete({
                where: {
                    id: id,
                },
            });
            return {
                message: 'Account deleted successfully',
            };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to delete user');
        }
    }
    async removeSkill(userId, skillId) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException();
            }
            await this.prisma.users.update({
                where: { id: userId },
                data: {
                    skills: {
                        disconnect: { id: skillId },
                    },
                },
            });
            return { message: 'Skill removed successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('A user with specified id was not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to remove skill. Please try again later.');
            }
        }
    }
    async isActive(id, username, email) {
        try {
            const user = await this.prisma.users.findFirst({
                where: {
                    OR: [{ id: id }, { username: username }, { email: email }],
                },
            });
            if (!user)
                return false;
            else
                return user.isActive;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to check if user is active. Please try again later.');
        }
    }
    async fetchContributions(id) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const contributions = await this.prisma.applications.findMany({
                where: {
                    AND: [
                        { userId: id },
                        { status: 'ACCEPTED' },
                        {
                            project: {
                                status: 'DONE',
                            },
                        },
                    ],
                },
                include: {
                    project: {
                        include: {
                            organization: true,
                        },
                    },
                },
            });
            return contributions;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to fetch contributions');
            }
        }
    }
    async findAll() {
        try {
            const users = await this.prisma.users.findMany({
                include: {
                    role: true,
                    location: true,
                    organization: true,
                },
            });
            return users;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch users');
        }
    }
    sanitizeUserData(user) {
        const { password, verificationCode, resetCode, ...userWithoutSensitive } = user;
        const sanitizedUser = { ...userWithoutSensitive };
        return sanitizedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map