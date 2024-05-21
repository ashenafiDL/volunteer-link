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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma/prisma.service");
let ApplicationsService = class ApplicationsService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async checkApplication(userId, projectId) {
        try {
            const application = await this.prisma.applications.findFirst({
                where: {
                    AND: [{ userId: userId }, { projectId: projectId }],
                },
            });
            return {
                applied: application ? true : false,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to check application. Please try again.');
        }
    }
    async getMyApplications(userId) {
        try {
            const pendingApplications = await this.prisma.applications.findMany({
                where: {
                    AND: [{ userId: userId }, { status: 'PENDING' }],
                },
                include: {
                    project: true,
                },
            });
            const acceptedApplications = await this.prisma.applications.findMany({
                where: {
                    AND: [{ userId: userId }, { status: 'ACCEPTED' }],
                },
                include: {
                    project: true,
                },
            });
            const rejectedApplications = await this.prisma.applications.findMany({
                where: {
                    AND: [{ userId: userId }, { status: 'REJECTED' }],
                },
                include: {
                    project: true,
                },
            });
            return {
                pending: pendingApplications,
                accepted: acceptedApplications,
                rejected: rejectedApplications,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve applications. Please try again.');
        }
    }
    async getApplicationsByProjectId(projectId) {
        try {
            const pendingApplications = await this.prisma.applications.findMany({
                where: {
                    AND: [{ projectId: projectId }, { status: 'PENDING' }],
                },
                include: {
                    user: {
                        include: {
                            location: true,
                        },
                    },
                },
            });
            const acceptedApplications = await this.prisma.applications.findMany({
                where: {
                    AND: [{ projectId: projectId }, { status: 'ACCEPTED' }],
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            gender: true,
                            age: true,
                            username: true,
                            email: true,
                            bio: true,
                        },
                    },
                },
            });
            const rejectedApplications = await this.prisma.applications.findMany({
                where: {
                    AND: [{ projectId: projectId }, { status: 'REJECTED' }],
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            gender: true,
                            age: true,
                            username: true,
                            email: true,
                            bio: true,
                        },
                    },
                },
            });
            return {
                pending: pendingApplications,
                accepted: acceptedApplications,
                rejected: rejectedApplications,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve applications. Please try again.');
        }
    }
    async acceptApplication(applicationId) {
        try {
            const updateApplication = await this.prisma.applications.update({
                where: {
                    id: applicationId,
                },
                data: {
                    status: 'ACCEPTED',
                },
                include: {
                    project: {
                        include: {
                            organization: true,
                        },
                    },
                },
            });
            const user = await this.prisma.users.findUnique({
                where: {
                    id: updateApplication.userId,
                },
            });
            let notificationEnabled = false;
            user.notificationPreference.map((preference) => {
                if (preference.option === 'application_status_update' &&
                    preference.value) {
                    notificationEnabled = true;
                }
            });
            if (notificationEnabled) {
                const fullName = `${user.firstName} ${user.lastName}`;
                const url = `http://localhost:3000/projects/${updateApplication.projectId}`;
                const startDate = updateApplication.project.startDate.toDateString();
                return this.emailService.sendApplicationAcceptedEmail(user.email, fullName, updateApplication.project.title, updateApplication.project.organization.name, startDate, url);
            }
            return {
                message: 'Failed to accept application. Please try again.',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to accept application. Please try again.');
        }
    }
    async rejectApplication(applicationId) {
        try {
            const updateApplication = await this.prisma.applications.update({
                where: {
                    id: applicationId,
                },
                data: {
                    status: 'REJECTED',
                },
                include: {
                    project: {
                        include: {
                            organization: true,
                        },
                    },
                },
            });
            const user = await this.prisma.users.findUnique({
                where: {
                    id: updateApplication.userId,
                },
            });
            let notificationEnabled = false;
            user.notificationPreference.map((preference) => {
                if (preference.option === 'application_status_update' &&
                    preference.value) {
                    notificationEnabled = true;
                }
            });
            if (notificationEnabled) {
                const fullName = `${user.firstName} ${user.lastName}`;
                return this.emailService.sendApplicationRejectedEmail(user.email, fullName, updateApplication.project.title, updateApplication.project.organization.name);
            }
            return {
                message: 'Failed to reject application. Please try again.',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to accept application. Please try again.');
        }
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map