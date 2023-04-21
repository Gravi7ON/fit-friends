import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { WorkoutSubscriberController } from './workout-subscriber.controller';
import { MailModule } from '../mail/mail.module';
import { rabbitMqOptions } from '../../config/rabbitmq.config';
import { getMongoDbConfig, mongoDbOptions } from '../../config/mongodb.config';
import { mailOptions } from '../../config/mail.config';
import { jwtOptions } from '../../config/jwt.config';
import { redisOptions } from '../../config/redis.config';
import { NOTIFY_SERVICE_ENV_PATH } from '../app.constant';
import { WorkoutSubscriberModule } from './workout-subscriber.module';
import { WorkoutSubscriberService } from './workout-subscriber.service';
import { RequestWithTokenPayload, UserRole } from '@backend/shared-types';

describe('WorkoutSubscriberController', () => {
  let controller: WorkoutSubscriberController;
  let service: WorkoutSubscriberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          envFilePath: NOTIFY_SERVICE_ENV_PATH,
          load: [
            rabbitMqOptions,
            mongoDbOptions,
            mailOptions,
            jwtOptions,
            redisOptions,
          ],
        }),
        MongooseModule.forRootAsync(getMongoDbConfig()),
        WorkoutSubscriberModule,
        MailModule,
      ],
    }).compile();

    controller = module.get<WorkoutSubscriberController>(
      WorkoutSubscriberController
    );
    service = module.get<WorkoutSubscriberService>(WorkoutSubscriberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('** subscribe', () => {
    it('should return an object subscribe', async () => {
      const mockRequestObject = createMock<RequestWithTokenPayload>({
        user: {
          _id: '',
          name: 'Hawk Chip',
          email: 'me1@gmail.com',
          role: UserRole.Customer,
        },
        headers: {
          authorization:
            'Bearer jha34h2j3hg42jh34g2j3gh423khjg4.h4jhjhkg3423jhjk4hkfdjdhf.jh4j3h43jh4g3jhg432304hhlsdh',
        },
      });

      const result = {
        _id: '6437c4640ce8cc0b6a766467',
        email: 'me1@gmail.com',
        name: 'Hawk Chip',
        subscribeCoachId: '640b424084b71dfc366837ec',
      };

      jest
        .spyOn(service, 'addSubscribe')
        .mockImplementation(async () => result);

      expect(
        await controller.subscribe(
          {
            subscribeCoachId: '640b424084b71dfc366837ec',
          },
          mockRequestObject
        )
      ).toEqual({
        id: '6437c4640ce8cc0b6a766467',
        email: 'me1@gmail.com',
        name: 'Hawk Chip',
        subscribeCoachId: '640b424084b71dfc366837ec',
      });
    });
  });
});
