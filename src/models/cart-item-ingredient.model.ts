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
import { CartItem } from './cart-item.model';
import { Ingredient } from './ingredient.model';

@Table({
  tableName: 'cart_item_ingredients',
  timestamps: true,
})
export class CartItemIngredient extends Model<
  InferAttributes<CartItemIngredient>,
  InferCreationAttributes<CartItemIngredient>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => CartItem)
  @Column({ type: DataType.UUID, allowNull: false })
  declare cartItemId: string;
  @BelongsTo(() => CartItem, { foreignKey: 'cartItemId', as: 'cartItem' })
  declare cartItem: CartItem;

  @ForeignKey(() => Ingredient)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ingredientId: string;
  @BelongsTo(() => Ingredient, {
    foreignKey: 'ingredientId',
    as: 'ingredient',
  })
  declare ingredient: Ingredient;

  @Column({ type: DataType.INTEGER, defaultValue: 1, allowNull: false })
  declare quantity: CreationOptional<number>;
}
