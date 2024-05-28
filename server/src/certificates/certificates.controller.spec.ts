import { Test, TestingModule } from '@nestjs/testing';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';

import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('CertificatesController', () => {
  let controller: CertificatesController;
  let service: CertificatesService;

  const mockCertificatesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificatesController],
      providers: [
        {
          provide: CertificatesService,
          useValue: mockCertificatesService,
        },
      ],
    }).compile();

    controller = module.get<CertificatesController>(CertificatesController);
    service = module.get<CertificatesService>(CertificatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllByUserId', () => {
    it('should return an array of certificates', async () => {
      const userId = 'user123';
      const result = [
        { id: 'cert1', userId: 'user123', project: { organization: {} } },
        { id: 'cert2', userId: 'user123', project: { organization: {} } },
      ];
      mockCertificatesService.findAll.mockResolvedValue(result);

      expect(await controller.getAllByUserId(userId)).toBe(result);
      expect(mockCertificatesService.findAll).toHaveBeenCalledWith(userId);
    });

    it('should throw InternalServerErrorException if service throws', async () => {
      const userId = 'user123';
      mockCertificatesService.findAll.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(controller.getAllByUserId(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
