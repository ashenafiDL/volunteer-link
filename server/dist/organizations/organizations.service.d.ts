import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(ownerId: string, createOrganizationDto: CreateOrganizationDto): Promise<{
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
    }>;
    getOrg(identifier: string): Promise<{
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
    }>;
    updateById(id: string, updateOrgDto: UpdateOrganizationDto): Promise<{
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
    }>;
    findAll(): Promise<({
        location: {
            id: string;
            name: string;
            code: string;
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
    })[]>;
}
