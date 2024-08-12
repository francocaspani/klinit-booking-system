import { Injectable } from '@nestjs/common';
import { EmailType } from '../dto/send-email.dto';
import { join } from 'path';
import { readFileSync } from 'fs';

const verificationPath = join(
  __dirname,
  '../../../templates/verification.html',
);

const accessPath = join(__dirname, '../../../templates/access.html');

@Injectable()
export class EmailTemplatesProvider {
  private templates: Map<EmailType, { subject: string; html: string }> =
    new Map();

  constructor() {
    // Add your email templates here
    this.templates.set(EmailType.Verification, {
      subject: 'Bienvenido a Klinit!',
      html: readFileSync(verificationPath, 'utf8'),
    });

    this.templates.set(EmailType.Access, {
      subject: 'Código de acceso',
      html: readFileSync(accessPath, 'utf8'),
    });

    // Add more templates as needed
  }

  getTemplate(emailType: EmailType): { subject: string; html: string } {
    const template = this.templates.get(emailType);
    if (!template) {
      throw new Error('Template not found');
    }
    return template;
  }
}
