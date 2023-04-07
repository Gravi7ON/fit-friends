import { Controller, Get, Param, Response } from '@nestjs/common';
import {
  GYM_STATIC_IMAGE_PATH,
  WORKOUT_STATIC_IMAGE_PATH,
} from './file.constant';

@Controller('files')
export class FileController {
  @Get('/workouts/:imagename')
  getImageWorkout(@Param('imagename') image, @Response() res) {
    return res.sendFile(image, { root: WORKOUT_STATIC_IMAGE_PATH });
  }

  @Get('/gyms/:imagename')
  getImageGym(@Param('imagename') image, @Response() res) {
    return res.sendFile(image, { root: GYM_STATIC_IMAGE_PATH });
  }
}
