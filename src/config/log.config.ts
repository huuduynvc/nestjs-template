import { transports } from 'winston';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});
export default {
  transports: [new transports.Console({ level: 'info', silent: process.env.NODE_ENV === 'test' })],
};
