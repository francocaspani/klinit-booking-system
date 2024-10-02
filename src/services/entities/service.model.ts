import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
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
  @Default(DataType.UUIDV4)
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
  durationInMinutes: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('commercial', 'residential'),
  })
  category: 'commercial' | 'residential';

  @AllowNull(false)
  @Column({ defaultValue: true })
  isAvailable: boolean;

  @BelongsToMany(() => Booking, () => BookingService)
  bookings: Booking[];
}
