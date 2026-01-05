import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'addresses',
  timestamps: true,
})
export class Address extends Model<
  InferAttributes<Address>,
  InferCreationAttributes<Address>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: true })
  declare city: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare district: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare ward: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare street: string | null;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare latitude: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare longitude: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDefault: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDeleted: CreationOptional<boolean>;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  declare user: User;
}
