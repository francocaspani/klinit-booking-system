import { IsEmail, IsEnum, IsObject, IsOptional } from 'class-validator';

export enum EmailType {
  Verification = 'verification',
  Access = 'access',
}

export class SendEmailDto {
  @IsEmail()
  to: string;

  @IsEnum(EmailType)
  type: EmailType;

  @IsOptional()
  @IsObject()
  replacements?: Record<string, any>;
}
