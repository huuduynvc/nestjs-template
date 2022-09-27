import { join } from 'path';
import { NamingStrategy } from '@blox3/infra-common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});
export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING === 'true',
  autoLoadEntities: true,
  keepConnectionAlive: true,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
  extra: {
    connectionLimit: 10,
  },
} as TypeOrmModuleOptions;
