import { User } from '@/models';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);

    if (!user) throw new BadGatewayException('Người dùng không tồn tại');

    const isCorrectPassword = user.comparePassword(password);

    if (!isCorrectPassword)
      throw new BadGatewayException('Mật khẩu không chính xác');

    // const plainUser = user.getUserWithoutPassword();
    // const accessToken = await this.jwtService.signAsync({
    //   uid: plainUser.id,
    //   role: plainUser.role,
    // });
    const plainUser = user.toJSON();

    return { id: plainUser.id, role: plainUser.role };

    // {
    //   message: 'Đăng nhập thành công',
    //   accessToken,
    // };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);

    if (user) throw new BadGatewayException('Email đã được đăng ký');
    await this.userModel.create(createUserDto as any);

    return { message: 'Đăng ký tài khoản thành công' };
  }
}
