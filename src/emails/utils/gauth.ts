import { google } from 'googleapis';

type GOOGLE_MAIL_SERVICE_KEYS =
  | 'clientId'
  | 'clientSecret'
  | 'refreshToken'
  | 'redirectUri'
  | 'email';

export const googleEmailConfig: Record<GOOGLE_MAIL_SERVICE_KEYS, string> = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN || '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
  email: process.env.GOOGLE_EMAIL || '',
};

const OAuth2 = google.auth.OAuth2;
const id = googleEmailConfig.clientId;
const secret = googleEmailConfig.clientSecret;

const myOAuth2Client = new OAuth2(id, secret);
export default myOAuth2Client;
