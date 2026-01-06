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
import { Order } from './order.model';
import { Product } from './product.model';
import { ProductVariant } from './product-variant.model';
import { OrderItemIngredient } from './order-item-ingredient.model';

@Table({
  tableName: 'order_items',
  timestamps: true,
})
export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  declare orderId: string;
  @BelongsTo(() => Order, { foreignKey: 'orderId', as: 'order' })
  declare order: Order;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  declare productId: string;
  @BelongsTo(() => Product, { foreignKey: 'productId', as: 'product' })
  declare product: Product;

  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.UUID, allowNull: true })
  declare variantId: string | null;
  @BelongsTo(() => ProductVariant, { foreignKey: 'variantId', as: 'variant' })
  declare variant: ProductVariant | null;

  @Column({ type: DataType.INTEGER, defaultValue: 1, allowNull: false })
  declare quantity: CreationOptional<number>;

  @HasMany(() => OrderItemIngredient, {
    foreignKey: 'orderItemId',
    as: 'ingredients',
  })
  declare ingredients: CreationOptional<OrderItemIngredient[]>;
}
