import { PASSWORD_REGEX } from '@/common/constants';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Tên người dùng',
    example: 'Nguyễn Văn A',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  @MaxLength(100, { message: 'Tên không được vượt quá 100 ký tự' })
  name: string;

  @ApiProperty({
    description: 'Email người dùng',
    example: 'TlW4T@example.com',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString({ message: 'Email phải là một chuỗi' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({
    description: 'Mật khẩu người dùng',
    example: 'P@ssw0rd!',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @Matches(PASSWORD_REGEX, {
    message:
      'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
  })
  password: string;
}
