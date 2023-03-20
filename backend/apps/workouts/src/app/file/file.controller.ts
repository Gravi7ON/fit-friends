import { Controller, Get, Param, Response } from '@nestjs/common';
import { WORKOUT_STATIC_IMAGE_PATH } from './file.constant';

@Controller('files')
export class FileController {
  @Get('/:imagename')
  getImageTest(@Param('imagename') image, @Response() res) {
    return res.sendFile(image, {root: WORKOUT_STATIC_IMAGE_PATH});
  }
}
