import { HttpModule } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { PassportModule } from '@nestjs/passport'
import { AuthenticationService } from '../authentication.service'
import { AuthenticationController } from '../authentication.controller'
import { JwtStrategy } from '../jwt.strategy'
import { jwtConstrants } from '../constants'
import { LoggerModule } from '../../../modules/logger/logger.module'
import { mockResolveCore, mockRejectCore } from '../../../../test/utils-test'
import { GoogleStrategy } from '../google.strategy'
import { messages } from '../../../common/messages'

let service: AuthenticationService
let jwtService: JwtService
let jwtStrategy: JwtStrategy

const initializer = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      HttpModule,
      JwtModule.register({
        secret: jwtConstrants.secret,
      }),
      PassportModule,
      LoggerModule,
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, JwtStrategy, GoogleStrategy],
  }).compile()

  service = module.get<AuthenticationService>(AuthenticationService)
  jwtService = module.get<JwtService>(JwtService)
  jwtStrategy = module.get<JwtStrategy>(JwtStrategy)
}

const tokens = {
  accessToken: '12312312',
  refreshToken: '12312312',
}

describe('AuthenticationService', () => {
  beforeEach(async () => {
    await initializer()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should test refresh token successfuly', async () => {
    const verifyAsyncCallbackFunction = mockResolveCore(jwtService, 'verifyAsync', tokens)
    const callbackFunction = mockResolveCore(service, 'createToken', tokens)
    const result = await service.refreshToken({ refreshToken: 'refresh-token' })
    expect(result).toEqual({ accessToken: '12312312', refreshToken: '12312312' })
    expect(verifyAsyncCallbackFunction).toHaveBeenCalled()
    expect(callbackFunction).toHaveBeenCalled()
  })

  it('should test refresh token and throw error', async () => {
    await expect(service.refreshToken({ refreshToken: 'refresh-token' })).rejects.toThrowError(
      'Este não é um token de acesso válido.',
    )
  })

  it('should test create token', async () => {
    const jwtSignIn = mockResolveCore(jwtService, 'sign', '12312312')

    expect(
      service.createToken({ email: 'will@willbank.com.br' }).then(data => data.accessToken),
    ).resolves.toBe('12312312')

    expect(
      service.createToken({ email: 'will@willbank.com.br' }).then(data => data.refreshToken),
    ).resolves.toBe('12312312')

    expect(jwtSignIn).toHaveBeenCalled()
  })

  it('should test jwtStrategy validate return', async () => {
    const callbackFunction = mockResolveCore(service, 'verifyTokenGoogle', tokens)
    const payload = {
      id_token: '',
      sub: '',
      email: '',
    }
    const response = {
      id: '',
      email: '',
    }
    expect(await jwtStrategy.validate(payload)).toEqual(response)
    expect(callbackFunction).toHaveBeenCalled()
  })

  it('should test jwtStrategy validate return on failure', async () => {
    const payload = {
      id_token: '',
      sub: '',
      email: '',
    }
    mockRejectCore(service, 'verifyTokenGoogle', {
      response: 404,
    })

    await expect(jwtStrategy.validate(payload)).rejects.toThrowError(
      'Cliente não tem autorização para acessar este recurso',
    )
  })
})
