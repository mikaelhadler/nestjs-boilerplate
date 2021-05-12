import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'
import { AxiosResponse } from 'axios'
import { ExampleUpdatableService } from '../api/example-updatable.service'
import env from '../../../config/env'
import * as mock from './data.mock'

let service: ExampleUpdatableService
let httpService: HttpService

const initializer = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      HttpModule.register({
        baseURL: env.urlDoMeuServico,
      }),
    ],
    providers: [ExampleUpdatableService],
  }).compile()

  service = module.get<ExampleUpdatableService>(ExampleUpdatableService)
  httpService = module.get<HttpService>(HttpService)
}

const param = 'meu-parametro'
const result: AxiosResponse = {
  data: '',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}
const response = {
  data: '',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

describe('ExampleUpdatableService - updateExample', () => {
  beforeEach(async () => {
    await initializer()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should test updateExample return', done => {
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result))

    service.updateExample(param, mock.updateExample).subscribe(res => {
      expect(res).toEqual(response)
      done()
    })
  })
})
