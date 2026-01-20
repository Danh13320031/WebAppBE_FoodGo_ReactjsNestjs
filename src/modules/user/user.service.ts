import { SALT_ROUNDS } from '@/common/constants';
import { User } from '@/models';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

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

  async register(createUserDto: CreateUserDto) {
    const alreadyExists = await this.findByEmail(createUserDto.email);

    if (alreadyExists) throw new BadGatewayException('Email đã được đăng ký');

    const hashPassword: string = bcrypt.hashSync(
      createUserDto.password,
      SALT_ROUNDS,
    );
    const payload = {
      ...createUserDto,
      password: hashPassword,
    };

    await this.userModel.create(payload as any);

    return { message: 'Đăng ký tài khoản thành công' };
  }
}
