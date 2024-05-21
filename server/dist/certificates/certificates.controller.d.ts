import { CertificatesService } from 'src/certificates/certificates.service';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    getAllByUserId(userId: string): import(".prisma/client").Prisma.PrismaPromise<({
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
}
