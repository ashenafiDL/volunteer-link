import { Controller, Get, Param, Req } from '@nestjs/common';
import { Role } from 'src/RBAC/role.enum';
import { Roles } from 'src/RBAC/roles.decorator';
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
  @Roles(Role.User)
  getMyApplications(@Req() req) {
    const userId = req.user.sub;
    return this.applicationsService.getMyApplications(userId);
  }

  @Get(':projectId')
  getApplicationsByProjectId(@Param('projectId') projectId: string) {
    return this.applicationsService.getApplicationsByProjectId(projectId);
  }

  @Get('accept/:applicationId')
  @Roles(Role.User)
  acceptApplication(@Param('applicationId') applicationId: string) {
    return this.applicationsService.acceptApplication(applicationId);
  }

  @Get('reject/:applicationId')
  @Roles(Role.User)
  rejectApplication(@Param('applicationId') applicationId: string) {
    return this.applicationsService.rejectApplication(applicationId);
  }
}
