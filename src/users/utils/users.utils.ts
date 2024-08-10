import { createTransport } from 'nodemailer';
import myOAuth2Client, { googleEmailConfig } from './gauth';

export const sendEmailService = async (
  to: string,
  subject: string,
  html: string,
) => {
  try {
    myOAuth2Client.setCredentials({
      refresh_token: googleEmailConfig.refreshToken,
    });
    const accessToken = await myOAuth2Client.getAccessToken();
    const transportOptions: any = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: googleEmailConfig.email,
        clientId: googleEmailConfig.clientId,
        refreshToken: googleEmailConfig.refreshToken,
        accessToken: accessToken.token,
      },
    };
    const smtpTransport = createTransport(transportOptions);
    const mailOptions = {
      from: {
        name: 'Klinit',
        address: googleEmailConfig.email,
      },
      to,
      subject,
      html,
    };
    await smtpTransport.sendMail(mailOptions);
  } catch (error: any) {
    console.error(error);
  }
};
