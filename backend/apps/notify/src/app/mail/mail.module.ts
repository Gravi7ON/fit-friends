import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from '../../config/mail.config';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(getMailConfig())],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
