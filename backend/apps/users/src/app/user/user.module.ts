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
import { PersonalTrainingRequestModel } from './models/personal-training-request.model';
import { PersonalTrainingRequestSchema } from './models/personal-training-request.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCoachModel.name, schema: UserCoachSchema },
      { name: UserCustomerModel.name, schema: UserCustomerSchema },
      { name: TokenModel.name, schema: TokenSchema },
      { name: BlackListTokenModel.name, schema: BlackListTokenSchema },
      { name: MyFriendsModel.name, schema: MyFriendsSchema },
      {
        name: PersonalTrainingRequestModel.name,
        schema: PersonalTrainingRequestSchema,
      },
    ]),
  ],
  providers: [UserRepository, UserService, TokenRepository],
  controllers: [UserController],
  exports: [UserRepository, TokenRepository],
})
export class UserModule {}
