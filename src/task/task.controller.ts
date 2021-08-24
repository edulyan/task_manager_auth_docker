import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll() {
    return this.taskService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.taskService.getById(id);
  }

  @Post()
  async create(@Body() taskDto: TaskDto) {
    return this.taskService.create(taskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @Put(':id')
  async update(@Body() taskDto: TaskDto, @Param('id') id: string) {
    return this.taskService.update(id, taskDto);
  }
}
