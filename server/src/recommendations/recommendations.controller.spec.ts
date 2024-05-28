import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('RecommendationsController', () => {
  let controller: RecommendationsController;
  let service: RecommendationsService;

  const mockRecommendationsService = {
    recommendProject: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationsController],
      providers: [
        {
          provide: RecommendationsService,
          useValue: mockRecommendationsService,
        },
      ],
    }).compile();

    controller = module.get<RecommendationsController>(
      RecommendationsController,
    );
    service = module.get<RecommendationsService>(RecommendationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRecommendations', () => {
    it('should return recommendations for a valid user', async () => {
      const req = { user: { sub: 'user123' } };
      const result = [
        { project: { id: 'project1' }, score: 95 },
        { project: { id: 'project2' }, score: 90 },
      ];
      mockRecommendationsService.recommendProject.mockResolvedValue(result);

      expect(await controller.getRecommendations(req)).toBe(result);
      expect(mockRecommendationsService.recommendProject).toHaveBeenCalledWith(
        'user123',
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      const req = { user: { sub: 'user123' } };
      const error = new NotFoundException('User not found');
      mockRecommendationsService.recommendProject.mockRejectedValue(error);

      await expect(controller.getRecommendations(req)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if service fails', async () => {
      const req = { user: { sub: 'user123' } };
      const error = new InternalServerErrorException(
        'Failed to fetch recommendations. Please try again later.',
      );
      mockRecommendationsService.recommendProject.mockRejectedValue(error);

      await expect(controller.getRecommendations(req)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
