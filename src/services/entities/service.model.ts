import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Booking } from 'src/bookings/entities/booking.model';
import { BookingService } from 'src/bookings/entities/bookingService.model';

@Table
export class Service extends Model<Service> {
  @PrimaryKey
  @IsUUID(4)
  @Column
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @Column
  description: string;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @Column
  duration: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('comercial', 'residential'),
  })
  category: 'comercial' | 'residential';

  @AllowNull(false)
  @Column({ defaultValue: true })
  isAvailable: boolean;

  @BelongsToMany(() => Booking, () => BookingService)
  bookings: Booking[];
}
