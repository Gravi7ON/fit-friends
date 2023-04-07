import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PersonalAccountController } from './personal-account.controller';
import { PersonalAccountService } from './personal-account.service';

@Module({
  imports: [UserModule],
  controllers: [PersonalAccountController],
  providers: [PersonalAccountService],
})
export class PersonalAccountModule {}
