import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Service } from 'src/services/entities/service.model';
import { User } from 'src/users/entities/user.model';
import { BookingService } from './bookingService.model';
import { BookingStatus } from '../dto/create-booking.dto';

@Table
export class Booking extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @AllowNull(false)
  @Column
  date: Date;

  @AllowNull(false)
  @IsUUID(4)
  @ForeignKey(() => User)
  @Column
  clientId: string;

  @BelongsTo(() => User, 'clientId')
  client: User;

  @BelongsToMany(() => Service, () => BookingService)
  services: Service[];

  @Default(false)
  @Column
  isCancelled: boolean;

  @AllowNull(false)
  @Column
  totalPrice: number;

  @AllowNull(false)
  @Column
  totalDurationInMinutes: number;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column
  workerId: string;

  @BelongsTo(() => User, 'workerId')
  worker: User;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('pending', 'completed', 'cancelled'),
  })
  status: BookingStatus;
}
