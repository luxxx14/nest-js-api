import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../src/users/user.entity';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email: 'aaa111@gmail.com',
        password: 'c44c632da6aa81c53622ff68317b3c5046f6e9e886ee1a5c39420ecc058cfcd6',
        role: 'admin',
        name: 'admin',
        signUpConfirmed: true,
      })
      .execute();
  }
}
