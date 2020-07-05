import { IsNotEmpty } from 'class-validator'

export class TaskIdParam {
  @IsNotEmpty()
  id: string
}
