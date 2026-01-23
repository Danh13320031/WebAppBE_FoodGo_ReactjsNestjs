import { SALT_ROUNDS } from '@/common/constants';
import * as bcrypt from 'bcrypt';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  BeforeValidate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { Review } from './review.model';
import { UserCoupon } from './user-coupon.model';

export enum EUserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  declare phone: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare avatar: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare providers: string | null;

  @Column({
    type: DataType.ENUM(...Object.values(EUserRole)),
    defaultValue: EUserRole.CUSTOMER,
    allowNull: false,
  })
  declare role: CreationOptional<EUserRole>;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  declare isActived: CreationOptional<boolean>;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  declare isDeleted: CreationOptional<boolean>;

  @HasMany(() => Address, { foreignKey: 'userId', as: 'addresses' })
  declare addresses: Address[];

  @HasMany(() => Order, { foreignKey: 'userId', as: 'orders' })
  declare orders: Order[];

  @HasMany(() => Cart, { foreignKey: 'userId', as: 'carts' })
  declare carts: Cart[];

  @HasMany(() => UserCoupon, { foreignKey: 'userId', as: 'coupons' })
  declare coupons: UserCoupon[];

  @HasMany(() => Review, { foreignKey: 'userId', as: 'reviews' })
  declare reviews: Review[];

  @BeforeValidate
  static hasPassword(user: User) {
    if (user.isNewRecord) {
      const password: string = user.get('password');
      const hashedPassword: string = bcrypt.hashSync(password, SALT_ROUNDS);

      user.setDataValue('password', hashedPassword);
    }
  }

  comparePassword(password: string): boolean {
    const { password: passwordInDb } = this.get({ plain: true });
    return bcrypt.compareSync(password, passwordInDb);
  }

  getUserWithoutPassword() {
    const { password: _, ...userWithoutPassword } = this.get({ plain: true });
    return userWithoutPassword;
  }
}
