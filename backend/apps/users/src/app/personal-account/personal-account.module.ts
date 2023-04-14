import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PersonalAccountController } from './personal-account.controller';
import { PersonalAccountService } from './personal-account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodDiaryModel, FoodDiarySchema } from './models/food-diary.model';
import {
  WorkoutDiaryModel,
  WorkoutDiarySchema,
} from './models/workout-diary.model';
import {
  FavoriteGymsModel,
  FavoriteGymsSchema,
} from './models/favorite-gyms.model';
import { MyPurchaseModel, MyPurchaseSchema } from './models/my-purchase.model';
import { PersonalAccountRepository } from './personal-account.repository';
import { MyNotifyModel, MyNotifySchema } from './models/my-notify.model';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: FoodDiaryModel.name, schema: FoodDiarySchema },
      { name: WorkoutDiaryModel.name, schema: WorkoutDiarySchema },
      { name: FavoriteGymsModel.name, schema: FavoriteGymsSchema },
      { name: MyPurchaseModel.name, schema: MyPurchaseSchema },
      { name: MyNotifyModel.name, schema: MyNotifySchema },
    ]),
  ],
  controllers: [PersonalAccountController],
  providers: [PersonalAccountRepository, PersonalAccountService],
})
export class PersonalAccountModule {}
