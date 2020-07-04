import { IsUUID } from 'class-validator'

export class TaskIdParam {
  @IsUUID()
  id: string
}
