import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  date: Date;
  services: string[];
  isCancelled: boolean;
  total: number;
  workerId: string | null;
}
