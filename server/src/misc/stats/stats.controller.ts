import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiGetSummaryEndpoint } from './docs/stats-controllers.doc';
import { StatsService } from './stats.service';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Public()
  @ApiGetSummaryEndpoint()
  @Get('summary')
  getUserInfo() {
    return this.statsService.getSummary();
  }

  @Get('age-and-gender')
  getAgeAndGenderCount() {
    return this.statsService.getAgeAndGenderCount();
  }

  @Get('projectStat')
  getProjectStat() {
    return this.statsService.projectStat();
  }

  @Get('verifiedAndNotVerified')
  verifiedAndNotVerified() {
    return this.statsService.verifiedAndNotVerified();
  }

  @Get('reportStat')
  reportStat() {
    return this.statsService.reportStats();
  }

  @Get('popularSkills')
  getPopularSkills() {
    return this.statsService.getPopularSkills();
  }
}
