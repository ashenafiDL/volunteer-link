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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LocationsService = class LocationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(name, code) {
        try {
            const existingLocation = await this.prisma.locations.findFirst({
                where: {
                    OR: [{ name: name, code: code }],
                },
            });
            if (existingLocation) {
                throw new common_1.ConflictException('Location already exists');
            }
            const location = await this.prisma.locations.create({
                data: { name: name, code: code },
            });
            return location;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create location. Please try again later.');
            }
        }
    }
    async findAll() {
        try {
            return await this.prisma.locations.findMany({
                orderBy: {
                    name: 'asc',
                },
                include: {
                    _count: {
                        select: {
                            users: true,
                            projects: true,
                            organizations: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to find all locations. Please try again later');
        }
    }
    async findOneById(id) {
        try {
            const location = await this.prisma.locations.findUnique({
                where: { id },
            });
            if (location)
                return location;
            else
                throw new common_1.NotFoundException('Location with the specified ID cannot be found');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to locate location');
            }
        }
    }
    async findOneByName(name) {
        try {
            const location = await this.prisma.locations.findUnique({
                where: { name },
            });
            if (location)
                return location;
            else
                throw new common_1.NotFoundException('Location with the specified name cannot be found');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to locate location');
            }
        }
    }
    async findOneByShortCode(code) {
        try {
            const location = await this.prisma.locations.findUnique({
                where: { code },
            });
            if (location)
                return location;
            else
                throw new common_1.NotFoundException('Location with the specified short code cannot be found');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to locate location');
            }
        }
    }
    async update(id, updateLocationDto) {
        try {
            const existingLocation = await this.prisma.locations.findUnique({
                where: { id },
            });
            if (!existingLocation) {
                throw new common_1.NotFoundException('Location with the specified ID cannot be found');
            }
            return await this.prisma.locations.update({
                where: { id },
                data: updateLocationDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update location. Please try again later.');
            }
        }
    }
    async remove(id) {
        try {
            const location = await this.prisma.locations.delete({
                where: { id },
            });
            if (location)
                return { message: 'Location successfully deleted' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete location. Please try again later.');
        }
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationsService);
//# sourceMappingURL=locations.service.js.map