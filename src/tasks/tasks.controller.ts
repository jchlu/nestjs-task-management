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
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './create-task.dto'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { UpdateTaskDto } from './update-task.dto'
import { Task } from './task.entity'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/auth/user.entity'
import { GetUser } from 'src/auth/get-user.decorator'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /** GET /tasks with optional filtering using query params */
  @Get()
  @UsePipes(ValidationPipe)
  async getTasks(
    @Query() tasksFilterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(tasksFilterDto, user)
  }

  /** GET /tasks/id-number */
  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user)
  }

  /** PATCH /tasks/id-number */
  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto, user)
  }

  /** POST /tasks */
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user)
  }

  /** DELETE /tasks/id-number */
  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.deleteTask(id, user)
  }
}
