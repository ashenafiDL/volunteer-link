import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    addReviewToProject(createReviewDto: CreateReviewDto, userId: string, projectId: string): Promise<ConflictException | NotFoundException | {
        message: string;
        review: {
            id: string;
            userId: string;
            projectId: string;
            comment: string;
            rating: number;
            createdAt: Date;
        };
    }>;
    getReviewsByProjectId(projectId: string): Promise<NotFoundException | ({
        user: {
            id: string;
            firstName: string;
            lastName: string;
            gender: import(".prisma/client").$Enums.Gender;
            age: number;
            username: string;
            email: string;
            bio: string;
        };
    } & {
        id: string;
        userId: string;
        projectId: string;
        comment: string;
        rating: number;
        createdAt: Date;
    })[]>;
    checkReviewed(userId: string, projectId: string): Promise<{
        reviewed: boolean;
    }>;
}
