import { Category } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Helper } from '@/common/utils/helpers';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const alreadyExists = await this.categoryModel.findOne({
      where: { slug: Helper.makeSlugFromString(createCategoryDto.name) },
    });

    if (alreadyExists)
      throw new BadRequestException('Danh mục món ăn đã tồn tại');

    await this.categoryModel.create(createCategoryDto as any);
    return { message: 'Tạo danh mục món ăn thành công' };
  }
}
