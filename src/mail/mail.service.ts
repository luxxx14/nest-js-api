import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { mailgunFactory } from './mailgun.factory';
import { Mailgun } from 'mailgun-js';

@Injectable()
export class MailService {
  constructor(
    @Inject(mailgunFactory.provide)
    private readonly mailgun: Mailgun,
  ) {}
  send(data) {
    this.mailgun.messages().send(data, function(error, body) {
      if (error) {
        throw new NotFoundException('Mail Error');
      }
    });
  }
}
