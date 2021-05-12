import { HttpModule, Module } from '@nestjs/common'
import { LoggerModule } from '../logger/logger.module'
import { RootController } from './root.controller'

@Module({
  imports: [HttpModule, LoggerModule],
  controllers: [RootController],
})
export class RootModule {}
