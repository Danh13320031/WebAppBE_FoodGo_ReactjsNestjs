import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_TAG,
  SWAGGER_API_TITLE,
  SWAGGER_API_VERSION,
  SWAGGER_API_VERSION_ROUTE,
} from './common/constants';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { TransformInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = new ConfigService();
  const port = configService.get<number>('PORT') || 3000;

  app.setGlobalPrefix(SWAGGER_API_VERSION_ROUTE);

  // Global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Xóa các thuộc tính không được khai báo trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có thuộc tính không được khai báo trong DTO
      transform: true, // Tự động chuyển đổi payload thành các kiểu dữ liệu được khai báo trong DTO
    }),
  );

  // Global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // Global filter
  app.useGlobalFilters(new AllExceptionFilter());

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAGGER_API_TITLE)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_VERSION)
    .addTag(SWAGGER_API_TAG)
    .build();
  const swaggerDocumentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(
    `${SWAGGER_API_VERSION_ROUTE}/docs`,
    app,
    swaggerDocumentFactory,
  );

  await app.listen(port);
  logger.log(`Server running on port ${port}`);
  logger.log(
    `Swagger docs available at http://localhost:${port}/${SWAGGER_API_VERSION_ROUTE}/docs`,
  );
}
bootstrap();
