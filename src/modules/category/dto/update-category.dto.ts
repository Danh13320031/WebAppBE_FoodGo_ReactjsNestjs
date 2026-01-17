import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 'Tên phải là một chuỗi' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là một chuỗi' })
  description: string;

  @IsOptional()
  @IsNumber({}, { message: 'Thứ tự sắp xếp phải là một số' })
  sortOrder: number;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là một chuỗi' })
  parentId?: string | null;

  @IsOptional()
  @IsBoolean({ message: 'isActived phải là kiểu boolean' })
  isActived?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'isFeatured phải là kiểu boolean' })
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'isDeleted phải là kiểu boolean' })
  isDeleted?: boolean;
}
