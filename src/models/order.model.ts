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
import { Address } from './address.model';
import { OrderItem } from './order-item.model';
import { Review } from './review.model';

export enum EOrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum EPaymentMethod {
  OFFLINE = 'offline',
  ONLINE = 'online',
}

export enum EPaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

Table({
  tableName: 'orders',
  timestamps: true,
});
export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare code: string;

  @Column({
    type: DataType.ENUM(...Object.values(EOrderStatus)),
    defaultValue: EOrderStatus.PENDING,
    allowNull: false,
  })
  declare status: CreationOptional<EOrderStatus>;

  @Column({
    type: DataType.ENUM(...Object.values(EPaymentMethod)),
    defaultValue: EPaymentMethod.OFFLINE,
    allowNull: false,
  })
  declare paymentMethod: CreationOptional<EPaymentMethod>;

  @Column({
    type: DataType.ENUM(...Object.values(EPaymentStatus)),
    defaultValue: EPaymentStatus.PENDING,
    allowNull: false,
  })
  declare paymentStatus: CreationOptional<EPaymentStatus>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare subTotal: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare deliveryFee: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare discount: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare total: CreationOptional<number>;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare note: string | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  declare user: User;

  @ForeignKey(() => Address)
  @Column({ type: DataType.UUID, allowNull: false })
  declare addressId: string;
  @BelongsTo(() => Address, { foreignKey: 'addressId', as: 'address' })
  declare address: Address;

  @HasMany(() => OrderItem, { foreignKey: 'orderId', as: 'orderItems' })
  declare orderItems: OrderItem[];

  @HasMany(() => Review, { foreignKey: 'orderId', as: 'reviews' })
  declare reviews: Review[];
}
