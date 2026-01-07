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
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { CartItem } from './cart-item.model';

@Table({
  tableName: 'carts',
  timestamps: true,
})
export class Cart extends Model<
  InferAttributes<Cart>,
  InferCreationAttributes<Cart>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true })
  declare userId: string | null;
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  declare user: User;

  @HasMany(() => CartItem, { foreignKey: 'cartId', as: 'items' })
  declare items: CartItem[];
}
