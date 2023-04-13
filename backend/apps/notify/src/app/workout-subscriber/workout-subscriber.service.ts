import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutSubscriberRepository } from './workout-subscriber.repository';
import { MailService } from '../mail/mail.service';
import {
  EMAIL_KEY_INCLUDE,
  NOT_FOUND_ANY_SUBSCRIBES,
  NOT_FOUND_SUBSCRIBES,
  SUBSCRIBE_THIS_COACH_EXISTS,
} from './workout.subscriber.constant';
import { TokenPayload, WorkoutPayload } from '@backend/shared-types';
import axios from 'axios';
import { RedisService } from './redis.service';

@Injectable()
export class WorkoutSubscriberService {
  constructor(
    private readonly workoutSubscriberRepository: WorkoutSubscriberRepository,
    private readonly mailService: MailService,
    private readonly redisService: RedisService
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

  public async setWorkoutToRedisStore(workout: WorkoutPayload) {
    const subscribersEmail = (
      await this.workoutSubscriberRepository.findCoachSubscribers(
        workout.coachId
      )
    ).map((subscriber) => subscriber?.email);

    if (!subscribersEmail.length) {
      return;
    }

    for (const email of subscribersEmail) {
      await this.redisService.setValue(email, JSON.stringify(workout));
    }
  }

  public async sendNotifications() {
    const hasDbKeys = await this.redisService.hasDbKeys(EMAIL_KEY_INCLUDE);
    if (!hasDbKeys.length) {
      return;
    }

    const subscribersEmail = (
      await this.workoutSubscriberRepository.findSubscribers()
    ).map((subscriber) => subscriber?.email);
    const uniqueEmails = [...new Set(subscribersEmail)];

    if (!uniqueEmails.length) {
      throw new NotFoundException(NOT_FOUND_ANY_SUBSCRIBES);
    }

    for (const email of uniqueEmails) {
      const newWorkoutsForSubscriber = await this.redisService.getValue(email);

      if (!newWorkoutsForSubscriber.length) {
        continue;
      }

      const transformWorkoutsForSubscriber: Record<string, WorkoutPayload[]> =
        newWorkoutsForSubscriber
          .map((workout) => JSON.parse(workout))
          .reduce((prev, workout) => {
            if (!prev[workout.coachId]) {
              prev[workout.coachId] = [
                {
                  title: workout.title,
                  cost: workout.cost,
                  calories: workout.calories,
                },
              ];
              return prev;
            }

            prev[workout.coachId] = [
              ...prev[workout.coachId],
              {
                title: workout.title,
                cost: workout.cost,
                calories: workout.calories,
              },
            ];
            return prev;
          }, {});

      await this.mailService.sendNotifyNewWorkouts(
        email,
        transformWorkoutsForSubscriber
      );
    }

    this.redisService.cleanAllDb();
  }
}
