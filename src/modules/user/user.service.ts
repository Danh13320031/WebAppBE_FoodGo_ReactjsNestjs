import { User } from '@/models';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcript from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email }, raw: true });
  }

  async validateUser(email: string, password: string) {
    const alreadyExists = await this.findByEmail(email);

    if (!alreadyExists)
      throw new BadGatewayException('Người dùng không tồn tại');

    const isCorrectPassword = bcript.compareSync(
      password,
      alreadyExists.password,
    );

    if (!isCorrectPassword)
      throw new BadGatewayException('Mật khẩu không chính xác');

    const { password: _, ...result } = alreadyExists;

    // Trả về access token hoặc thông tin người dùng
    return { message: 'Đăng nhập thành công', data: result };
  }
}
