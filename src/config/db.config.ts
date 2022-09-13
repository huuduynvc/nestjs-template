import { registerAs } from '@nestjs/config';
import { NamingStrategy } from './naming.strategy';

export default registerAs('db', () => ({
  type: process.env.ORM_CONNECTION || 'postgres',
  host: process.env.ORM_HOST,
  port: process.env.ORM_PORT,
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  logging: process.env.ORM_LOGGING === 'true',
  autoLoadEntities: true,
  keepConnectionAlive: process.env.ORM_KEEPCONNECTIONALIVE === 'true',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  namingStrategy: new NamingStrategy(),
}));
