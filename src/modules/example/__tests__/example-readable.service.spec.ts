import { HttpModule, HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'
import { AxiosResponse } from 'axios'
import { ExampleReadableService } from '../api/example-readable.service'
import env from '../../../config/env'

let service: ExampleReadableService
let httpService: HttpService

const initializer = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      HttpModule.register({
        baseURL: env.urlDoMeuServico,
      }),
    ],
    providers: [ExampleReadableService],
  }).compile()

  service = module.get<ExampleReadableService>(ExampleReadableService)
  httpService = module.get<HttpService>(HttpService)
}

const param = 'meu-parametro'
const query = {
  page: 0,
  limit: 10,
}
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

describe('ExampleReadableService - listExample', () => {
  beforeEach(async () => {
    await initializer()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should test listExample return', done => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result))

    service.listExample(query, param).subscribe(res => {
      expect(res).toEqual(response)
      done()
    })
  })
})
