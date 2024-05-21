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
exports.SkillCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SkillCategoriesService = class SkillCategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSkillCategoryDto) {
        try {
            const category = await this.prisma.skillCategories.findUnique({
                where: { name: createSkillCategoryDto.name },
            });
            if (category) {
                throw new common_1.ConflictException();
            }
            return this.prisma.skillCategories.create({
                data: createSkillCategoryDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('A category with the same name already exists');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create skill category. Please try again later.');
            }
        }
    }
    async findAll() {
        try {
            return await this.prisma.skillCategories.findMany({
                include: {
                    _count: {
                        select: { skills: true },
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to find all skill categories. Please try again later');
        }
    }
    async findOneById(id) {
        try {
            const category = await this.prisma.skillCategories.findUnique({
                where: { id: id },
                include: {
                    _count: {
                        select: { skills: true },
                    },
                },
            });
            if (!category) {
                throw new common_1.NotFoundException();
            }
            return category;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('A category with specified id was not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to find skill category. Please try again later.');
            }
        }
    }
    async findOneByName(name) {
        try {
            const category = await this.prisma.skillCategories.findUnique({
                where: { name: name },
                include: {
                    _count: {
                        select: { skills: true },
                    },
                },
            });
            if (!category) {
                throw new common_1.NotFoundException();
            }
            return category;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('A category with specified name was not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to find skill category. Please try again later.');
            }
        }
    }
    async update(id, updateSkillCategoryDto) {
        try {
            const category = await this.prisma.skillCategories.findUnique({
                where: { id: id },
            });
            if (!category) {
                throw new common_1.NotFoundException();
            }
            const duplicateCategory = await this.prisma.skillCategories.findUnique({
                where: { name: updateSkillCategoryDto.name, AND: { id: { not: id } } },
            });
            if (duplicateCategory) {
                throw new common_1.ConflictException();
            }
            return await this.prisma.skillCategories.update({
                where: { id: id },
                data: updateSkillCategoryDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('A category with specified id was not found');
            }
            else if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('A category with the same name already exists');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update skill category. Please try again later.');
            }
        }
    }
    async remove(id) {
        try {
            const category = await this.prisma.skillCategories.findUnique({
                where: { id },
            });
            if (!category) {
                throw new common_1.NotFoundException();
            }
            await this.prisma.skillCategories.delete({
                where: { id: id },
            });
            return { message: 'Category deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('A category with specified id was not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to delete skill category. Please try again later.');
            }
        }
    }
};
exports.SkillCategoriesService = SkillCategoriesService;
exports.SkillCategoriesService = SkillCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SkillCategoriesService);
//# sourceMappingURL=skill-categories.service.js.map