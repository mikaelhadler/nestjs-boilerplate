import { HttpModule } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { FormatService } from './../format.service'

let service: FormatService

const initializer = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [HttpModule],
    providers: [FormatService],
  }).compile()

  service = module.get<FormatService>(FormatService)
}

describe('FormatService', () => {
  beforeEach(async () => {
    await initializer()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

})
