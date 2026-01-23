import { PASSWORD_REGEX } from '@/common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'OgT0S@example.com',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString({ message: 'Email phải là một chuỗi' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({
    description: 'Mật khẩu',
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
