import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed - Tạo dữ liệu')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({ summary: 'Tạo dữ liệu người dùng' })
  @Get('/user')
  seedUser() {
    return this.seedService.seedUser();
  }
}
