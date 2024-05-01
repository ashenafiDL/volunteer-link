import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get('check/:projectId')
  checkApplication(@Req() req, @Param('projectId') projectId: string) {
    const userId = req.user.sub;
    return this.applicationsService.checkApplication(userId, projectId);
  }

  @Get('myApplications')
  getMyApplications(@Req() req) {
    const userId = req.user.sub;
    return this.applicationsService.getMyApplications(userId);
  }

  @Get(':projectId')
  getApplicationsByProjectId(@Param('projectId') projectId: string) {
    return this.applicationsService.getApplicationsByProjectId(projectId);
  }
}
