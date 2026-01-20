import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  // @IsString({ message: 'ID phải là một chuỗi' })
  // @IsNotEmpty({ message: 'ID không được phép trống' })
  // @MaxLength(36, { message: 'ID không được vượt quá 36 ký tự' })
  // id: string;

  @ApiProperty({
    description: 'Tên danh mục',
    example: 'Đồ ăn nhanh',
    type: String,
    required: true,
  })
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  // @IsString({ message: 'Slug phải là một chuỗi' })
  // @IsNotEmpty({ message: 'Slug không được để trống' })
  // slug: string;

  @ApiProperty({
    description: 'Mô tả danh mục',
    example: 'Đây là danh mục đồ ăn nhanh',
    type: String,
    required: false,
  })
  @IsString({ message: 'Mô tả phải là một chuỗi' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động của danh mục',
    example: true,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActived?: boolean;

  @ApiProperty({
    description: 'Danh mục nổi bật',
    example: false,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({
    description: 'Danh mục đã bị xóa',
    example: false,
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({
    description: 'Thứ tự sắp xếp của danh mục',
    example: 1,
    type: Number,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sortOrder?: number;

  @ApiProperty({
    description: 'Id danh mục cha',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: String,
    required: false,
  })
  @IsString()
  @MaxLength(36)
  @IsOptional()
  parentId?: string | null;
}
