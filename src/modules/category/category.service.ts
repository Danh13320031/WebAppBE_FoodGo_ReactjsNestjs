import { Helper } from '@/common/utils/helpers';
import { Category } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  async findAll() {
    return await this.categoryModel.findAll({
      where: { isDeleted: false, isActived: true },
      order: [['sortOrder', 'DESC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const alreadyExists = await this.categoryModel.findByPk(id);

    if (!alreadyExists)
      throw new BadRequestException('Danh mục món ăn không tồn tại');
    await alreadyExists.update(updateCategoryDto);

    return {
      message: 'Cập nhật danh mục món ăn thành công',
      data: { id: alreadyExists.id },
    };
  }

  async softDelete(id: string) {
    const alreadyExists = await this.categoryModel.findByPk(id);

    if (!alreadyExists)
      throw new BadRequestException('Danh mục món ăn không tồn tại');
    await alreadyExists.update({ isDeleted: true });

    return {
      message: 'Xóa mềm danh mục món ăn thành công',
    };
  }

  async hardDelete(id: string) {
    await this.categoryModel.destroy({ where: { id }, cascade: true });

    return {
      message: 'Xóa cứng danh mục món ăn thành công',
    };
  }
}
