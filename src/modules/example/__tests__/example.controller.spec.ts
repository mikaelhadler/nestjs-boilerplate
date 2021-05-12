import { HttpModule } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LoggerModule } from '../../logger/logger.module'
import { ExampleController } from '../example.controller'
import { ExampleService } from '../example.service'
import { ExampleReadableService } from '../api/example-readable.service'
import { ExampleUpdatableService } from '../api/example-updatable.service'
import { FormatModule } from '../../format/format.module'
import { ExampleDto } from '../dtos/example-response-dto'
import { jwtConstrants } from '../../authentication/constants'
import { JwtModule } from '@nestjs/jwt'
import { ExampleUpdateResponseDto } from '../dtos/example-update-response-dto'

describe('Example Controller', () => {
  let controller: ExampleController
  let service: ExampleService

  const query = {
    page: 0,
    limit: 10,
  }
  const param = 'meu-parametro'

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        LoggerModule,
        FormatModule,
        JwtModule.register({
          secret: jwtConstrants.secret,
        }),
      ],
      controllers: [ExampleController],
      providers: [ExampleService, ExampleReadableService, ExampleUpdatableService],
    }).compile()

    controller = module.get<ExampleController>(ExampleController)
    service = module.get<ExampleService>(ExampleService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return limit change history dto if successful', async () => {
    const expectedResult = new Array(new ExampleDto())
    jest.spyOn(service, 'listExample').mockResolvedValue(expectedResult)
    expect(await controller.listExample(param, query)).toBe(expectedResult)
  })

  it('should update credit limit with successful', async () => {
    const expectedResult = new Array(new ExampleDto())
    jest.spyOn(service, 'listExample').mockResolvedValue(expectedResult)
    expect(await controller.listExample(param, query)).toBe(expectedResult)
  })
  it('should return create document response dto if successful', async () => {
    const payload = {
      param: 'meu-parametro',
      observation: 'minha observacao',
      token: { headers: { authorization: 'my-token' } },
    }
    const expectedResult = new ExampleUpdateResponseDto()
    jest.spyOn(service, 'updateExample').mockResolvedValue(expectedResult)
    expect(
      await controller.updateExample(payload.param, payload.observation, payload.token),
    ).toBe(expectedResult)
  })
})
