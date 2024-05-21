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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SkillsService = class SkillsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSkillDto) {
        try {
            const existingSkillName = await this.prisma.skills.findUnique({
                where: { name: createSkillDto.name },
            });
            if (existingSkillName) {
                throw new common_1.ConflictException();
            }
            const category = await this.prisma.skillCategories.findUnique({
                where: { id: createSkillDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException();
            }
            return await this.prisma.skills.create({
                data: createSkillDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('There already exists a skill with the same name');
            }
            else if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('There is no category with the specified id');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create skill. Please try again later.');
            }
        }
    }
    async findAll() {
        try {
            return await this.prisma.skills.findMany({
                include: {
                    category: true,
                    _count: {
                        select: {
                            projects: true,
                            users: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to find all skills. Please try again later');
        }
    }
    async search(query) {
        try {
            return await this.prisma.skills.findMany({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                include: {
                    category: true,
                    _count: {
                        select: {
                            projects: true,
                            users: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve search result. Please try again later');
        }
    }
    async findOne(id) {
        try {
            const skill = await this.prisma.skills.findUnique({
                where: { id: id },
                include: {
                    category: true,
                    _count: {
                        select: {
                            projects: true,
                            users: true,
                        },
                    },
                },
            });
            if (!skill) {
                throw new common_1.NotFoundException();
            }
            return skill;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('There is no skill with the specified id');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to find skill. Please try again later.');
            }
        }
    }
    async update(id, updateSkillDto) {
        try {
            const existingSkill = await this.prisma.skills.findUnique({
                where: { id },
            });
            if (!existingSkill) {
                throw new common_1.NotFoundException();
            }
            if (updateSkillDto.name) {
                const existingSkillName = await this.prisma.skills.findUnique({
                    where: { name: updateSkillDto.name },
                });
                if (existingSkillName) {
                    throw new common_1.ConflictException();
                }
            }
            if (updateSkillDto.categoryId) {
                const existingCategory = await this.prisma.skillCategories.findUnique({
                    where: { id: updateSkillDto.categoryId },
                });
                if (!existingCategory) {
                    throw new common_1.NotFoundException();
                }
            }
            return await this.prisma.skills.update({
                where: { id },
                data: updateSkillDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('The skill or the category cannot be found');
            }
            else if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('A skill with the same name already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async remove(id) {
        try {
            const skill = await this.prisma.skills.findUnique({
                where: { id },
            });
            if (!skill) {
                throw new common_1.NotFoundException();
            }
            await this.prisma.skills.delete({
                where: { id: id },
            });
            return { message: 'Skill deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('A skill with specified id was not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to delete skill skill. Please try again later.');
            }
        }
    }
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SkillsService);
//# sourceMappingURL=skills.service.js.map