import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Col } from 'sequelize/lib/utils';

@Table
export class User extends Model<User> {
  @Column(DataType.STRING)
  name: string;

  @Unique
  @Column(DataType.STRING(40))
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  passwordHash: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.DATE)
  birthdate: Date;

  @Column(DataType.DECIMAL)
  monthlyIncome: number;

  @Column(DataType.STRING)
  username: string;
}
