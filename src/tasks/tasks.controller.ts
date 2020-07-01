import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model'
import { title } from 'process'
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() tasksFilterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(tasksFilterDto).length) {
      console.log(tasksFilterDto)
      // call the filter method
      return this.tasksService.getFilteredTasks(tasksFilterDto)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    console.log(`title: ${title}, description: ${description}`)
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id)
  }
}
