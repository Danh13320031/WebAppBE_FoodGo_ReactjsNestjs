import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum ECouponType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

@Table({
  tableName: 'coupons',
  timestamps: true,
})
export class Coupon extends Model<
  InferAttributes<Coupon>,
  InferCreationAttributes<Coupon>
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

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({
    type: DataType.ENUM(...Object.values(ECouponType)),
    defaultValue: ECouponType.FIXED,
    allowNull: false,
  })
  declare type: CreationOptional<ECouponType>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare value: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare minOrderAmount: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, defaultValue: 1, allowNull: false })
  declare maxUses: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  declare currentUses: CreationOptional<number>;

  @Column({ type: DataType.DATE, allowNull: true })
  declare validFrom: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare validTo: Date | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  declare isActived: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDeleted: CreationOptional<boolean>;
}
