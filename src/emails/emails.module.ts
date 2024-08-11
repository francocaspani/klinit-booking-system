import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ConfigModule } from '@nestjs/config';
import { EmailTemplatesProvider } from './utils/email.templates';

@Module({
  imports: [ConfigModule],
  providers: [EmailsService, EmailTemplatesProvider],
  exports: [EmailsService],
})
export class EmailsModule {}
