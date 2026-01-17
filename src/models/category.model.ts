import { Helper } from '@/common/utils/helpers';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  BeforeUpdate,
  BeforeValidate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { Product } from './product.model';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare slug: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  declare isActived: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isFeatured: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDeleted: CreationOptional<boolean>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare sortOrder: CreationOptional<number>;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID, allowNull: true })
  declare parentId: string | null;
  @BelongsTo(() => Category, { foreignKey: 'parentId', as: 'parent' })
  declare parent?: Category;
  @HasMany(() => Category, { foreignKey: 'parentId', as: 'children' })
  declare children?: Category[];

  @HasMany(() => Product, { foreignKey: 'categoryId', as: 'products' })
  declare products: Product[];

  @HasMany(() => Ingredient, { foreignKey: 'categoryId', as: 'ingredients' })
  declare ingredients: Ingredient[];

  @BeforeValidate
  static makeSlug(newCategory: Category): void {
    const name: string = newCategory.dataValues.name;

    if (newCategory.isNewRecord && name) {
      const slug: string = Helper.makeSlugFromString(name);
      newCategory.setDataValue('slug', slug);
    }
  }

  @BeforeUpdate
  static updateSlug(updatedCategory: Category): void {
    if (updatedCategory.changed('name')) {
      const name: string = updatedCategory.dataValues.name;
      const slug: string = Helper.makeSlugFromString(name);

      console.log({ slug, name });
      updatedCategory.setDataValue('slug', slug);
    }
  }
}
