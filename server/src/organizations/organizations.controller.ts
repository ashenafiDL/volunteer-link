import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('permit', {
      storage: diskStorage({
        destination: './uploads/permits',
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
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
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
    permit: Express.Multer.File,
  ) {
    console.log(createOrganizationDto);

    return this.organizationsService.create(createOrganizationDto, permit);
  }
}
