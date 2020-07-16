import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TaskRepository } from './task.repository'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { TaskStatus } from './task.status.enum'

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
})

const mockUser = { username: 'Testy McTesting' }

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
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Test search',
      }
      tasksService.getTasks(filters, mockUser)
      // expect getTasks TO HAVE BEEN CALLED
    })
  })
})
