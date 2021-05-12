import { HttpModule } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LoggerModule } from '../../logger/logger.module'
import { RootController } from '../root.controller'

describe('Root Controller', () => {
  let controller: RootController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, LoggerModule],
      controllers: [RootController],
    }).compile()

    controller = module.get<RootController>(RootController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return get', async () => {
    expect(controller.check()).toBe('')
  })
})
