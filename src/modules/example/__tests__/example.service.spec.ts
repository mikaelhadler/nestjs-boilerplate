import { HttpModule } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LoggerModule } from '../../logger/logger.module'
import { ExampleController } from '../example.controller'
import { FormatModule } from '../../format/format.module'
import { ExampleService } from '../example.service'
import * as mock from './data.mock'
import { ExampleApiModule } from '../api/example-api.module'
import { jwtConstrants } from '../../authentication/constants'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { mockResolveCore, mockRejectApi } from '../../../../test/utils-test'
import { ExampleReadableService } from '../api/example-readable.service'
import { ExampleUpdatableService } from '../api/example-updatable.service'

let service: ExampleService
let jwtService: JwtService
let exampleReadableService: ExampleReadableService
let exampleUpdatableService: ExampleUpdatableService

const initializer = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      HttpModule,
      LoggerModule,
      FormatModule,
      ExampleApiModule,
      JwtModule.register({
        secret: jwtConstrants.secret,
      }),
    ],
    controllers: [ExampleController],
    providers: [ExampleService],
  }).compile()
  service = module.get<ExampleService>(ExampleService)
  jwtService = module.get<JwtService>(JwtService)
  exampleReadableService = module.get<ExampleReadableService>(ExampleReadableService)
  exampleUpdatableService = module.get<ExampleUpdatableService>(ExampleUpdatableService)
}
const customerId = '9f98d587-daae-4706-ad11-4e345f174a17'
const errorMessage = 'Http Exception'
describe('ExampleService', () => {
  beforeEach(async () => {
    await initializer()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should return listExample', async () => {
    const callbackFunction = mockResolveCore(service, 'listExample', mock.exampleList)
    expect(await service.listExample({}, '123')).toEqual(mock.exampleList)
    expect(callbackFunction).toHaveBeenCalled()
  })
  it('should return the identity token if is valid', async () => {
    const originalToken = 'Bearer 12312312'
    const responseTokens = {
      accessToken: '12312312',
      refreshToken: '12312312',
    }
    const verifyAsyncCallbackFunction = mockResolveCore(jwtService, 'verify', responseTokens)
    expect(await service.verifyToken(originalToken)).toEqual(responseTokens)
    expect(verifyAsyncCallbackFunction).toHaveBeenCalled()
  })
  it('should return error identity token if is not valid', async () => {
    await expect(service.verifyToken('Bearer xx')).rejects.toThrowError('jwt malformed')
  })
  it('should return updateExample with success', async () => {
    const originalToken = 'Bearer 12312312'
    const serviceCallbackFunction = mockResolveCore(service, 'updateExample', mock.updateExample)
    expect(await service.updateExample('123', 'exemplo', originalToken)).toEqual(
      mock.updateExample,
    )
    expect(serviceCallbackFunction).toHaveBeenCalled()
  })

  it('should call updateExample and throw Error 500', async () => {
    const responseTokens = {
      accessToken: '12312312',
      refreshToken: '12312312',
    }
    const verifyAsyncCallbackFunction = mockResolveCore(jwtService, 'verify', responseTokens)
    mockRejectApi(exampleUpdatableService, 'updateExample', {
      response: 500,
      message: 'Erro inesperado ao tentar atualizar limite da conta',
    })
    await expect(service.updateExample('123', 'exemplo', 'Bearer xxx')).rejects.toThrowError(
      'Erro inesperado ao tentar atualizar limite da conta',
    )
    expect(verifyAsyncCallbackFunction).toHaveBeenCalled()
  })

  it('should call updateExample and throw Error 409', async () => {
    const responseTokens = {
      accessToken: '12312312',
      refreshToken: '12312312',
    }
    const verifyAsyncCallbackFunction = mockResolveCore(jwtService, 'verify', responseTokens)
    const message = 'O aumento de limite não pode ser aprovado, pois já existe uma solicitação pendente'
    mockRejectApi(exampleUpdatableService, 'updateExample', {
      response: {
        status: 409,
        data: {
          message,
        },
      },
    })
    await expect(service.updateExample('123', 'exemplo', 'Bearer xxx')).rejects.toThrowError(message)
    expect(verifyAsyncCallbackFunction).toHaveBeenCalled()
  })

  it('should call updateExample and throw Error 409 without message', async () => {
    const responseTokens = {
      accessToken: '12312312',
      refreshToken: '12312312',
    }
    const verifyAsyncCallbackFunction = mockResolveCore(jwtService, 'verify', responseTokens)
    mockRejectApi(exampleUpdatableService, 'updateExample', {
      response: {
        status: 409,
        data: {
          message: 'Http Exception'
        },
      },
    })
    await expect(service.updateExample('123', 'exemplo', 'Bearer xxx')).rejects.toThrowError('Http Exception')
    expect(verifyAsyncCallbackFunction).toHaveBeenCalled()
  })

  it('should call updateExample and throw Error 500', async () => {
    const responseTokens = {
      accessToken: '12312312',
      refreshToken: '12312312',
    }
    const verifyAsyncCallbackFunction = mockResolveCore(jwtService, 'verify', responseTokens)
    mockRejectApi(exampleUpdatableService, 'updateExample', {
      response: {
        status: 500,
        data: {
          message: 'Erro inesperado ao tentar atualizar limite da conta',
        },
      },
    })
    await expect(service.updateExample('123', 'exemplo', 'Bearer xxx')).rejects.toThrowError(
      'Erro inesperado ao tentar atualizar limite da conta',
    )
    expect(verifyAsyncCallbackFunction).toHaveBeenCalled()
  })

  it('should call updateExample and throw Error 500 without message', async () => {
    const responseTokens = {
      accessToken: '12312312',
      refreshToken: '12312312',
    }
    const verifyAsyncCallbackFunction = mockResolveCore(jwtService, 'verify', responseTokens)
    mockRejectApi(exampleUpdatableService, 'updateExample', {
      response: {
        status: 500,
        message: 'Http Exception'
      },
    })
    await expect(service.updateExample('123', 'exemplo', 'Bearer xxx')).rejects.toThrowError(
      'Http Exception'
    )
    expect(verifyAsyncCallbackFunction).toHaveBeenCalled()
  })
})
describe('ExampleService - listExample', () => {
  beforeEach(async () => {
    await initializer()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should call listExample service and its apis and throw Error 404', async () => {
    mockRejectApi(exampleReadableService, 'listExample', {
      response: 404,
    })
    await expect(service.listExample({}, customerId)).rejects.toThrowError(errorMessage)
  })
})
