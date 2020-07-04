import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { TaskStatus } from './task.model'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus
}
