import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Public()
  @Get('latest/:days?')
  getLatestProjects(@Param('days') days?: number) {
    if (days === undefined) {
      days = 7;
    }

    return this.projectsService.getLatestProjects(days);
  }
}
