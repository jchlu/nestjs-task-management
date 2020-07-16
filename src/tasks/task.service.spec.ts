import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TaskRepository } from './task.repository'

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
})

describe('TasksService', () => {
  let tasksService: TasksService
  let taskRepository: TaskRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile()

    tasksService = await module.get<TasksService>(TasksService)
    taskRepository = await module.get<TaskRepository>(TaskRepository)
  })

  describe('getTasks', () => {
    it('gets all tasks from the repository', () => {
      // expect getTasks NOT to have been called
      expect(taskRepository.getTasks).not.toHaveBeenCalled()
      // call taskService.getTasks()
      // expect getTasks TO HAVE BEEN CALLED
    })
  })
})
