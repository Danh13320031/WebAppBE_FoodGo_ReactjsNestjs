import {
  Address,
  Cart,
  CartItem,
  CartItemIngredient,
  Category,
  Coupon,
  Ingredient,
  Order,
  OrderItem,
  OrderItemIngredient,
  Product,
  ProductIngredient,
  ProductVariant,
  Review,
  User,
  UserCoupon,
} from '@/models';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: configService.get<Dialect>('DB_DIALECT') ?? 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT')
    ? Number(configService.get<number>('DB_PORT'))
    : 5432,
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  autoLoadModels: true,
  synchronize: true,
  logging: false,
  models: [
    Address,
    CartItemIngredient,
    CartItem,
    Cart,
    Category,
    Coupon,
    Ingredient,
    OrderItemIngredient,
    OrderItem,
    Order,
    ProductIngredient,
    ProductVariant,
    Product,
    Review,
    UserCoupon,
    User,
  ],
});
