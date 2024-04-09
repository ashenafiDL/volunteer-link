import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Public } from '../auth/decorators/public.decorator';
import {
  ApiDeleteProfilePictureEndpoint,
  ApiGetProfilePictureEndpoint,
  ApiProfilePicUpdateEndpoint,
} from './docs/files-controllers.docs';
import { UpdateProfilePicDto } from './dto/update-profile-pic.dto';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiProfilePicUpdateEndpoint()
  @Post('profilePic/update')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, callback) => {
          callback(
            null,
            `${req.user['sub']}_${new Date().toISOString()}.${file.originalname
              .split('.')
              .pop()}`,
          );
        },
      }),
    }),
  )
  uploadFile(
    @Body() updateProfilePicDto: UpdateProfilePicDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|jpg|png',
        })
        .addMaxSizeValidator({
          maxSize: 2000000, // 2MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.changeProfileImage(
      updateProfilePicDto.email,
      file,
    );
  }

  @Public()
  @ApiGetProfilePictureEndpoint()
  @Get('getProfilePicture/:email')
  async serveProfilePicture(@Param('email') email: string, @Res() res: any) {
    try {
      const filepath = await this.filesService.findProfilePicturePath(email);
      res.sendFile(`${process.cwd()}/${filepath}`);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching profile picture. Please try again.',
      );
    }
  }

  @Public()
  @ApiGetProfilePictureEndpoint()
  @Get('getProfilePicture/:email')
  async serveLogo(@Param('id') id: string, @Res() res: any) {
    try {
      const filepath = await this.filesService.findLogoPath(id);
      res.sendFile(`${process.cwd()}/${filepath}`);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching profile picture. Please try again.',
      );
    }
  }

  @Delete('deleteProfilePicture')
  @ApiDeleteProfilePictureEndpoint()
  deleteAvatar(@Req() req) {
    const id = req.user['sub'];
    return this.filesService.deleteProfilePicture(id);
  }
}
