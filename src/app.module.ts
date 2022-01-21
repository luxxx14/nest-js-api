import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from 'nest-schedule';
import { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } from './constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ContractsPlansModule } from './contracts-plans/contracts-plans.module';
import { ContractsModule } from './contracts/contracts.module';
import { WithdrawalRequestsModule } from './withdrawal-requests/withdrawal-requests.module';
import { PartnershipRequestsModule } from './partnership-requests/partnership-requests.module';
import { MiningHistoryModule } from './mining-history/mining-history.module';
import { SettingsModule } from './settings/settings.module';
import { MailModule } from './mail/mail.module';
import { ProfitabilityModule } from './profitability/profitability.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    ScheduleModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    ContractsPlansModule,
    ContractsModule,
    WithdrawalRequestsModule,
    PartnershipRequestsModule,
    MiningHistoryModule,
    SettingsModule,
    MailModule,
    ProfitabilityModule,
    MailerModule.forRoot({
      transport: 'smtp://info@astra-mining.com:Suin39nmdfLp[f@smtp.mail.ru',
      defaults: {
        from: 'info@astra-mining.com',
      },
      template: {
        dir: __dirname + '/mail/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
