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
  Default,
} from 'sequelize-typescript';
import { Booking } from 'src/bookings/entities/booking.model';
import { Role } from '../dto/create-user.dto';

@Table
export class User extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

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
  @Default('client')
  @Column({
    type: DataType.ENUM('worker', 'client', 'admin'),
  })
  role: Role;

  @AllowNull(false)
  @Default(false)
  @Column
  emailVerified: boolean;

  @HasMany(() => Booking, 'clientId')
  clientBookings: Booking[];

  @HasMany(() => Booking, 'workerId')
  workerBookings: Booking[];
}
