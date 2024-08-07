import {
  ArrayNotEmpty,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsUUID(4)
  clientId: string;

  @ArrayNotEmpty()
  services: string[];

  @IsBoolean()
  isCancelled: boolean;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsString()
  workerId: string | null;

  @IsNotEmpty()
  @IsNumber()
  totalDuration: number;
}
