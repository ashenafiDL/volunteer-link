import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationInfoDto } from './dto/education-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(newUser: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        locationId: string;
    }): Promise<{
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
    createAdmin(newAdmin: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }): Promise<{
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
    findOne(selector: string): Promise<{
        certificates: {
            id: string;
            userId: string;
            projectId: string;
            dateGiven: Date;
        }[];
        applications: {
            id: string;
            userId: string;
            projectId: string;
            message: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
        }[];
        donations: {
            id: string;
            userId: string;
            projectId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            date: Date;
        }[];
        messages: {
            id: string;
            senderId: string;
            projectId: string;
            content: string;
            contentType: import(".prisma/client").$Enums.MessageContentType;
            createdAt: Date;
            updatedAt: Date;
        }[];
        reviews: {
            id: string;
            userId: string;
            projectId: string;
            comment: string;
            rating: number;
            createdAt: Date;
        }[];
        skills: ({
            category: {
                id: string;
                name: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        })[];
        badges: ({
            badge: {
                id: string;
                name: string;
                threshold: number;
                description: string;
            };
        } & {
            userId: string;
            badgeId: string;
            dateGiven: Date;
        })[];
        reports: {
            id: string;
            reporterId: string;
            contentType: import(".prisma/client").$Enums.ReportContentTypes;
            contentId: string;
            reason: import(".prisma/client").$Enums.ReportReasons;
            description: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            createdAt: Date;
        }[];
        tasks: {
            id: string;
            projectId: string;
            title: string;
            description: string;
            status: import(".prisma/client").$Enums.TaskStatus;
            deadline: Date;
            asignedToId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        education: {
            id: string;
            field: string;
            institute: string;
            startDate: Date;
            endDate: Date;
            description: string;
            usersId: string;
        }[];
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
        profilePicture: {
            id: string;
            filename: string;
            fileType: string;
            filePath: string;
            size: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
        };
        organization: {
            projects: {
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
            }[];
            location: {
                id: string;
                name: string;
                code: string;
            };
            _count: {
                projects: number;
            };
            logo: {
                id: string;
                filename: string;
                fileType: string;
                filePath: string;
                size: import("@prisma/client/runtime/library").Decimal;
                createdAt: Date;
            };
            permit: {
                id: string;
                filename: string;
                fileType: string;
                filePath: string;
                size: import("@prisma/client/runtime/library").Decimal;
                createdAt: Date;
            };
            owner: {
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
            };
        } & {
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
    }>;
    me(id: string): Promise<{
        certificates: {
            id: string;
            userId: string;
            projectId: string;
            dateGiven: Date;
        }[];
        applications: {
            id: string;
            userId: string;
            projectId: string;
            message: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
        }[];
        donations: {
            id: string;
            userId: string;
            projectId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            date: Date;
        }[];
        messages: {
            id: string;
            senderId: string;
            projectId: string;
            content: string;
            contentType: import(".prisma/client").$Enums.MessageContentType;
            createdAt: Date;
            updatedAt: Date;
        }[];
        reviews: {
            id: string;
            userId: string;
            projectId: string;
            comment: string;
            rating: number;
            createdAt: Date;
        }[];
        skills: ({
            category: {
                id: string;
                name: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        })[];
        badges: ({
            badge: {
                id: string;
                name: string;
                threshold: number;
                description: string;
            };
        } & {
            userId: string;
            badgeId: string;
            dateGiven: Date;
        })[];
        reports: {
            id: string;
            reporterId: string;
            contentType: import(".prisma/client").$Enums.ReportContentTypes;
            contentId: string;
            reason: import(".prisma/client").$Enums.ReportReasons;
            description: string;
            status: import(".prisma/client").$Enums.ReportStatus;
            createdAt: Date;
        }[];
        tasks: {
            id: string;
            projectId: string;
            title: string;
            description: string;
            status: import(".prisma/client").$Enums.TaskStatus;
            deadline: Date;
            asignedToId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        education: {
            id: string;
            field: string;
            institute: string;
            startDate: Date;
            endDate: Date;
            description: string;
            usersId: string;
        }[];
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
        profilePicture: {
            id: string;
            filename: string;
            fileType: string;
            filePath: string;
            size: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
        };
        organization: {
            projects: {
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
            }[];
            location: {
                id: string;
                name: string;
                code: string;
            };
            _count: {
                projects: number;
            };
            logo: {
                id: string;
                filename: string;
                fileType: string;
                filePath: string;
                size: import("@prisma/client/runtime/library").Decimal;
                createdAt: Date;
            };
            permit: {
                id: string;
                filename: string;
                fileType: string;
                filePath: string;
                size: import("@prisma/client/runtime/library").Decimal;
                createdAt: Date;
            };
            owner: {
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
            };
        } & {
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
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    updatePassword(id: string, hashedPassword: string): Promise<{
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
    updateEducation(id: string, educationId: string, educationInfo: EducationInfoDto): Promise<{
        message: string;
    }>;
    deleteEducation(id: string, educationId: string): Promise<{
        message: string;
    }>;
    deactivateAccount(id: string): Promise<ConflictException | NotFoundException | {
        message: string;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    removeSkill(userId: string, skillId: string): Promise<{
        message: string;
    }>;
    isActive(id?: string, username?: string, email?: string): Promise<boolean>;
    fetchContributions(id: string): Promise<({
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
    findAll(): Promise<({
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
    sanitizeUserData(user: any): any;
}
