import { NamingStrategy } from 'src/config/naming.strategy';
import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
  migrationsTableName: '__migrations',
  migrations: ['./migrations/**/*.ts'],
});
