import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RolesGuard } from 'src/RBAC/roles.guard';
import { Role } from 'src/RBAC/role.enum';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  const mockReviewsService = {
    addReviewToProject: jest.fn(),
    getReviewsByProjectId: jest.fn(),
    checkReviewed: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addReviewToProject', () => {
    it('should add a review to a project', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const createReviewDto: CreateReviewDto = {
        comment: 'Great project!',
        rating: 5,
      };
      const result = {
        message: 'Review added successful',
        review: {
          ...createReviewDto,
          userId: 'user123',
          projectId: 'project123',
        },
      };

      mockReviewsService.addReviewToProject.mockResolvedValue(result);

      expect(
        await controller.addReviewToProject(req, projectId, createReviewDto),
      ).toBe(result);
      expect(mockReviewsService.addReviewToProject).toHaveBeenCalledWith(
        createReviewDto,
        'user123',
        projectId,
      );
    });

    it('should throw NotFoundException if user or project not found', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const createReviewDto: CreateReviewDto = {
        comment: 'Great project!',
        rating: 5,
      };
      const error = new NotFoundException('User or project not found');

      mockReviewsService.addReviewToProject.mockRejectedValue(error);

      await expect(
        controller.addReviewToProject(req, projectId, createReviewDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if review already exists', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const createReviewDto: CreateReviewDto = {
        comment: 'Great project!',
        rating: 5,
      };
      const error = new ConflictException(
        'The user has already reviewed this project',
      );

      mockReviewsService.addReviewToProject.mockRejectedValue(error);

      await expect(
        controller.addReviewToProject(req, projectId, createReviewDto),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('getAllReviewByProjectId', () => {
    it('should return all reviews for a project', async () => {
      const projectId = 'project123';
      const result = [
        {
          comment: 'Great project!',
          rating: 5,
          userId: 'user1',
          projectId: 'project123',
        },
        {
          comment: 'Good project',
          rating: 4,
          userId: 'user2',
          projectId: 'project123',
        },
      ];

      mockReviewsService.getReviewsByProjectId.mockResolvedValue(result);

      expect(await controller.getAllReviewByProjectId(projectId)).toBe(result);
      expect(mockReviewsService.getReviewsByProjectId).toHaveBeenCalledWith(
        projectId,
      );
    });

    it('should throw NotFoundException if project not found', async () => {
      const projectId = 'project123';
      const error = new NotFoundException('Project not found');

      mockReviewsService.getReviewsByProjectId.mockRejectedValue(error);

      await expect(
        controller.getAllReviewByProjectId(projectId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('checkReviewed', () => {
    it('should check if a user has reviewed a project', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const result = { reviewed: true };

      mockReviewsService.checkReviewed.mockResolvedValue(result);

      expect(await controller.checkReviewed(projectId, req)).toBe(result);
      expect(mockReviewsService.checkReviewed).toHaveBeenCalledWith(
        'user123',
        projectId,
      );
    });

    it('should throw InternalServerErrorException if checkReviewed fails', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const error = new InternalServerErrorException(
        'Failed to check review. Please try again.',
      );

      mockReviewsService.checkReviewed.mockRejectedValue(error);

      await expect(controller.checkReviewed(projectId, req)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
