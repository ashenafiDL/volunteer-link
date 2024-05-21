import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    addReviewToProject(req: any, projectId: string, createReviewDto: CreateReviewDto): Promise<import("@nestjs/common").ConflictException | import("@nestjs/common").NotFoundException | {
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
    getAllReviewByProjectId(projectId: string): Promise<import("@nestjs/common").NotFoundException | ({
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
    checkReviewed(projectId: string, req: any): Promise<{
        reviewed: boolean;
    }>;
}
