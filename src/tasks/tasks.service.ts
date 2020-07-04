import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { UpdateTaskDto } from './update-task.dto'
import { TaskIdParam } from './task-id.params'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto
    let tasks = this.getAllTasks()
    if (status) {
      tasks = tasks.filter(t => t.status === status)
    }

    if (search) {
      tasks = tasks.filter(
        t => t.title.includes(search) || t.description.includes(search),
      )
    }

    return tasks
  }

  getTaskById(param: TaskIdParam): Task {
    const { id } = param
    const found = this.tasks.find(t => t.id === id.toString())
    if (!found) {
      throw new NotFoundException(`No tasks found with an id of ${id}`)
    }
    return found
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    const task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  updateTaskStatus(param: TaskIdParam, updateTaskDto: UpdateTaskDto): Task {
    const { title, description, status } = updateTaskDto
    // getTaskById throws error if not found
    const task = this.getTaskById(param)
    if (title) {
      task.title = title
    }
    if (description) {
      task.description = description
    }
    if (status) {
      task.status = status
    }
    return task
  }

  deleteTask(param: TaskIdParam) {
    const { id } = param
    const indexToDelete = this.tasks.findIndex(t => t.id === id.toString())
    if (indexToDelete !== -1) {
      return this.tasks.splice(indexToDelete, 1)
    } else {
      throw new NotFoundException(`No tasks found with an id of ${id}`)
    }
  }
}
