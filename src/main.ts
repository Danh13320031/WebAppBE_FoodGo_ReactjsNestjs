import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Xóa các thuộc tính không được khai báo trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có thuộc tính không được khai báo trong DTO
      transform: true, // Tự động chuyển đổi payload thành các kiểu dữ liệu được khai báo trong DTO
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
