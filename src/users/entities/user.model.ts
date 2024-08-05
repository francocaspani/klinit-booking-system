import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Unique,
  IsUUID,
  DataType,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Booking } from 'src/bookings/entities/booking.model';

@Table
export class User extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column
  id: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  address: string;

  @Column
  phoneNumber: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('worker', 'client'),
  })
  role: 'worker' | 'client';

  @AllowNull(false)
  @Column({ defaultValue: false })
  isAdmin: boolean;

  @HasMany(() => Booking, 'clientId')
  clientBookings: Booking[];

  @HasMany(() => Booking, 'workerId')
  workerBookings: Booking[];
}
