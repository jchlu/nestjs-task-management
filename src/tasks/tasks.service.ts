import { Injectable, NotFoundException, Delete } from '@nestjs/common'
import { TaskStatus } from './task.status.enum'
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { UpdateTaskDto } from './update-task.dto'
import { TaskRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { UpdateResult } from 'typeorm'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(tasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(tasksFilterDto)
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)
    if (!found) {
      throw new NotFoundException(`No tasks found with an id of ${id}`)
    }
    return found
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (!updateTaskDto) {
      throw new NotFoundException()
    }
    const taskToUpdate = await this.getTaskById(id)
    return await this.taskRepository.updateTask(taskToUpdate, updateTaskDto)
  }

  async deleteTask(id: number): Promise<Task> {
    const taskToDelete = await this.getTaskById(id)
    return await this.taskRepository.deleteTask(taskToDelete)
  }
}
