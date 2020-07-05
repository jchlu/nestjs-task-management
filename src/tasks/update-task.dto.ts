import { IsEnum, IsOptional, IsNotEmpty } from 'class-validator'
import { TaskStatus } from './task.status.enum'

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsNotEmpty()
  description: string

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus
}
