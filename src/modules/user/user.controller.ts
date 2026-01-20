import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    return await this.userService.validateUser(email, password);
  }
}
