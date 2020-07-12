import {
  Injectable,
  NotFoundException,
  Delete,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { UpdateTaskDto } from './update-task.dto'
import { TaskRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { User } from 'src/auth/user.entity'

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService')
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(
    tasksFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(tasksFilterDto, user)
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const userId = user.id
    const found = await this.taskRepository.findOne({ where: { id, userId } })
    if (!found) {
      throw new NotFoundException(
        `No tasks found for that user with an id of ${id}`,
      )
    }
    return found
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    try {
      this.logger.verbose(
        `User ${user.username} creating a task with data: ${JSON.stringify(
          createTaskDto,
        )}`,
      )
      return this.taskRepository.createTask(createTaskDto, user)
    } catch (error) {
      this.logger.error(
        `Unable to create task for "${
          user.username
        }" with data: ${JSON.stringify(createTaskDto)}`,
      )
      throw new InternalServerErrorException()
    }
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    if (!updateTaskDto) {
      throw new NotFoundException()
    }
    const taskToUpdate = await this.getTaskById(id, user)
    try {
      return await this.taskRepository.updateTask(taskToUpdate, updateTaskDto)
    } catch (error) {
      this.logger.error(
        `Unable to update task for user ${
          user.username
        } with data: ${JSON.stringify(updateTaskDto)}`,
      )
      throw new InternalServerErrorException()
    }
  }

  async deleteTask(id: number, user: User): Promise<Task> {
    const taskToDelete = await this.getTaskById(id, user)
    try {
      return await this.taskRepository.deleteTask(taskToDelete)
    } catch (error) {
      this.logger.error(`Unable to delete task ${id} for user ${user.username}`)
      throw new InternalServerErrorException()
    }
  }
}
