import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutSubscriberRepository } from './workout-subscriber.repository';
import { MailService } from '../mail/mail.service';
import {
  NOT_FOUND_SUBSCRIBES,
  RABBITMQ_SERVICE,
  SUBSCRIBE_THIS_COACH_EXISTS,
} from './workout.subscriber.constant';
import { CommandEvent, TokenPayload } from '@backend/shared-types';
import axios from 'axios';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@backend/core';

@Injectable()
export class WorkoutSubscriberService {
  constructor(
    private readonly workoutSubscriberRepository: WorkoutSubscriberRepository,
    private readonly mailService: MailService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  public async addSubscribe(
    subscribeCoachId: string,
    { email, name }: TokenPayload,
    authorization: string
  ) {
    try {
      await axios.get(`http://localhost:3333/api/users/${subscribeCoachId}`, {
        headers: {
          Authorization: authorization,
        },
      });
    } catch (err) {
      throw new NotFoundException(err.response.data.message);
    }

    const existsSubscribe =
      await this.workoutSubscriberRepository.findByEmailAndCoachId(
        email,
        subscribeCoachId
      );

    if (existsSubscribe) {
      throw new ConflictException(SUBSCRIBE_THIS_COACH_EXISTS);
    }

    return this.workoutSubscriberRepository.create({
      email,
      name,
      subscribeCoachId,
    });
  }

  public async unSubscribe(userSubscriberEmail: string) {
    const existedSubscribes =
      await this.workoutSubscriberRepository.findAllUserSubscribes(
        userSubscriberEmail
      );

    if (!existedSubscribes.length) {
      Logger.error(NOT_FOUND_SUBSCRIBES);
    }

    this.workoutSubscriberRepository.destroy(userSubscriberEmail);
  }
}
