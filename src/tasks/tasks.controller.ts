import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model'
import { title } from 'process'
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { UpdateTaskDto } from './update-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /** GET /tasks with optional filtering using query params */
  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() tasksFilterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(tasksFilterDto).length) {
      console.log(tasksFilterDto)
      // call the filter method
      return this.tasksService.getFilteredTasks(tasksFilterDto)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  /** GET /tasks/uuid-formatted-id-number */
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  /** PATCH /tasks/uuid-formatted-id-number */
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTaskStatus(id, updateTaskDto)
  }

  /** POST /tasks */
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  /** DELETE /tasks/uuid-formatted-id-number */
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id)
  }
}
