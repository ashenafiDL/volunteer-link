import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddSkillToProjectDto } from './dto/add-skill-to-project.dto';
import { ApplyToProjectDto } from './dto/apply.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockProjectsService = {
    create: jest.fn(),
    getLatestProjects: jest.fn(),
    getInProgressProjects: jest.fn(),
    getFinishedProjects: jest.fn(),
    getFilteredProjects: jest.fn(),
    findOneById: jest.fn(),
    apply: jest.fn(),
    update: jest.fn(),
    addSkillsToProject: jest.fn(),
    removeSkill: jest.fn(),
    fetchProjectParticipants: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a project', async () => {
      const dto: CreateProjectDto = {
        organizationId: 'org123',
        title: 'New Project',
        description: 'Project Description',
        startDate: new Date(),
        endDate: new Date(),
        // timeCommitment: 'FULL_TIME',
        provideCertificate: true,
        locationId: 'loc123',
        timeCommitment: 'SHORT_TERM',
      };

      mockProjectsService.create.mockResolvedValue(dto);

      expect(await controller.create(dto)).toBe(dto);
      expect(mockProjectsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getLatestProjects', () => {
    it('should return latest projects', async () => {
      const projects = ['project1', 'project2'];
      mockProjectsService.getLatestProjects.mockResolvedValue(projects);

      expect(await controller.getLatestProjects(7)).toBe(projects);
      expect(mockProjectsService.getLatestProjects).toHaveBeenCalledWith(7);
    });
  });

  describe('getInProgressProjects', () => {
    it('should return in-progress projects', async () => {
      const projects = ['project1', 'project2'];
      mockProjectsService.getInProgressProjects.mockResolvedValue(projects);

      expect(await controller.getInProgressProjects('org123')).toBe(projects);
      expect(mockProjectsService.getInProgressProjects).toHaveBeenCalledWith(
        'org123',
      );
    });
  });

  describe('getFinishedProjects', () => {
    it('should return finished projects', async () => {
      const projects = ['project1', 'project2'];
      mockProjectsService.getFinishedProjects.mockResolvedValue(projects);

      expect(await controller.getFinishedProjects('org123')).toBe(projects);
      expect(mockProjectsService.getFinishedProjects).toHaveBeenCalledWith(
        'org123',
      );
    });
  });

  describe('getFilteredProjects', () => {
    it('should return filtered projects', async () => {
      const projects = ['project1', 'project2'];
      const queryParams = { status: 'DONE' };
      mockProjectsService.getFilteredProjects.mockResolvedValue(projects);

      expect(await controller.getFilteredProjects(queryParams)).toBe(projects);
      expect(mockProjectsService.getFilteredProjects).toHaveBeenCalledWith(
        queryParams,
      );
    });
  });

  describe('getProjectById', () => {
    it('should return a project by id', async () => {
      const project = { id: 'project1' };
      mockProjectsService.findOneById.mockResolvedValue(project);

      expect(await controller.getProjectById('project1')).toBe(project);
      expect(mockProjectsService.findOneById).toHaveBeenCalledWith('project1');
    });
  });

  describe('apply', () => {
    it('should apply to a project', async () => {
      const req = { user: { sub: 'user1' } };
      const dto: ApplyToProjectDto = { message: 'I want to apply' };
      const result = { message: 'Applied successfully' };

      mockProjectsService.apply.mockResolvedValue(result);

      expect(await controller.apply(req, 'project1', dto)).toBe(result);
      expect(mockProjectsService.apply).toHaveBeenCalledWith(
        'project1',
        'user1',
        'I want to apply',
      );
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const dto: UpdateProjectDto = { title: 'Updated Title' };
      const result = { message: 'Project successfully updated' };

      mockProjectsService.update.mockResolvedValue(result);

      expect(await controller.update('project1', dto)).toBe(result);
      expect(mockProjectsService.update).toHaveBeenCalledWith('project1', dto);
    });
  });

  describe('addSkills', () => {
    it('should add skills to a project', async () => {
      const dto: AddSkillToProjectDto = { skillId: 'skill1', vacancies: 5 };
      const result = { message: 'Skills added/updated successfully' };

      mockProjectsService.addSkillsToProject.mockResolvedValue(result);

      expect(await controller.addSkills('project1', dto)).toBe(result);
      expect(mockProjectsService.addSkillsToProject).toHaveBeenCalledWith(
        'project1',
        dto,
      );
    });
  });

  describe('removeSkill', () => {
    it('should remove skill from a project', async () => {
      const result = { message: 'Skill removed successfully' };

      mockProjectsService.removeSkill.mockResolvedValue(result);

      expect(await controller.removeSkill('project1', 'skill1')).toBe(result);
      expect(mockProjectsService.removeSkill).toHaveBeenCalledWith(
        'project1',
        'skill1',
      );
    });
  });

  describe('getParticipants', () => {
    it('should get participants of a project', async () => {
      const participants = [{ user: { id: 'user1' } }];

      mockProjectsService.fetchProjectParticipants.mockResolvedValue(
        participants,
      );

      expect(await controller.getParticipants('project1')).toBe(participants);
      expect(mockProjectsService.fetchProjectParticipants).toHaveBeenCalledWith(
        'project1',
      );
    });
  });
});
