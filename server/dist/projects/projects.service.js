"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto) {
        try {
            const organizationExists = await this.prisma.organizations.findUnique({
                where: { id: createProjectDto.organizationId },
            });
            if (!organizationExists) {
                throw new common_1.NotFoundException('Organization with the specified ID is not found.');
            }
            const project = await this.prisma.projects.create({
                data: {
                    organization: {
                        connect: {
                            id: createProjectDto.organizationId,
                        },
                    },
                    title: createProjectDto.title,
                    description: createProjectDto.description,
                    startDate: createProjectDto.startDate,
                    endDate: createProjectDto.endDate,
                    status: 'NOT_STARTED',
                    timeCommitment: createProjectDto.timeCommitment,
                    provideCertificate: createProjectDto.provideCertificate,
                },
            });
            if (createProjectDto.locationId) {
                const locationExists = await this.prisma.locations.findFirst({
                    where: { id: createProjectDto.locationId },
                });
                if (!locationExists) {
                    throw new common_1.NotFoundException('Location not found');
                }
                const updatedProject = await this.prisma.projects.update({
                    where: { id: project.id },
                    data: {
                        location: {
                            connect: {
                                id: createProjectDto.locationId,
                            },
                        },
                    },
                });
                return updatedProject;
            }
            return project;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create project. Please try again.');
            }
        }
    }
    async getLatestProjects(days) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            const projects = await this.prisma.projects.findMany({
                where: {
                    AND: [
                        {
                            createdAt: {
                                gte: cutoffDate,
                            },
                        },
                        {
                            isActive: true,
                        },
                    ],
                },
                include: {
                    location: true,
                    organization: true,
                    applications: true,
                    donations: true,
                    messages: true,
                    skillsRequired: true,
                    tasks: true,
                },
            });
            return projects;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve projects. Please try again.');
        }
    }
    async getInProgressProjects(organizationId) {
        try {
            const organizationExists = await this.prisma.organizations.findUnique({
                where: { id: organizationId },
            });
            if (!organizationExists) {
                throw new common_1.NotFoundException('Organization with the specified ID is not found.');
            }
            const projects = await this.prisma.projects.findMany({
                where: {
                    AND: [
                        { organizationId: organizationId },
                        { status: { not: 'DONE' } },
                        { isActive: true },
                    ],
                },
                include: {
                    location: true,
                    organization: true,
                    applications: true,
                    donations: true,
                    messages: true,
                    skillsRequired: true,
                    tasks: true,
                },
            });
            return projects;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to retrieve projects. Please try again.');
            }
        }
    }
    async getFinishedProjects(organizationId) {
        try {
            const organizationExists = await this.prisma.organizations.findUnique({
                where: { id: organizationId },
            });
            if (!organizationExists) {
                throw new common_1.NotFoundException('Organization with the specified ID is not found.');
            }
            const projects = await this.prisma.projects.findMany({
                where: {
                    AND: [
                        { organizationId: organizationId },
                        { status: 'DONE' },
                        { isActive: true },
                    ],
                },
            });
            return projects;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to retrieve projects. Please try again.');
            }
        }
    }
    async getFilteredProjects(queryParams) {
        const { time, location, status, query } = queryParams;
        try {
            let whereClause = {};
            if (query && query.length > 0) {
                whereClause = {
                    OR: [
                        {
                            organization: {
                                name: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                        },
                        {
                            title: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            description: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                    ],
                };
            }
            const projects = await this.prisma.projects.findMany({
                where: whereClause,
                include: {
                    applications: true,
                    donations: true,
                    location: true,
                    messages: true,
                    organization: true,
                    skillsRequired: true,
                    tasks: true,
                },
            });
            let filteredProjects = projects;
            if (time && time !== 'BOTH') {
                filteredProjects = projects.filter((project) => project.timeCommitment === time);
            }
            if (status) {
                filteredProjects = filteredProjects.filter((project) => project.status === status);
            }
            if (location) {
                if (location === 'REMOTE') {
                    filteredProjects = filteredProjects.filter((project) => project.locationId === null);
                }
                else {
                    filteredProjects = filteredProjects.filter((project) => project.locationId === location);
                }
            }
            return filteredProjects;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve filtered projects. Please try again.');
        }
    }
    async findOneById(id) {
        try {
            const project = await this.prisma.projects.findUnique({
                where: { id },
                include: {
                    applications: true,
                    donations: true,
                    location: true,
                    messages: true,
                    organization: true,
                    skillsRequired: {
                        include: {
                            skill: true,
                        },
                    },
                    tasks: true,
                    reviews: true,
                },
            });
            if (!project || !project.isActive) {
                throw new common_1.NotFoundException('Project with the specified ID was not found.');
            }
            const rating = await this.prisma.reviews.aggregate({
                where: {
                    projectId: id,
                },
                _avg: {
                    rating: true,
                },
                _count: {
                    _all: true,
                },
            });
            return {
                ...project,
                rating: {
                    avg: rating._avg.rating,
                    count: rating._count._all,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to retrieve project. Please try again.');
            }
        }
    }
    async apply(projectId, userId, message) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException("User doesn't exist");
            }
            const project = await this.prisma.projects.findUnique({
                where: { id: projectId },
            });
            if (!project) {
                throw new common_1.NotFoundException("Project doesn't exist");
            }
            const existingApplication = await this.prisma.applications.findFirst({
                where: {
                    AND: [{ userId: userId }, { projectId: projectId }],
                },
            });
            if (existingApplication) {
                throw new common_1.ConflictException('You have already applied to this project');
            }
            await this.prisma.projects.update({
                where: {
                    id: projectId,
                },
                data: {
                    applications: {
                        create: {
                            userId: userId,
                            message: message,
                        },
                    },
                },
            });
            return {
                message: 'Applied successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to apply. Please try again.');
            }
        }
    }
    async update(projectId, updateProjectDto) {
        try {
            const project = await this.prisma.projects.findUnique({
                where: {
                    id: projectId,
                },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            const updatedProject = await this.prisma.projects.update({
                where: {
                    id: projectId,
                },
                data: updateProjectDto,
                include: {
                    applications: {
                        where: {
                            status: 'ACCEPTED',
                        },
                        select: {
                            userId: true,
                        },
                    },
                },
            });
            if (updateProjectDto.status === 'DONE' &&
                updatedProject.provideCertificate) {
                for (const record of updatedProject.applications) {
                    const { userId } = record;
                    const count = await this.prisma.users.findUnique({
                        where: {
                            id: userId,
                        },
                        select: {
                            _count: {
                                select: {
                                    applications: {
                                        where: {
                                            status: 'ACCEPTED',
                                            project: {
                                                status: 'DONE',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    });
                    try {
                        switch (true) {
                            case count._count.applications >= 5:
                                await this.prisma.usersToBadges.create({
                                    data: {
                                        user: {
                                            connect: {
                                                id: userId,
                                            },
                                        },
                                        badge: {
                                            connect: {
                                                name: 'Diamond',
                                            },
                                        },
                                    },
                                });
                                break;
                            case count._count.applications >= 10:
                                await this.prisma.usersToBadges.create({
                                    data: {
                                        user: {
                                            connect: {
                                                id: userId,
                                            },
                                        },
                                        badge: {
                                            connect: {
                                                name: 'Platinum',
                                            },
                                        },
                                    },
                                });
                                break;
                            case count._count.applications >= 20:
                                await this.prisma.usersToBadges.create({
                                    data: {
                                        user: {
                                            connect: {
                                                id: userId,
                                            },
                                        },
                                        badge: {
                                            connect: {
                                                name: 'Gold',
                                            },
                                        },
                                    },
                                });
                                break;
                            case count._count.applications >= 10:
                                await this.prisma.usersToBadges.create({
                                    data: {
                                        user: {
                                            connect: {
                                                id: userId,
                                            },
                                        },
                                        badge: {
                                            connect: {
                                                name: 'Silver',
                                            },
                                        },
                                    },
                                });
                                break;
                            case count._count.applications >= 5:
                                await this.prisma.usersToBadges.create({
                                    data: {
                                        user: {
                                            connect: {
                                                id: userId,
                                            },
                                        },
                                        badge: {
                                            connect: {
                                                name: 'Bronze',
                                            },
                                        },
                                    },
                                });
                                break;
                        }
                    }
                    catch (error) { }
                }
            }
            if (updateProjectDto.status === 'DONE') {
                for (const record of updatedProject.applications) {
                    const { userId } = record;
                    await this.prisma.certificates.create({
                        data: {
                            userId: userId,
                            projectId: projectId,
                        },
                    });
                }
            }
            return {
                message: 'Project successfully updated',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update project. Please try again');
            }
        }
    }
    async addSkillsToProject(projectId, addSkillToProjectDto) {
        try {
            const project = await this.prisma.projects.findUnique({
                where: {
                    id: projectId,
                },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project with the specified ID is not found');
            }
            const skills = await this.prisma.skills.findUnique({
                where: {
                    id: addSkillToProjectDto.skillId,
                },
            });
            if (!skills) {
                throw new common_1.NotFoundException('Skill with the specified ID is not found');
            }
            await this.prisma.skillsToProjects.upsert({
                where: {
                    skillId_projectId: {
                        skillId: addSkillToProjectDto.skillId,
                        projectId: projectId,
                    },
                },
                update: {
                    projectId: projectId,
                    skillId: addSkillToProjectDto.skillId,
                    vacancies: addSkillToProjectDto.vacancies,
                },
                create: {
                    projectId: projectId,
                    skillId: addSkillToProjectDto.skillId,
                    vacancies: addSkillToProjectDto.vacancies,
                },
            });
            return { message: 'Skills added/updated successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to add/update skills');
            }
        }
    }
    async removeSkill(projectId, skillId) {
        try {
            const skill = await this.prisma.skillsToProjects.findUnique({
                where: {
                    skillId_projectId: {
                        projectId: projectId,
                        skillId: skillId,
                    },
                },
            });
            if (!skill) {
                throw new common_1.NotFoundException('Skill not found');
            }
            await this.prisma.skillsToProjects.delete({
                where: {
                    skillId_projectId: {
                        projectId: projectId,
                        skillId: skillId,
                    },
                },
            });
            return { message: 'Skill removed successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to remove skill');
            }
        }
    }
    async fetchProjectParticipants(projectId) {
        try {
            const project = await this.prisma.projects.findUnique({
                where: {
                    id: projectId,
                },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found.');
            }
            const participants = await this.prisma.applications.findMany({
                where: {
                    AND: [{ projectId: projectId }, { status: 'ACCEPTED' }],
                },
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });
            return participants;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to fetch participants list. Pleas try again.');
            }
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map