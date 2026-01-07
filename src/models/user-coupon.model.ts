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
import { User } from './user.model';
import { Coupon } from './coupon.model';

@Table({
  tableName: 'user_coupons',
  timestamps: true,
})
export class UserCoupon extends Model<
  InferAttributes<UserCoupon>,
  InferCreationAttributes<UserCoupon>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isUsed: CreationOptional<boolean>;

  @Column({ type: DataType.DATE, allowNull: true })
  declare usedAt: Date | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  declare userId: string;
  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  declare user: User;

  @ForeignKey(() => Coupon)
  @Column({ type: DataType.UUID, allowNull: false })
  declare couponId: string;
  @BelongsTo(() => Coupon, { foreignKey: 'couponId', as: 'coupon' })
  declare coupon: Coupon;
}
