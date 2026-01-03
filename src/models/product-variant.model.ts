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

export enum EProductVariantSize {
  SMALL = '15cm',
  MEDIUM = '20cm',
  LARGE = '30cm',
}

export enum EProductVariantType {
  THIN = 'thin',
  REGULAR = 'regular',
  THICK = 'thick',
}

@Table({
  tableName: 'product_variants',
  timestamps: true,
})
export class ProductVariant extends Model<
  InferAttributes<ProductVariant>,
  InferCreationAttributes<ProductVariant>
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

  @Column({
    type: DataType.ENUM(...Object.values(EProductVariantSize)),
    defaultValue: EProductVariantSize.SMALL,
    allowNull: false,
  })
  declare size: CreationOptional<EProductVariantSize>;

  @Column({
    type: DataType.ENUM(...Object.values(EProductVariantType)),
    defaultValue: EProductVariantType.THIN,
    allowNull: false,
  })
  declare type: CreationOptional<EProductVariantType>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare modifiedPrice: CreationOptional<number>;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  declare isActived: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDeleted: CreationOptional<boolean>;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  declare productId: string;
  @BelongsTo(() => Product, { foreignKey: 'productId', as: 'product' })
  declare product: Product;
}
