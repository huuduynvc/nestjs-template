import { registerAs } from '@nestjs/config';
import { configAppSetting } from './consts';

export class ApplicationSettings {
  notification!: {
    noReplyEmail: string;
  };

  partnerDashboardUrl!: string;

  constructor(partial: Partial<ApplicationSettings>) {
    Object.assign(this, partial);
  }
}

export default registerAs(
  configAppSetting,
  () =>
    new ApplicationSettings({
      notification: {
        noReplyEmail: process.env.NO_REPLY_EMAIL || 'no-reply@blox3.com',
      },
      partnerDashboardUrl: process.env.PARTNER_DASHBOARD_URL || 'https://blox3.com',
    }),
);
