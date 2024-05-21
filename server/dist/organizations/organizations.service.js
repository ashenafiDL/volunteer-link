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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganizationsService = class OrganizationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(ownerId, createOrganizationDto) {
        try {
            const checkConflict = await this.prisma.organizations.findFirst({
                where: {
                    OR: [
                        { name: createOrganizationDto.name },
                        { contactEmail: createOrganizationDto.contactEmail },
                        { contactPhone: createOrganizationDto.contactPhone },
                        { websiteUrl: createOrganizationDto.websiteUrl },
                    ],
                },
            });
            if (checkConflict) {
                throw new common_1.ConflictException('An organization with the same name/websiteURL/email/phone already exists');
            }
            const location = await this.prisma.locations.findUnique({
                where: { id: createOrganizationDto.locationId },
            });
            if (!location) {
                throw new common_1.NotFoundException('A location with the specified ID was not found');
            }
            const newOrganization = await this.prisma.organizations.create({
                data: {
                    verified: false,
                    ...createOrganizationDto,
                },
                include: {
                    location: true,
                    logo: true,
                    owner: true,
                    permit: true,
                    projects: true,
                },
            });
            await this.prisma.users.update({
                where: {
                    id: ownerId,
                },
                data: {
                    organizationId: newOrganization.id,
                },
            });
            return newOrganization;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create organization. Please try again later.');
            }
        }
    }
    async getOrg(identifier) {
        try {
            const org = await this.prisma.organizations.findFirst({
                where: {
                    OR: [{ id: identifier }, { name: identifier }, { isActive: true }],
                },
                include: {
                    location: true,
                    logo: true,
                    owner: true,
                    permit: true,
                    projects: true,
                    _count: {
                        select: {
                            projects: {
                                where: {
                                    status: 'DONE',
                                },
                            },
                        },
                    },
                },
            });
            if (!org) {
                throw new common_1.NotFoundException('Organization with the specified id/name not found');
            }
            return org;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to get organization. Please try again.');
            }
        }
    }
    async updateById(id, updateOrgDto) {
        try {
            const org = await this.prisma.organizations.findUnique({
                where: { id },
            });
            if (!org) {
                throw new common_1.NotFoundException('Organization with the specified ID was not found');
            }
            const updatedOrg = await this.prisma.organizations.update({
                where: { id },
                data: updateOrgDto,
                include: {
                    location: true,
                    logo: true,
                    owner: true,
                    permit: true,
                    projects: true,
                },
            });
            return updatedOrg;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update organization. Please try again.');
            }
        }
    }
    async findAll() {
        try {
            const organizations = await this.prisma.organizations.findMany({
                orderBy: [{ verified: 'asc' }, { name: 'asc' }],
                include: { location: true },
            });
            return organizations;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Failed to find all organizations. Please try again later');
        }
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map