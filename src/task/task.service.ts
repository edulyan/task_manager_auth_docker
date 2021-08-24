import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepositoty: Repository<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    return this.taskRepositoty.find();
  }

  async getById(id: string): Promise<Task> {
    return this.taskRepositoty.findOne(id);
  }

  async create(taskDto: TaskDto): Promise<Task> {
    const newTask = this.taskRepositoty.create(taskDto);
    return this.taskRepositoty.save(newTask);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepositoty.delete(id);
  }

  async update(id: string, taskDto: TaskDto): Promise<void> {
    await this.taskRepositoty.update(id, taskDto);
  }
}
