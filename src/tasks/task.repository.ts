import { Repository, EntityRepository, UpdateResult } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './create-task.dto'
import { TaskStatus } from './task.status.enum'
import { UpdateTaskDto } from './update-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { User } from 'src/auth/user.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(
    taskFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = taskFilterDto
    const { id } = user
    const query = this.createQueryBuilder('task')
    query.where('task.userId = :id', { id })
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

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto
    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    task.user = user
    await task.save()
    delete task.user
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
