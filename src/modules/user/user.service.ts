import { User } from '@/models';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const alreadyExists = await this.findByEmail(email);

    if (!alreadyExists)
      throw new BadGatewayException('Người dùng không tồn tại');

    console.log(alreadyExists);

    return { message: 'Login' };
  }
}
