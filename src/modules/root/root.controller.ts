import { Controller, Get } from '@nestjs/common'

@Controller('')
export class RootController {
  @Get()
  check() {
    return ''
  }
}
