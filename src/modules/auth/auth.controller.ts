import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication - Xác thực')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng nhập' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: any) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
