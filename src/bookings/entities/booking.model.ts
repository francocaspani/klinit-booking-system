import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Service } from 'src/services/entities/service.model';
import { User } from 'src/users/entities/user.model';
import { BookingService } from './bookingService.model';

@Table
export class Booking extends Model {
  @PrimaryKey
  @IsUUID(4)
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

  @AllowNull(false)
  @Column
  isCancelled: boolean;

  @AllowNull(false)
  @Column
  totalPrice: number;

  @AllowNull(false)
  @Column
  totalDuration: number;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column
  workerId: string;

  @BelongsTo(() => User, 'workerId')
  worker: User;
}
