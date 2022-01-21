import { Module, Global } from '@nestjs/common';
import { MailService } from './mail.service';
import { mailgunFactory } from './mailgun.factory';

@Global()
@Module({
  providers: [MailService, mailgunFactory],
  exports: [MailService],
})
export class MailModule {}
