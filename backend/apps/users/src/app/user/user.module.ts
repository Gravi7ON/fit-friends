import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTrainerModel, UserTrainerSchema } from './models/user-trainer.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserCustomerModel, UserCustomerSchema } from './models/user-customer.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTrainerModel.name, schema: UserTrainerSchema },
      { name: UserCustomerModel.name, schema: UserCustomerSchema }
    ]),
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
