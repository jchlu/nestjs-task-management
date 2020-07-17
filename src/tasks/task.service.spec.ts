import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TaskRepository } from './task.repository'
import { GetTasksFilterDto } from './get-tasks-filter.dto'
import { TaskStatus } from './task.status.enum'
import { NotFoundException } from '@nestjs/common'

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
})

const mockUser = { id: 1, username: 'Testy McTesting' }
const mockTask = {
  title: 'Task Title',
  description: 'Task Description',
}
describe('TasksService', () => {
  let tasksService
  let taskRepository

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

  describe('getTaskById', () => {
    it('calls the repository findOne() method and successfully returns a task', async () => {
      taskRepository.findOne.mockResolvedValue(mockTask)
      const result = await tasksService.getTaskById(1, mockUser)
      expect(result).toEqual(mockTask)
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      })
    })
    it('throws an error if a task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null)
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      )
    })
  })

  describe('createTask', () => {
    it('call the repository createTask() method and returns a Task', async () => {
      taskRepository.createTask.mockResolvedValue('Some string that bubbles up')
      expect(taskRepository.createTask).not.toHaveBeenCalled()
      const result = await tasksService.createTask(mockTask, mockUser)
      expect(taskRepository.createTask).toHaveBeenCalledWith(mockTask, mockUser)
      expect(result).toEqual('Some string that bubbles up')
    })
  })
})
