import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCoachModel, UserCoachSchema } from './models/user-coach.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import {
  UserCustomerModel,
  UserCustomerSchema,
} from './models/user-customer.model';
import { TokenModel, TokenSchema } from './models/token.model';
import { TokenRepository } from './token.repository';
import {
  BlackListTokenModel,
  BlackListTokenSchema,
} from './models/black-list-token.model';
import { MyFriendsModel, MyFriendsSchema } from './models/my-friends.model';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCoachModel.name, schema: UserCoachSchema },
      { name: UserCustomerModel.name, schema: UserCustomerSchema },
      { name: TokenModel.name, schema: TokenSchema },
      { name: BlackListTokenModel.name, schema: BlackListTokenSchema },
      { name: MyFriendsModel.name, schema: MyFriendsSchema },
      { name: FoodDiaryModel.name, schema: FoodDiarySchema },
      { name: WorkoutDiaryModel.name, schema: WorkoutDiarySchema },
      { name: FavoriteGymsModel.name, schema: FavoriteGymsSchema },
      { name: MyPurchaseModel.name, schema: MyPurchaseSchema },
    ]),
  ],
  providers: [UserRepository, UserService, TokenRepository],
  controllers: [UserController],
  exports: [UserRepository, TokenRepository],
})
export class UserModule {}
