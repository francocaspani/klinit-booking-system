import { Model, Table, Column, ForeignKey, IsUUID } from 'sequelize-typescript';
import { Booking } from './booking.model';
import { Service } from 'src/services/entities/service.model';

@Table
export class BookingService extends Model<BookingService> {
  @ForeignKey(() => Booking)
  @IsUUID(4)
  @Column
  bookingId: string;

  @ForeignKey(() => Service)
  @IsUUID(4)
  @Column
  serviceId: string;
}
