import { Controller, UseGuards, UseInterceptors, Get, Res, Post, Body } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { LoggingInterceptor } from './../../interceptors/logging.interceptor'
import { LoggerService } from '../logger/logger.service'
import { JwtAuthGuard } from '../authentication/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authentication')
@UseInterceptors(LoggingInterceptor)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService, private readonly loggerService: LoggerService) {
    this.loggerService.contextName = AuthenticationController.name
  }

  @Post('refresh')
  refresh(@Body() body: any) {
    return this.authService.refreshToken(body)
  }

  @Post('token')
  async saveToken(@Body() body: any, @Res() res) {
    const result = await this.authService.saveToken(body)
    res.send(result)
    res.end()
  }

}
