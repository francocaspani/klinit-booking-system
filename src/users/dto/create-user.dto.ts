import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export enum Role {
  Worker = 'worker',
  Client = 'client',
}

export class CreateUserDto {
  @IsUUID(4)
  id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('AR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  isAdmin: boolean;
}
