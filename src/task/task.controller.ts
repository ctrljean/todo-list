import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Get()
  public getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    const taskFound = await this.taskService.getTaskById(id);
    if (!taskFound) {
      throw new BadRequestException('Task not found');
    }
    return taskFound;
  }

  @Post()
  public createTask(
    @Body() data: Task
  ): Promise<Task> {
    return this.taskService.createTask(data);
  }

  @Put(':id')
  public updateTask(
    @Body() data: Task,
    @Param(ParseIntPipe) id: number
  ): Promise<Task> {
    return this.taskService.updateTask(id, data);
  }

  @Delete(':id')
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    try {
      return await this.taskService.deleteTask(id);
    } catch (e) {
      throw new NotFoundException('Task not found');
    }

  }
}