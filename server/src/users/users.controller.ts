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
  ApiGetMeEndpoint,
  ApiUpdateProfileEndpoint,
} from './docs/users-controllers.doc';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('me')
  @ApiGetMeEndpoint()
  async getMe(@Req() req: any) {
    const id = req.user.sub;
    const user = await this.userService.findById(id);
    return this.userService.sanitizeUserData(user);
  }

  @Get(':username')
  @ApiGetMeEndpoint()
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return this.userService.sanitizeUserData(user);
  }

  @Patch('me/update')
  @ApiUpdateProfileEndpoint()
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user.sub;
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('me/delete')
  @ApiDeleteAccountEndpoint()
  async delete(@Req() req) {
    const id = req.user.sub;
    return this.userService.deleteUser(id);
  }
  // userInfo
  @Public()
  @Get('userInfo')
  getUserInfo() {
    return this.userService.getUserInfo();
  }
}
