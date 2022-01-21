import * as mailgun from 'mailgun-js';

export const mailgunFactory = {
  provide: 'mailgun',
  useFactory: () => {
    return new mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
  },
};
