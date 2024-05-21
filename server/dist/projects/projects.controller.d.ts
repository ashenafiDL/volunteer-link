import { AddSkillToProjectDto } from './dto/add-skill-to-project.dto';
import { ApplyToProjectDto } from './dto/apply.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<{
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
    }>;
    getLatestProjects(days?: number): Promise<({
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
        skillsRequired: {
            skillId: string;
            projectId: string;
            vacancies: number;
        }[];
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
    })[]>;
    getInProgressProjects(organizationId: string): Promise<({
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
        skillsRequired: {
            skillId: string;
            projectId: string;
            vacancies: number;
        }[];
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
    })[]>;
    getFinishedProjects(organizationId: string): Promise<{
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
    }[]>;
    getFilteredProjects(queryParams: any): Promise<({
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
        skillsRequired: {
            skillId: string;
            projectId: string;
            vacancies: number;
        }[];
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
    })[]>;
    getProjectById(id: string): Promise<import("@nestjs/common").NotFoundException | {
        rating: {
            avg: number;
            count: number;
        };
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
        skillsRequired: ({
            skill: {
                id: string;
                name: string;
                description: string;
                createdAt: Date;
                updatedAt: Date;
                categoryId: string;
            };
        } & {
            skillId: string;
            projectId: string;
            vacancies: number;
        })[];
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
    }>;
    apply(req: any, projectId: string, applyToProjectDto: ApplyToProjectDto): Promise<import("@nestjs/common").ConflictException | import("@nestjs/common").NotFoundException | {
        message: string;
    }>;
    update(projectId: string, updateProjectDto: UpdateProjectDto): Promise<import("@nestjs/common").NotFoundException | {
        message: string;
    }>;
    addSkills(projectId: string, addSkillToProject: AddSkillToProjectDto): Promise<import("@nestjs/common").NotFoundException | {
        message: string;
    }>;
    removeSkill(projectId: string, skillId: string): Promise<import("@nestjs/common").NotFoundException | {
        message: string;
    }>;
    getParticipants(projectId: string): Promise<import("@nestjs/common").NotFoundException | {
        user: {
            firstName: string;
            lastName: string;
            username: string;
            email: string;
        };
    }[]>;
}
