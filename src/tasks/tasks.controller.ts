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
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { UpdateTaskDto } from './update-task.dto'
import { TaskIdParam } from './task-id.params'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /** GET /tasks with optional filtering using query params */
  // @Get()
  // @UsePipes(ValidationPipe)
  // getTasks(@Query() tasksFilterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(tasksFilterDto).length) {
  //     console.log(tasksFilterDto)
  //     // call the filter method
  //     return this.tasksService.getFilteredTasks(tasksFilterDto)
  //   } else {
  //     return this.tasksService.getAllTasks()
  //   }
  // }

  /** GET /tasks/uuid-formatted-id-number */
  // @Get('/:id')
  // @UsePipes(ValidationPipe)
  // getTaskById(@Param() param: TaskIdParam): Task {
  //   return this.tasksService.getTaskById(param)
  // }

  /** PATCH /tasks/uuid-formatted-id-number */
  // @Patch('/:id')
  // @UsePipes(ValidationPipe)
  // updateTaskStatus(
  //   @Param() param: TaskIdParam,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(param, updateTaskDto)
  // }

  /** POST /tasks */
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto)
  // }

  /** DELETE /tasks/uuid-formatted-id-number */
  // @Delete('/:id')
  // @UsePipes(ValidationPipe)
  // deleteTask(@Param() param: TaskIdParam) {
  //   return this.tasksService.deleteTask(param)
  // }
}
