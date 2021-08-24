import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'lock_259',
    description: 'Название пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly username: string;

  @ApiProperty({ example: '12345', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 16, { message: 'Пароль должен быть меньше 2 и не больше 16' })
  readonly password: string;
}
