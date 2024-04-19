import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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

  @Public()
  @Get('in-progress/:organizationId')
  getInProgressProjects(@Param('organizationId') organizationId: string) {
    return this.projectsService.getInProgressProjects(organizationId);
  }

  @Public()
  @Get('finished/:organizationId')
  getFinishedProjects(@Param('organizationId') organizationId: string) {
    return this.projectsService.getFinishedProjects(organizationId);
  }

  @Public()
  @Get()
  getFilteredProjects(@Query() queryParams: any) {
    return this.projectsService.getFilteredProjects(queryParams);
  }
}
