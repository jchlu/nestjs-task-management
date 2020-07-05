import { Repository, EntityRepository, UpdateResult } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './create-task.dto'
import { TaskStatus } from './task.status.enum'
import { NotFoundException } from '@nestjs/common'
import { UpdateTaskDto } from './update-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(taskFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = taskFilterDto
    const query = this.createQueryBuilder('task')
    if (status) {
      query.andWhere('task.status = :status', { status })
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      )
    }
    return query.getMany()
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto
    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()
    return task
  }

  async updateTask(
    taskToUpdate: Task,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { title, description, status } = updateTaskDto

    if (title) {
      taskToUpdate.title = title
    }
    if (description) {
      taskToUpdate.description = description
    }
    if (status) {
      taskToUpdate.status = status
    }
    await this.update(taskToUpdate.id, taskToUpdate)
    return taskToUpdate
  }

  async deleteTask(taskToDelete: Task): Promise<Task> {
    return await this.remove(taskToDelete)
  }
}
