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
import { Product } from './product.model';
import { Ingredient } from './ingredient.model';

@Table({
  tableName: 'product_ingredients',
  timestamps: true,
})
export class ProductIngredient extends Model<
  InferAttributes<ProductIngredient>,
  InferCreationAttributes<ProductIngredient>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  declare productId: string;
  @BelongsTo(() => Product, { foreignKey: 'productId', as: 'product' })
  declare product: Product;

  @ForeignKey(() => Ingredient)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ingredientId: string;
  @BelongsTo(() => Ingredient, { foreignKey: 'ingredientId', as: 'ingredient' })
  declare ingredient: Ingredient;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDefault: CreationOptional<boolean>;

  @Column({ type: DataType.INTEGER, defaultValue: 1, allowNull: false })
  declare quantity: CreationOptional<number>;
}
