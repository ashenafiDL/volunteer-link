import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/RBAC/role.enum';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    create: jest.fn(),
    findAllByProjectId: jest.fn(),
    toggleTaskStatus: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Description',
        priority: 1,
        deadline: new Date(),
        assignedToId: 'user456',
      };
      const result = { id: 'task123', ...createTaskDto };

      mockTasksService.create.mockResolvedValue(result);

      expect(await controller.create(req, projectId, createTaskDto)).toBe(
        result,
      );
      expect(mockTasksService.create).toHaveBeenCalledWith(
        'user123',
        projectId,
        createTaskDto,
      );
    });

    it('should throw NotFoundException if project is not found', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Description',
        priority: 1,
        deadline: new Date(),
        assignedToId: 'user456',
      };
      const error = new NotFoundException('Project not found');

      mockTasksService.create.mockRejectedValue(error);

      await expect(
        controller.create(req, projectId, createTaskDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not allowed to create task', async () => {
      const req = { user: { sub: 'user123' } };
      const projectId = 'project123';
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Description',
        priority: 1,
        deadline: new Date(),
        assignedToId: 'user456',
      };
      const error = new ForbiddenException(
        'The user is not allowed to access this resource.',
      );

      mockTasksService.create.mockRejectedValue(error);

      await expect(
        controller.create(req, projectId, createTaskDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findAllByProjectId', () => {
    it('should return tasks for a given project', async () => {
      const projectId = 'project123';
      const result = [
        { id: 'task1', title: 'Task 1' },
        { id: 'task2', title: 'Task 2' },
      ];

      mockTasksService.findAllByProjectId.mockResolvedValue(result);

      expect(await controller.findAllByProjectId(projectId)).toBe(result);
      expect(mockTasksService.findAllByProjectId).toHaveBeenCalledWith(
        projectId,
      );
    });

    it('should throw NotFoundException if project is not found', async () => {
      const projectId = 'project123';
      const error = new NotFoundException('Project not found');

      mockTasksService.findAllByProjectId.mockRejectedValue(error);

      await expect(controller.findAllByProjectId(projectId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('toggleTaskStatus', () => {
    it('should toggle task status', async () => {
      const req = { user: { sub: 'user123' } };
      const taskId = 'task123';
      const result = { id: 'task123', status: 'COMPLETED' };

      mockTasksService.toggleTaskStatus.mockResolvedValue(result);

      expect(await controller.toggleTaskStatus(req, taskId)).toBe(result);
      expect(mockTasksService.toggleTaskStatus).toHaveBeenCalledWith(
        'user123',
        taskId,
      );
    });

    it('should throw NotFoundException if task is not found', async () => {
      const req = { user: { sub: 'user123' } };
      const taskId = 'task123';
      const error = new NotFoundException('Task not found');

      mockTasksService.toggleTaskStatus.mockRejectedValue(error);

      await expect(controller.toggleTaskStatus(req, taskId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user is not allowed to toggle task status', async () => {
      const req = { user: { sub: 'user123' } };
      const taskId = 'task123';
      const error = new ForbiddenException(
        'You are not allowed to change the status of this task',
      );

      mockTasksService.toggleTaskStatus.mockRejectedValue(error);

      await expect(controller.toggleTaskStatus(req, taskId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const req = { user: { sub: 'user123' } };
      const taskId = 'task123';
      const result = { message: 'Task deleted successfully' };

      mockTasksService.deleteTask.mockResolvedValue(result);

      expect(await controller.deleteTask(req, taskId)).toBe(result);
      expect(mockTasksService.deleteTask).toHaveBeenCalledWith(
        'user123',
        taskId,
      );
    });

    it('should throw NotFoundException if task is not found', async () => {
      const req = { user: { sub: 'user123' } };
      const taskId = 'task123';
      const error = new NotFoundException('Task not found');

      mockTasksService.deleteTask.mockRejectedValue(error);

      await expect(controller.deleteTask(req, taskId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user is not allowed to delete task', async () => {
      const req = { user: { sub: 'user123' } };
      const taskId = 'task123';
      const error = new ForbiddenException(
        'You are not allowed to delete this task',
      );

      mockTasksService.deleteTask.mockRejectedValue(error);

      await expect(controller.deleteTask(req, taskId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
