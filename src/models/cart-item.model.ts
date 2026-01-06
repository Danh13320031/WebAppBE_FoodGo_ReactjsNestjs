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
import { Cart } from './cart.model';
import { Product } from './product.model';
import { ProductVariant } from './product-variant.model';

@Table({
  tableName: 'cart_items',
  timestamps: true,
})
export class CartItem extends Model<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => Cart)
  @Column({ type: DataType.UUID, allowNull: false })
  declare cartId: string;
  @BelongsTo(() => Cart, { foreignKey: 'cartId', as: 'cart' })
  declare cart: Cart;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  declare productId: string;
  @BelongsTo(() => Product, { foreignKey: 'productId', as: 'product' })
  declare product: Product;

  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.UUID, allowNull: false })
  declare variantId: string;
  @BelongsTo(() => ProductVariant, { foreignKey: 'variantId', as: 'variant' })
  declare variant: ProductVariant;

  @Column({ type: DataType.INTEGER, defaultValue: 1, allowNull: false })
  declare quantity: CreationOptional<number>;
}
