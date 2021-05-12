import { Controller, UseInterceptors, Res, Post, Body } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { LoggingInterceptor } from './../../interceptors/logging.interceptor'
import { LoggerService } from '../logger/logger.service'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthenticationDto } from './dtos/authentication-dto'
import { RefreshTokenDto } from './dtos/refresh-token-dto'

@ApiTags('Authentication')
@UseInterceptors(LoggingInterceptor)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService, private readonly loggerService: LoggerService) {
    this.loggerService.contextName = AuthenticationController.name
  }

  @ApiOperation({ summary: 'Update example' })
  @ApiBody({ type: RefreshTokenDto, description: 'Update example' })
  @Post('refresh')
  refresh(@Body() body: any) {
    return this.authService.refreshToken(body)
  }

  @ApiOperation({ summary: 'Update example' })
  @ApiBody({ type: AuthenticationDto, description: 'Update example' })
  @Post('token')
  async saveToken(@Body() body: any, @Res() res) {
    const result = await this.authService.createToken(body)
    res.send(result)
    res.end()
  }

}
