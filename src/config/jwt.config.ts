import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});
export default {
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'jwtRefreshSecret',
  jwtForgotPasswordSecret: process.env.JWT_FORGOT_PASSWORD_SECRET || 'jwtForgotPasswordSecret',
  jwtRegisterSecret: process.env.JWT_REGISTER_SECRET || 'jwtRegisterSecret',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '5',
  forgotPasswordTokenExpiration: process.env.FORGOT_PASSWORD_TOKEN_EXPIRATION || '5',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '3600',
  otpTimeOut: process.env.OTP_TIMEOUT || '120',
};
