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

@Table({
  tableName: 'ingredients',
  timestamps: true,
})
export class Ingredient extends Model<
  InferAttributes<Ingredient>,
  InferCreationAttributes<Ingredient>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare imageUrl: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare price: CreationOptional<number>;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  declare isActived: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isRequired: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDeleted: CreationOptional<boolean>;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID, allowNull: false })
  declare categoryId: string;
  @BelongsTo(() => Category, { foreignKey: 'categoryId', as: 'category' })
  declare category: Category;

  @HasMany(() => Ingredient, { foreignKey: 'categoryId', as: 'ingredients' })
  declare ingredients: Ingredient[];
}
