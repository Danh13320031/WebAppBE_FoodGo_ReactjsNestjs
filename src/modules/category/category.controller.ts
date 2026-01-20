import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Product category - Danh mục sản phẩm')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Tạo mới danh mục' })
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Lấy tất cả danh mục' })
  @Get('all')
  async findAll() {
    return await this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Cập nhật danh mục theo id' })
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Xóa mềm danh mục theo id' })
  @Patch('soft-delete/:id')
  async softDelete(@Param('id') id: string) {
    return await this.categoryService.softDelete(id);
  }

  @ApiOperation({ summary: 'Xóa cứng danh mục theo id' })
  @Delete('hard-delete/:id')
  async hardDelete(@Param('id') id: string) {
    return await this.categoryService.hardDelete(id);
  }
}
