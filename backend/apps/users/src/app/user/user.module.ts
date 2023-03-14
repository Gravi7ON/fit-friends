import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTrainerModel, UserTrainerSchema } from './models/user-trainer.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserCustomerModel, UserCustomerSchema } from './models/user-customer.model';
import { TokenModel, TokenSchema } from './models/token.model';
import { TokenRepository } from './token.repository';
import { BlackListTokenModel, BlackListTokenSchema } from './models/black-list-token.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTrainerModel.name, schema: UserTrainerSchema },
      { name: UserCustomerModel.name, schema: UserCustomerSchema },
      { name: TokenModel.name, schema: TokenSchema },
      { name: BlackListTokenModel.name, schema: BlackListTokenSchema }
    ]),
  ],
  providers: [UserRepository, UserService, TokenRepository],
  controllers: [UserController],
  exports: [UserRepository, TokenRepository],
})
export class UserModule {}
