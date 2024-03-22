import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiDeleteAccountEndpoint,
  ApiDeleteEducationEndpoint,
  ApiGetMeEndpoint,
  ApiGetUserByUsernameEndpoint,
  ApiRemoveSkillEndpoint,
  ApiUpdateEducationEndpoint,
  ApiUpdateProfileEndpoint,
} from './docs/users-controllers.doc';
import { EducationInfoDto } from './dto/education-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @ApiGetMeEndpoint()
  async getMe(@Req() req: any) {
    const id = req.user.sub;
    const user = await this.userService.findOne(id);
    return this.userService.sanitizeUserData(user);
  }

  @Get(':username')
  @ApiGetUserByUsernameEndpoint()
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.findOne(username);
    return this.userService.sanitizeUserData(user);
  }

  @Patch('me/update')
  @ApiUpdateProfileEndpoint()
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user.sub;
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch('me/education/update/:educationId')
  @ApiUpdateEducationEndpoint()
  async updateEducation(
    @Req() req,
    @Param('educationId') educationId: string,
    @Body() updateEducationInfoDto: EducationInfoDto,
  ) {
    const userId = req.user.sub;
    return this.userService.updateEducation(
      userId,
      educationId,
      updateEducationInfoDto,
    );
  }

  @Delete('me/education/remove/:educationId')
  @ApiDeleteEducationEndpoint()
  async removeEducation(@Req() req, @Param('educationId') educationId: string) {
    const userId = req.user.sub;
    return this.userService.deleteEducation(userId, educationId);
  }

  @Delete('me/delete')
  @ApiDeleteAccountEndpoint()
  async delete(@Req() req) {
    const id = req.user.sub;
    return this.userService.deleteUser(id);
  }

  @Patch('me/skills/remove/:skillId')
  @ApiRemoveSkillEndpoint()
  async removeSkill(@Req() req, @Param('skillId') skillId: string) {
    const userId = req.user.sub;
    return this.userService.removeSkill(userId, skillId);
  }
}
