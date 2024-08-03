import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Unique,
  IsUUID,
} from 'sequelize-typescript';

@Table
export class Users extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column
  id: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  address: string;

  @Column
  role: string;

  @Column
  isAdmin: boolean;
}
