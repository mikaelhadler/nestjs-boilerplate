import { Module } from '@nestjs/common'
import { LoggerModule } from '../logger/logger.module'
import { FormatService } from './format.service'

@Module({
  imports: [LoggerModule],
  providers: [FormatService],
  exports: [FormatService],
})
export class FormatModule {}
