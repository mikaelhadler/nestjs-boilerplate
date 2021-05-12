import { Test, TestingModule } from '@nestjs/testing'
import { LoggerService } from '../../modules/logger/logger.service'
import { LoggingInterceptor } from '../logging.interceptor'
import { CallHandler } from '@nestjs/common'

describe('FormatService', () => {
  let service: LoggerService
  let interceptor: LoggingInterceptor

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerService],
      providers: [LoggerService, LoggingInterceptor],
    }).compile()

    service = module.get<LoggerService>(LoggerService)
    interceptor = module.get(LoggingInterceptor)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return intercept response correctly', () => {
    const mockFn = jest.fn()
    const _executionContext: any = {
      switchToHttp: mockFn.mockReturnThis(),
      getRequest: mockFn.mockReturnThis(),
    }

    const nextCallHander: CallHandler<any> = {
      handle: mockFn,
    }
    expect(interceptor.intercept(_executionContext, nextCallHander)).toEqual({ handle: mockFn })
  })
})
