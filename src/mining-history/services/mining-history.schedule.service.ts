import { Injectable, HttpService } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { MiningHistoryCrudService } from './index';
import generateRandomNumber from '../../utils/generateRandomNumber';
import { ContractsQueryService } from '../../contracts/services';
import { SettingsCrudService, SettingsQueryService } from '../../settings/services';
import { Contracts } from '../../contracts/contracts.entity';
import { SEC_IN_DAY, THS_TO_BTC, CRYPTOCOMPARE_API_KEY } from './../../constants';
import { MailService } from '../../mail/mail.service';
import { dailyBTSPayment } from '../../mail/templates/daily-bts-payment';

@Injectable()
export class MiningHistoryScheduleService extends NestSchedule {
  constructor(
    private readonly crudService: MiningHistoryCrudService,
    private readonly contractsQueryService: ContractsQueryService,
    private readonly settingsCrudService: SettingsCrudService,
    private readonly settingsQueryService: SettingsQueryService,
    private readonly httpService: HttpService,
    private readonly mailService: MailService,
  ) {
    super();
  }

  @Cron('0 1 * * *')
  async cronJob() {
    const contracts = await this.contractsQueryService.getAllEntities();
    const settings = await this.settingsQueryService.getSettings();
    let miningDailyIncome;
    if (settings && settings.miningDailyIncome) {
      miningDailyIncome = settings.miningDailyIncome;
    } else {
      miningDailyIncome = 1;
    }

    const fakeHistory = contracts.map(async (contract: Contracts) => {
      const power = contract.rate * SEC_IN_DAY;
      const mining = power * THS_TO_BTC * miningDailyIncome;
      const minMining = mining - mining * 0.00001;
      const fakeMining = generateRandomNumber(minMining, mining);
      const profit = (fakeMining * 60) / 100;
      const bonus = profit / 100;

      await this.mailService.send({
        from: process.env.MAILGUN_SENDER_EMAIL,
        to: contract.contactEmail,
        subject: 'Notification of daily BTC payment',
        html: dailyBTSPayment(fakeMining),
      });

      return this.crudService.create({
        profit,
        bonus,
        mining: fakeMining,
        contractId: contract.id,
      });
    });

    try {
      await Promise.all(fakeHistory);
    } catch (error) {
      throw error;
    }
  }

  @Cron('0 * * * *')
  async getBTCPrice() {
    let btcPriceUsd: number;

    try {
      const { data } = await this.httpService
        .get('https://min-api.cryptocompare.com/data/price', {
          params: {
            api_key: CRYPTOCOMPARE_API_KEY,
            fsym: 'BTC',
            tsyms: 'USD',
          },
        })
        .toPromise();
      btcPriceUsd = Number(data.USD);
    } catch (error) {
      btcPriceUsd = 0;
    }

    if (btcPriceUsd) {
      this.settingsCrudService.update({ btcPriceUsd });
    }
  }
}
