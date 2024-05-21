import { PrismaService } from 'src/prisma/prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        users: {
            total: number;
            active: number;
            deactivatedAccounts: number;
        };
        projects: {
            total: number;
        };
        organizations: {
            total: number;
        };
    }>;
    getAgeAndGenderCount(): Promise<{
        gender: any[];
        age: {
            name: string;
            value: number;
        }[];
    }>;
    projectStat(): Promise<any[]>;
    verifiedAndNotVerified(): Promise<{
        name: string;
        verified: number;
        unverified: number;
    }[]>;
    reportStats(): Promise<{
        fake: {
            active: number;
            resolved: number;
        };
        scam: {
            active: number;
            resolved: number;
        };
        inappropriate_content: {
            active: number;
            resolved: number;
        };
        spam: {
            active: number;
            resolved: number;
        };
        impersonation: {
            active: number;
            resolved: number;
        };
        privacy: {
            active: number;
            resolved: number;
        };
        other: {
            active: number;
            resolved: number;
        };
    }>;
    getPopularSkills(): Promise<{
        name: string;
        id: string;
        _count: {
            users: number;
            projects: number;
        };
    }[]>;
    countReports(reason: any, isActive: any): Promise<number>;
    countProjects(status: any, timeCommitment?: any, locationId?: any): Promise<number>;
}
