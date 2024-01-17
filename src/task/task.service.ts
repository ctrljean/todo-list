import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Task } from "@prisma/client";

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService
  ) {
  }

  public getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  public getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: {
        id: id,
      }
    })
  }

  public createTask(data: Task): Promise<Task> {
    return this.prisma.task.create({
      data: data,
    })
  }

  public updateTask(id: number, data: Task): Promise<Task>{
    return this.prisma.task.update({
      where: {
        id: id,
      },
      data: data,
    })
  }

  public async deleteTask(id:number): Promise<Task>{
    return this.prisma.task.delete({
      where: {
        id: id,
      }
    })
  }
}