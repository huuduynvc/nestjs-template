import { NamingStrategy } from 'src/config/naming.strategy';

const baseOptions = {
  type: process.env.ORM_CONNECTION || 'postgres',
  host: process.env.ORM_HOST,
  port: process.env.ORM_PORT,
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DB,
  synchronize: false,
  dropSchema: false,
  entities: ['src/**/*.entity.ts'],
  namingStrategy: new NamingStrategy(),
};

const defaultOptions = {
  migrationsRuns: true,
  logging: true,
  migrationsTableName: '__migrations',
  migrations: ['./migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: './migrations',
  },
  ...baseOptions,
};

const seedOptions = {
  name: 'seed',
  migrationsRuns: true,
  logging: true,
  migrationsTableName: '__seeds',
  migrations: ['./seeds/**/*.ts'],
  cli: {
    entitiesDir: 'src/data/entities',
    migrationsDir: './seeds',
  },
  ...baseOptions,
};

export default [defaultOptions, seedOptions];
