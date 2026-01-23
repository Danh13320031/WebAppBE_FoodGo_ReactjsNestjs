import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User - Người dùng')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Tạo / Đăng ký tài khoản người dùng' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
