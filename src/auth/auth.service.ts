import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: UserDto) {
    const userCheck = await this.userService.getByUsername(userDto.username);

    if (userCheck) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await genSalt(10);
    const newUser = await this.userService.create({
      username: userDto.username,
      password: await hash(userDto.password, salt),
    });

    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id, tasks: user.tasks };
    return { token: this.jwtService.sign(payload) };
  }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async validateUser(userDto: UserDto) {
    const user = await this.userService.getByUsername(userDto.username);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Имя пользователя неверный',
      });
    }

    const passwordCheck = await compare(userDto.password, user.password);

    if (!passwordCheck) {
      throw new UnauthorizedException({ message: 'Пароль неверный' });
    }

    return user;
  }

  // async login(userDto: UserDto) {
  //   const user = await this.validateUser(userDto);
  //   return this.generateToken(user);
  // }

  // private async validateUser(userDto: UserDto) {
  //   const user = await this.userService.getByUsername(userDto.username);
  //   const passwordCheck = await compare(userDto.password, user.password);

  //   if (user && passwordCheck) {
  //     return user;
  //   }
  //   throw new UnauthorizedException({
  //     message: 'username или password неверный',
  //   });
  // }

  // async registration(userDto: UserDto) {
  //   const userCheck = await this.userService.getByUsername(userDto.username);

  //   if (userCheck) {
  //     throw new HttpException(
  //       'Пользователь с таким username существует',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   // const hashPass = await hash(userDto.password, genSaltSync(10));
  //   // const user = await this.userService.create({
  //   //   ...userDto,
  //   //   password: hashPass,
  //   // });

  //   // return this.generateToken(user);
  //   return userCheck;
  // }

  // private async generateToken(user: User) {
  //   const payload = { username: user.username, id: user.id, tasks: user.tasks };
  //   return { token: this.jwtService.sign(payload) };
  // }
}
