import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/entities';

export default class CreateData implements Seeder {
  public async run(appDataSource: DataSource): Promise<any> {
    const userRepository = appDataSource.getRepository(User);
    await userRepository.delete({});

    // Create user
    await appDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: '3519aa16-a2e5-4b11-986d-3fee0ea36932',
          email: 'abc@gmail.com',
          password: '123456',
        },
        {
          id: '3519aa16-a2e5-4b11-986d-3fee0ea36933',
          email: 'abc2@gmail.com',
          password: '123456',
        },
      ])
      .execute();
  }
}
