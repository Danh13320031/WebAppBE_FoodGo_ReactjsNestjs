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
import { Category } from './category.model';
import { ProductVariant } from './product-variant.model';
import { ProductIngredient } from './product-ingredient.model';
import { OrderItem } from './order-item.model';

@Table({
  tableName: 'products',
  timestamps: true,
})
export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
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

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare slug: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare basePrice: CreationOptional<number>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare thumbnail: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  declare isActived: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isFeatured: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDeleted: CreationOptional<boolean>;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID, allowNull: false })
  declare categoryId: string;
  @BelongsTo(() => Category, { foreignKey: 'categoryId', as: 'category' })
  declare category: Category;

  @HasMany(() => ProductVariant, { foreignKey: 'productId', as: 'variants' })
  declare variants: ProductVariant[];

  @HasMany(() => ProductIngredient, {
    foreignKey: 'productId',
    as: 'ingredients',
  })
  declare ingredients: ProductIngredient[];

  @HasMany(() => OrderItem, { foreignKey: 'productId', as: 'orderItems' })
  declare orderItems: OrderItem[];
}
