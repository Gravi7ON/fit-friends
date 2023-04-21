import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkoutSubscriberService } from './workout-subscriber.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { fillObject } from '@backend/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import {
  CommandEvent,
  RequestWithTokenPayload,
  WorkoutPayload,
} from '@backend/shared-types';
import { CreatedSibscribeRdo } from './rdo/created-sibscribe';
import { EventPattern } from '@nestjs/microservices';

@Controller('workout-subscriber')
export class WorkoutSubscriberController {
  constructor(private readonly subscribeService: WorkoutSubscriberService) {}

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  async subscribe(
    @Body() { subscribeCoachId }: CreateSubscribeDto,
    @Request() request: RequestWithTokenPayload
  ) {
    const userSubscriber = request.user;
    const authorization = request.headers.authorization;
    const newSubscribe = await this.subscribeService.addSubscribe(
      subscribeCoachId,
      userSubscriber,
      authorization
    );

    return fillObject(CreatedSibscribeRdo, newSubscribe);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unsubscribe')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unSubscribe(@Request() request: RequestWithTokenPayload) {
    const userSubscriberEmail = request.user.email;
    this.subscribeService.unSubscribe(userSubscriberEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get('send-notify')
  @HttpCode(HttpStatus.NO_CONTENT)
  async sendNewWorkouts() {
    this.subscribeService.sendNotifications();
  }

  @EventPattern({ cmd: CommandEvent.SendWorkout })
  async sendNotifications(workout: WorkoutPayload) {
    this.subscribeService.setWorkoutToRedisStore(workout);
  }
}
