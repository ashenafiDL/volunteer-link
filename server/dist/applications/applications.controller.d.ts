import { ApplicationsService } from './applications.service';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    checkApplication(req: any, projectId: string): Promise<{
        applied: boolean;
    }>;
    getMyApplications(req: any): Promise<{
        pending: ({
            project: {
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
        })[];
        accepted: ({
            project: {
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
        })[];
        rejected: ({
            project: {
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
        })[];
    }>;
    getApplicationsByProjectId(projectId: string): Promise<{
        pending: ({
            user: {
                location: {
                    id: string;
                    name: string;
                    code: string;
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
            };
        } & {
            id: string;
            userId: string;
            projectId: string;
            message: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
        })[];
        accepted: ({
            user: {
                id: string;
                firstName: string;
                lastName: string;
                gender: import(".prisma/client").$Enums.Gender;
                age: number;
                username: string;
                email: string;
                bio: string;
            };
        } & {
            id: string;
            userId: string;
            projectId: string;
            message: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
        })[];
        rejected: ({
            user: {
                id: string;
                firstName: string;
                lastName: string;
                gender: import(".prisma/client").$Enums.Gender;
                age: number;
                username: string;
                email: string;
                bio: string;
            };
        } & {
            id: string;
            userId: string;
            projectId: string;
            message: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            createdAt: Date;
        })[];
    }>;
    acceptApplication(applicationId: string): Promise<{
        message: string;
    }>;
    rejectApplication(applicationId: string): Promise<{
        message: string;
    }>;
}
