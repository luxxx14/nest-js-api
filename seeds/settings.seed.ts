import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Settings } from '../src/settings/settings.entity';

export default class CreateSettings implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Settings)
      .values({
        id: 1,
        btcPriceUsd: 9627.47,
        miningDailyIncome: 1,
      })
      .execute();
  }
}
