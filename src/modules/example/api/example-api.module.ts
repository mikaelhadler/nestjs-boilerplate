import { Module, HttpModule } from '@nestjs/common'
import { ExampleReadableService } from './example-readable.service'
import { ExampleUpdatableService } from './example-updatable.service'
import env from '../../../config/env'

@Module({
  imports: [HttpModule.register({
    baseURL: env.urlDoMeuServico,
  }),],
  providers: [ExampleReadableService, ExampleUpdatableService],
  exports: [ExampleReadableService, ExampleUpdatableService],
})
export class ExampleApiModule { }
