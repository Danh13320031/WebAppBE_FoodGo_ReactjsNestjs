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
import { OrderItem } from './order-item.model';
import { Ingredient } from './ingredient.model';

@Table({
  tableName: 'order_item_ingredients',
  timestamps: true,
})
export class OrderItemIngredient extends Model<
  InferAttributes<OrderItemIngredient>,
  InferCreationAttributes<OrderItemIngredient>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => OrderItem)
  @Column({ type: DataType.UUID, allowNull: false })
  declare orderItemId: string;
  @BelongsTo(() => OrderItem, { foreignKey: 'orderItemId', as: 'orderItem' })
  declare orderItem: OrderItem;

  @ForeignKey(() => Ingredient)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ingredientId: string;
  @BelongsTo(() => Ingredient, {
    foreignKey: 'ingredientId',
    as: 'ingredient',
  })
  declare ingredient: Ingredient;

  @Column({ type: DataType.INTEGER, defaultValue: 1, allowNull: false })
  declare quantity: number;
}
