import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotifySubject } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewWorkouts(subscriberEmail: string, workouts) {
    await this.mailerService.sendMail({
      to: subscriberEmail,
      subject: NotifySubject.NewWorkouts,
      template: './send-workout',
      context: {
        workouts,
      },
    });
  }
}
