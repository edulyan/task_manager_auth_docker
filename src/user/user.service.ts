import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from 'src/task/task.dto';
import { Task } from 'src/task/task.entity';
import { getConnection, Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async getByUsername(username: string): Promise<User> {
    const userName = await this.userRepository.findOne({ username });
    return userName;
  }

  async create(userDto: UserDto): Promise<User> {
    const newUser = this.userRepository.create(userDto);

    const task = getConnection().getRepository(Task);
    const defaultTask = await task.findOne({ where: { title: '' } });
    newUser.tasks = [defaultTask];

    const savedNewUser: User = await this.userRepository.save(newUser);

    return savedNewUser;
  }

  async addTask(userId: number, taskId: number) {
    const userTarget = await this.userRepository.findOne(userId);
    const taskTarget = await this.taskRepository.findOne(taskId);

    userTarget.tasks.push(taskTarget);
    await this.userRepository.save(userTarget);

    return true;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: string, userDto: UserDto): Promise<void> {
    await this.userRepository.update(id, userDto);
  }
}
