import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() userDto: UserDto) {
    return await this.authService.login(userDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() userDto: UserDto) {
    return await this.authService.registration(userDto);
  }
}
