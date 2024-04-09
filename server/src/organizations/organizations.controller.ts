import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    const ownerId = req['user'].sub;
    return this.organizationsService.create(ownerId, createOrganizationDto);
  }

  @Get(':identifier')
  getOrg(@Param('identifier') identifier) {
    return this.organizationsService.getOrg(identifier);
  }
}
