import { NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from 'src/auth/dto/create-admin.dto';
import { EducationInfoDto } from './dto/education-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UserController {
    private userService;
    constructor(userService: UsersService);
    getMe(req: any): Promise<any>;
    getUserByUsername(username: string): Promise<any>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<any>;
    updateEducation(req: any, educationId: string, updateEducationInfoDto: EducationInfoDto): Promise<{
        message: string;
    }>;
    removeEducation(req: any, educationId: string): Promise<{
        message: string;
    }>;
    deactivateAccount(req: any): Promise<import("@nestjs/common").ConflictException | NotFoundException | {
        message: string;
    }>;
    delete(req: any): Promise<{
        message: string;
    }>;
    removeSkill(req: any, skillId: string): Promise<{
        message: string;
    }>;
    getContributions(userId: string): Promise<({
        project: {
            organization: {
                id: string;
                name: string;
                mission: string;
                aboutUs: string;
                websiteUrl: string;
                isActive: boolean;
                locationId: string;
                contactEmail: string;
                contactPhone: string;
                foundingDate: Date;
                logoId: string;
                permitId: string;
                verified: boolean;
                createdAt: Date;
            };
        } & {
            id: string;
            organizationId: string;
            title: string;
            description: string;
            isActive: boolean;
            locationId: string;
            startDate: Date;
            endDate: Date;
            timeCommitment: import(".prisma/client").$Enums.TimePreference;
            status: import(".prisma/client").$Enums.ProjectStatus;
            provideCertificate: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        projectId: string;
        message: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        createdAt: Date;
    })[]>;
    getAll(): Promise<({
        role: {
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        };
        location: {
            id: string;
            name: string;
            code: string;
        };
        organization: {
            id: string;
            name: string;
            mission: string;
            aboutUs: string;
            websiteUrl: string;
            isActive: boolean;
            locationId: string;
            contactEmail: string;
            contactPhone: string;
            foundingDate: Date;
            logoId: string;
            permitId: string;
            verified: boolean;
            createdAt: Date;
        };
    } & {
        id: string;
        firstName: string;
        lastName: string;
        gender: import(".prisma/client").$Enums.Gender;
        age: number;
        username: string;
        email: string;
        emailVerified: boolean;
        bio: string;
        socialLinks: import(".prisma/client").Prisma.JsonValue[];
        password: string;
        roleId: string;
        locationId: string;
        profilePictureId: string;
        cvId: string;
        organizationId: string;
        lastLoggedInAt: Date;
        verified: boolean;
        token: string;
        verificationCode: string;
        resetCode: string;
        locationPreference: import(".prisma/client").$Enums.LocationPreference;
        timePreference: import(".prisma/client").$Enums.TimePreference;
        notificationPreference: import(".prisma/client").Prisma.JsonValue[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    })[]>;
    updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    registerAdmin(createAdminDto: CreateAdminDto): Promise<{
        role: {
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        firstName: string;
        lastName: string;
        gender: import(".prisma/client").$Enums.Gender;
        age: number;
        username: string;
        email: string;
        emailVerified: boolean;
        bio: string;
        socialLinks: import(".prisma/client").Prisma.JsonValue[];
        password: string;
        roleId: string;
        locationId: string;
        profilePictureId: string;
        cvId: string;
        organizationId: string;
        lastLoggedInAt: Date;
        verified: boolean;
        token: string;
        verificationCode: string;
        resetCode: string;
        locationPreference: import(".prisma/client").$Enums.LocationPreference;
        timePreference: import(".prisma/client").$Enums.TimePreference;
        notificationPreference: import(".prisma/client").Prisma.JsonValue[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    }>;
}
