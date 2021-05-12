import { Injectable } from '@nestjs/common'
import { LoggerService } from '../logger/logger.service'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const region = process.env.AWS_REGION

@Injectable()
export class AwsS3Service {

  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.contextName = AwsS3Service.name
  }

  getImageS3 = async ({ key, expires = 60 * 30, bucket }) => {
    const vars = {
      Bucket: bucket,
      Key: key,
      Expires: expires,
    }
    try {
      AWS.config.update({ region });
      return await s3.getSignedUrlPromise('getObject', vars)
    } catch (error) {
      this.loggerService.error(error)
      return ''
    }
  }
}
