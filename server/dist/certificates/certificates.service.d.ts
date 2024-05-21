import { PrismaService } from 'src/prisma/prisma.service';
export declare class CertificatesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
        dateGiven: Date;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CertificatesClient<{
        user: {
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
        dateGiven: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
