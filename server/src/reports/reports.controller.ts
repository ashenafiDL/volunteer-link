import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Req() req, @Body() createReportDto: CreateReportDto) {
    const reporterId = req.user.sub;
    return this.reportsService.create(reporterId, createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
