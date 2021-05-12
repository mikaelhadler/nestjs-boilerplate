import { Request, Response } from 'express'
import { HttpException, Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { LoggerService } from '../modules/logger/logger.service'
import messages from '../common/messages'
import filterExceptions from './filter-exceptions'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.contextName = HttpExceptionFilter.name
  }

  catch(exception: any, host: ArgumentsHost) {
    this.loggerService.error(`Called method #${this.catch.name}()`)

    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()

    const errorName = exception.name
    const stackTracer: string | undefined = exception.stack

    const status = exception.getStatus()
    const object = exception.getResponse() as object
    const coreError = object['message'] || object
    const config = object['config'] || ''
    const errorMessage = filterExceptions(object)

    this.loggerService.error(errorName, JSON.stringify(coreError))
    this.loggerService.error(errorName, stackTracer)
    this.loggerService.error(errorName, config.url || config)

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: status === 401 ? messages.unauthorizedError : errorMessage || coreError,
    })
  }
}
