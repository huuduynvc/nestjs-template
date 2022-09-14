import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { NamingStrategy } from './naming.strategy';

export default registerAs('db', () => ({
  type: process.env.DB_CONNECTION || 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING === 'true',
  autoLoadEntities: true,
  keepConnectionAlive: process.env.DB_KEEPCONNECTIONALIVE === 'true',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
}));
