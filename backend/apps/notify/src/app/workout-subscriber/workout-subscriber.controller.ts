import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkoutSubscriberService } from './workout-subscriber.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { createEvent, fillObject } from '@backend/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CommandEvent, RequestWithTokenPayload } from '@backend/shared-types';
import { CreatedSibscribeRdo } from './rdo/created-sibscribe';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './workout.subscriber.constant';

@Controller('workout-subscriber')
export class WorkoutSubscriberController {
  count = 0;
  constructor(
    private readonly subscribeService: WorkoutSubscriberService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

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

  @Get('send-notify')
  async sendNewWorkouts() {
    this.rabbitClient.emit(createEvent(CommandEvent.SendWorkout), 'start');
  }

  @MessagePattern({ cmd: CommandEvent.SendWorkout })
  async sendNotifications(@Payload() data, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    console.log(data);
  }
}
