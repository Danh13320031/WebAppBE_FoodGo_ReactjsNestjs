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
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsString({ message: 'Slug phải là một chuỗi' })
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;

  @IsString({ message: 'Mô tả phải là một chuỗi' })
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActived?: boolean;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sortOrder?: number;

  @IsString()
  @MaxLength(36)
  @IsOptional()
  parentId?: string | null;
}
