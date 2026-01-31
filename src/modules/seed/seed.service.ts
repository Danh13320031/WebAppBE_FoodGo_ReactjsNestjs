import { SALT_ROUNDS } from '@/common/constants';
import { User } from '@/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { users } from './data';

@Injectable()
export class SeedService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async seedUser() {
    const userWithHashPassword = users.map((user) => {
      const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);
      return { ...user, password: hashedPassword };
    });

    return await this.userModel.bulkCreate(userWithHashPassword as any);
  }
}
