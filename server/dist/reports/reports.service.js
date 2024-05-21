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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(reporterId, createReportDto) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: reporterId },
            });
            if (!user) {
                throw new common_1.NotFoundException('Reporter not found');
            }
            let exists;
            switch (createReportDto.contentType) {
                case 'USER':
                    exists = await this.prisma.users.findUnique({
                        where: { id: createReportDto.contentId },
                    });
                    break;
                case 'ORGANIZATION':
                    exists = await this.prisma.organizations.findUnique({
                        where: { id: createReportDto.contentId },
                    });
                    break;
                case 'PROJECT':
                    exists = await this.prisma.projects.findUnique({
                        where: { id: createReportDto.contentId },
                    });
                    break;
                case 'REVIEW':
                    exists = await this.prisma.reviews.findUnique({
                        where: { id: createReportDto.contentId },
                    });
                    break;
            }
            if (!exists) {
                throw new common_1.NotFoundException('Content not found');
            }
            const report = await this.prisma.reports.create({
                data: {
                    ...createReportDto,
                    status: 'ACTIVE',
                    reporterId: reporterId,
                },
            });
            return report;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create report. Please try again later.');
            }
        }
    }
    async findAll() {
        try {
            return await this.prisma.reports.findMany({
                include: {
                    reporter: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
                orderBy: [{ status: 'asc' }, { createdAt: 'asc' }],
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to find all reports. Please try again later');
        }
    }
    async resolveAReport(id) {
        try {
            const report = await this.prisma.reports.findUnique({
                where: { id },
            });
            if (!report) {
                throw new common_1.NotFoundException('Report not found');
            }
            await this.prisma.reports.update({
                where: { id },
                data: {
                    status: 'RESOLVED',
                },
            });
            return {
                message: 'Resolved successful',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to resolve report');
            }
        }
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map