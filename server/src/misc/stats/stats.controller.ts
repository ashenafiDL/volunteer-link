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
}
