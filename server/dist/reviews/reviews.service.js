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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addReviewToProject(createReviewDto, userId, projectId) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const project = await this.prisma.projects.findFirst({
                where: {
                    AND: [{ id: projectId }, { status: 'DONE' }],
                },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            const reviewExists = await this.prisma.reviews.findFirst({
                where: {
                    AND: [{ userId: userId }, { projectId: projectId }],
                },
            });
            if (reviewExists) {
                throw new common_1.ConflictException('The user has already reviewed this project');
            }
            const review = await this.prisma.reviews.create({
                data: {
                    userId: userId,
                    projectId: projectId,
                    comment: createReviewDto.comment,
                    rating: createReviewDto.rating,
                },
            });
            return {
                message: 'Review added successful',
                review: review,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to add review. Please try agin later.');
            }
        }
    }
    async getReviewsByProjectId(projectId) {
        try {
            const project = await this.prisma.projects.findUnique({
                where: { id: projectId },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            const reviews = await this.prisma.reviews.findMany({
                where: { projectId: projectId },
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
            return reviews;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to get reviews. Please try again later.');
            }
        }
    }
    async checkReviewed(userId, projectId) {
        try {
            const review = await this.prisma.reviews.findFirst({
                where: {
                    AND: [{ userId: userId }, { projectId: projectId }],
                },
            });
            return {
                reviewed: review ? true : false,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to check review. Please try again.');
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map