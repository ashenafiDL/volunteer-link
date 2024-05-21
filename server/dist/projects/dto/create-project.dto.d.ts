import { ProjectStatus, TimePreference } from '@prisma/client';
export declare class CreateProjectDto {
    organizationId: string;
    title: string;
    description: string;
    locationId: string;
    startDate: Date;
    endDate: Date;
    timeCommitment: TimePreference;
    provideCertificate: boolean;
    status?: ProjectStatus;
    isActive?: boolean;
}
