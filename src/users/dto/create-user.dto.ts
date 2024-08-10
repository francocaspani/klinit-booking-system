import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum Role {
  Worker = 'worker',
  Client = 'client',
  Admin = 'admin',
}

export class CreateUserDto {
  @IsEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('AR')
  phoneNumber: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsEmpty()
  emailVerified: boolean;
}
