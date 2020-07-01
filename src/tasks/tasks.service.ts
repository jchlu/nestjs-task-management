import { Injectable } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v1 as uuidv1 } from 'uuid'
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'

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

  getTaskById(id: string): Task {
    return this.tasks.find(t => t.id === id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    const task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id)
    task.status = status
    return task
  }

  deleteTask(id: string) {
    const indexToDelete = this.tasks.findIndex(t => t.id === id)
    if (indexToDelete !== -1) {
      const deletedTask = this.tasks.splice(indexToDelete, 1)
      return deletedTask
    } else {
      throw new Error(`No tasks found with an id of ${id}`)
    }
  }
}
