import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum EUserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.STRING, allowNull: true })
  providers: string;

  @Column({
    type: DataType.ENUM(...Object.values(EUserRole)),
    defaultValue: EUserRole.CUSTOMER,
    allowNull: false,
  })
  role: EUserRole;
}
