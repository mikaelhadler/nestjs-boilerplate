import { Module } from '@nestjs/common'
import { AwsS3Service } from './aws-s3.service'
import { LoggerModule } from '../logger/logger.module'
@Module({
  providers: [AwsS3Service],
  exports: [AwsS3Service],
  imports: [LoggerModule],
})
export class AwsS3Module {}
