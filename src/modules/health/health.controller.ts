import { Controller, Get } from '@nestjs/common'
import { HealthCheck } from '@nestjs/terminus'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  @HealthCheck()
  @Get()
  check() {
    return {
      message: 'This app is healthy and is waiting for requests.',
      result: '(-.-)Zzz...',
    }
  }
}
