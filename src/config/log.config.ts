import { registerAs } from '@nestjs/config';
import { format, transports } from 'winston';
import * as Sentry from 'winston-transport-sentry-node';
import { PackageInfo } from './package.info';

const SentryDefault = Sentry.default;

const sentryFormat = format((info) => {
  const { userAgent, ...extra } = info;

  return {
    ...extra,
    tags: {
      userAgent: userAgent || '',
      name: PackageInfo.name,
      pkgDesc: PackageInfo.description || 'none',
      version: PackageInfo.version,
    },
  };
});

const SentryOptions = {
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  level: 'error',
  environment: process.env.NODE_ENV || 'production',
  format: sentryFormat(),
};

export default registerAs('log', () => ({
  transports: [
    new transports.Console({ level: 'info', silent: process.env.NODE_ENV === 'test' }),
    new SentryDefault(SentryOptions),
  ],
}));
