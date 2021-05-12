import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { LoggerService } from '../modules/logger/logger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.contextName = LoggerService.name
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.loggerService.info(`Called method: #${this.intercept.name}()`)
    const request = context.switchToHttp().getRequest()
    this.loggerService.info(`Request path: ${request.path}`)
    return next.handle()
  }
}
