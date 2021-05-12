import { HttpModule, Module } from '@nestjs/common'
import { LoggerModule } from '../logger/logger.module'
import { ExampleController } from './example.controller'
import { ExampleService } from './example.service'
import env from '../../config/env'
import { FormatModule } from '../format/format.module'
import { ExampleApiModule } from './api/example-api.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstrants } from '../authentication/constants'

@Module({
  imports: [
    HttpModule.register({
      baseURL: env.urlDoMeuServico,
    }),
    LoggerModule,
    FormatModule,
    ExampleApiModule,
    JwtModule.register({
      secret: jwtConstrants.secret,
    }),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule { }
