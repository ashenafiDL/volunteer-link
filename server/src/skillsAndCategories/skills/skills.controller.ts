import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiCreateSkillEndpoint,
  ApiDeleteSkillEndpoint,
  ApiFindAllSkillsEndpoint,
  ApiFindOneSkillEndpoint,
  ApiUpdateSkillEndpoint,
} from './docs/skills-controllers.doc';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillsService } from './skills.service';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiCreateSkillEndpoint()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Public()
  @Get()
  @ApiFindAllSkillsEndpoint()
  findAll() {
    return this.skillsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiFindOneSkillEndpoint()
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @ApiUpdateSkillEndpoint()
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @ApiDeleteSkillEndpoint()
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}