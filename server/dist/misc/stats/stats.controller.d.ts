import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getUserInfo(): Promise<{
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
    getProjectStat(): Promise<any[]>;
    verifiedAndNotVerified(): Promise<{
        name: string;
        verified: number;
        unverified: number;
    }[]>;
    reportStat(): Promise<{
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
}
