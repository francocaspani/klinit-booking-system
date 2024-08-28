import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailTemplatesProvider } from './utils/email.templates';
import { google } from 'googleapis';
import Handlebars from 'handlebars';

type GOOGLE_MAIL_SERVICE_KEYS =
  | 'clientId'
  | 'clientSecret'
  | 'refreshToken'
  | 'redirectUri'
  | 'email';

@Injectable()
export class EmailsService {
  constructor(
    private configService: ConfigService,
    private emailTemplatesProvider: EmailTemplatesProvider,
  ) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      const googleEmailConfig: Record<GOOGLE_MAIL_SERVICE_KEYS, string> = {
        clientId: this.configService.get<string>('GOOGLE_CLIENT_ID') || '',
        clientSecret:
          this.configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
        refreshToken:
          this.configService.get<string>('GOOGLE_REFRESH_TOKEN') || '',
        redirectUri:
          this.configService.get<string>('GOOGLE_REDIRECT_URI') || '',
        email: this.configService.get<string>('GOOGLE_EMAIL') || '',
      };

      const OAuth2 = google.auth.OAuth2;
      const id = googleEmailConfig.clientId;
      const secret = googleEmailConfig.clientSecret;
      const myOAuth2Client = new OAuth2(id, secret);

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
      const { subject, html } = this.emailTemplatesProvider.getTemplate(
        sendEmailDto.type,
      );
      const template = Handlebars.compile(html);
      const replacements = sendEmailDto.replacements;
      const htmlToSend = template(replacements);
      const mailOptions = {
        from: {
          name: 'Klinit',
          address:
            this.configService.get<string>('EMAIL_USER') ||
            'francocaspani.dev@gmail.com',
        },
        to: sendEmailDto.to,
        subject,
        html: htmlToSend,
      };
      await smtpTransport.sendMail(mailOptions);
    } catch (error: any) {
      console.error(error);
      throw new Error('Error sending email');
    }
  }
}
