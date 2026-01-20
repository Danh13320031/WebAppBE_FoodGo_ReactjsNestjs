import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Tên danh mục',
    example: 'Đồ ăn nhanh',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tên phải là một chuỗi' })
  name: string;

  @ApiProperty({
    description: 'Mô tả danh mục',
    example: 'Đây là danh mục đồ ăn nhanh',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là một chuỗi' })
  description: string;

  @ApiProperty({
    description: 'Thứ tự sắp xếp',
    example: 1,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Thứ tự sắp xếp phải là một số' })
  sortOrder: number;

  @ApiProperty({
    description: 'Id danh mục cha',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là một chuỗi' })
  parentId?: string | null;

  @ApiProperty({
    description: 'Trạng thái hoạt động',
    example: true,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActived phải là kiểu boolean' })
  isActived?: boolean;

  @ApiProperty({
    description: 'Danh mục nổi bật',
    example: false,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isFeatured phải là kiểu boolean' })
  isFeatured?: boolean;

  @ApiProperty({
    description: 'Danh mục đã bị xóa',
    example: false,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isDeleted phải là kiểu boolean' })
  isDeleted?: boolean;
}
