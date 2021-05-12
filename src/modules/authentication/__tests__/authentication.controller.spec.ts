import { HttpModule, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LoggerModule } from '../../logger/logger.module'
import { AuthenticationController } from '../authentication.controller'
import { AuthenticationService } from '../authentication.service'
import { JwtModule } from '@nestjs/jwt'
import request from 'supertest'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '../jwt.strategy'
import { jwtConstrants } from '../constants'
import { CreateTokenDto, TokenResponseDto } from '../dtos/token-dto'
import { mockResolveCoreObservable } from '../../../../test/utils-test'

describe('Authentication Controller', () => {
  let controller: AuthenticationController
  let service: AuthenticationService
  let app: INestApplication

  beforeEach(async () => {
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
      providers: [AuthenticationService, JwtStrategy],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
    service = module.get<AuthenticationService>(AuthenticationService)
    app = module.createNestApplication()
    await app.init()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should validate request', async () => {
    await request(app.getHttpServer())
      .post('/authentication')
      .set('Accept', 'application/json')
      .send({
        username: 'a@b.com',
        password: '2019-01-01',
      })
      .expect(res => {
        expect(res.body.message).toContain('Cannot POST /authentication')
        expect(res.body.statusCode).toBe(404)
        expect(res.body.error).toContain('Not Found')
      })
  })


  it('should return refresh dto if successful', async () => {
    const expectedResult = new CreateTokenDto()
    jest.spyOn(service, 'refreshToken').mockResolvedValue(expectedResult)
    expect(await controller.refresh({})).toBe(expectedResult)
  })

  it('should redirect request', async () => {
    const req = {
      user: {
        profile: {
          email: 'will@willbank.com.br',
        },
        token: {
          id_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF90b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJbVJsWkdNd01USmtNRGRtTlRKaFpXUm1aRFZtT1RjM09EUmxNV0pqWW1VeU0yTXhPVGN5TkdRaUxDSjBlWEFpT2lKS1YxUWlmUS5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyRmpZMjkxYm5SekxtZHZiMmRzWlM1amIyMGlMQ0poZW5BaU9pSTROVE16TmpnME16Y3hOalF0TTJwdmJuVm5NelpuYmpRMlptdGtiR0ZvWXpOdVl6QjJhakp4T0hGbFpUWXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0poZFdRaU9pSTROVE16TmpnME16Y3hOalF0TTJwdmJuVm5NelpuYmpRMlptdGtiR0ZvWXpOdVl6QjJhakp4T0hGbFpUWXVZWEJ3Y3k1bmIyOW5iR1YxYzJWeVkyOXVkR1Z1ZEM1amIyMGlMQ0p6ZFdJaU9pSXhNRGcwT0RZNU1EY3hNRGt5TWprM01UVXlPRFlpTENKb1pDSTZJbTFsZFhCaFp5NWpiMjB1WW5JaUxDSmxiV0ZwYkNJNkltZHNiMkpoYkhONWN5NXRhV3RoWld4QWJXVjFjR0ZuTG1OdmJTNWljaUlzSW1WdFlXbHNYM1psY21sbWFXVmtJanAwY25WbExDSmhkRjlvWVhOb0lqb2ljVE5KZEhGUlNuUlVXSEpIUkVsQ2FISmhVa2xxZHlJc0ltNWhiV1VpT2lKSGJHOWlZV3h6ZVhNZ1RXbHJZV1ZzSUVoaFpHeGxjaUlzSW5CcFkzUjFjbVVpT2lKb2RIUndjem92TDJ4b015NW5iMjluYkdWMWMyVnlZMjl1ZEdWdWRDNWpiMjB2WVMwdlFVOW9NVFJIYVMxUWJVbFRlRU5VZW1kRVVXTnZNamRoZEhsdGNUQlhZWGh2ZEVsdVJYUjJiQzB6TFZjOWN6azJMV01pTENKbmFYWmxibDl1WVcxbElqb2lSMnh2WW1Gc2MzbHpJRTFwYTJGbGJDSXNJbVpoYldsc2VWOXVZVzFsSWpvaVNHRmtiR1Z5SWl3aWJHOWpZV3hsSWpvaVpXNGlMQ0pwWVhRaU9qRTJNRFUzT1RBeU5ETXNJbVY0Y0NJNk1UWXdOVGM1TXpnME0zMC5vcXZVeUl5ZlVsb1ZJTXM3MnZIX05vVjJFcHNlYzViZWl4OG1vMV92c3I3cW0xYzFZOXI1RHNVaFFUZnIza0FsU2o0bTRmSk5FWG4yRWlaVnJBSnlaVzlrV0RWa25aSmFhRjVwRFBLYi1OQzlQUXRDQmVrRXhHRTJTaGRtMzlrVmUtajg0c0dVSnlXWFVBbF8tYTVEOUw4RGFlV2VDX0p5ZWVRWDZmakJhSzJ5OWNzWmhNU09RZnRrd05vM2w4eXMzN2Zqc3JqY3UwVG1CcTRxZHNDLUY4cFROTEJrNGNPWXdndXhCdmQtUFF4OTNSRllnQWJMZTQ5QV94cWF2U0pUbjA4MWE2akppV0RSVEhCNV8xamk3RTJzeElUWmVRcUNIYmFEZGM3R0FtTk5VUkUwRkRldDRFUTctUE1hUFJXUWhuUzZ1ZUhWRDYzRlRJUy1EWG1yRmciLCJpYXQiOjE2MDU3ODk5ODYsImV4cCI6MTYwNTc5MzU4Nn0.GrkR-o343ScA280eNqSLN7VbD-g_fBLG0Fii11DwWkY',
        },
      },
    }
    const res = {
      send: jest.fn(),
      end: jest.fn(),
    }
    const expectedResult = new TokenResponseDto()
    jest.spyOn(service, 'saveToken').mockResolvedValue(expectedResult)
    expect(await controller.saveToken(req, res))
  })
})
