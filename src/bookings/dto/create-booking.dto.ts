import {
  ArrayNotEmpty,
  IsBoolean,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsUUID(4)
  clientId: string;

  @ArrayNotEmpty()
  services: string[];

  @IsOptional()
  @IsBoolean()
  isCancelled: boolean;

  @IsEmpty()
  totalPrice: number;

  @IsOptional()
  @IsString()
  workerId: string | null;

  @IsEmpty()
  totalDurationInMinutes: number;
}
