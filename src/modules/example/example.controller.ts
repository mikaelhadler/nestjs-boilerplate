import {
  Controller,
  Get,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  Req,
  HttpCode,
  HttpStatus,
  Query,
  Post,
} from '@nestjs/common'
import { LoggingInterceptor } from '../../interceptors/logging.interceptor'
import { ExampleService } from './example.service'
import { LoggerService } from '../logger/logger.service'
import { JwtAuthGuard } from '../authentication/jwt-auth.guard'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ExampleUpdateDto } from './dtos/example-dto'
import { ExampleQueryDto } from './dtos/example-query-dto'
import { ORDER } from './enum/example-limit-enum'

@ApiTags('Example')
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService, private readonly loggerService: LoggerService) {
    this.loggerService.contextName = ExampleController.name
  }

  @ApiOperation({ summary: 'Meu endpoint de listagem exemplo' })
  @Get(':param')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 0,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    example: 99,
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ORDER,
  })
  listExample(@Param('param') param: string, @Query() query: ExampleQueryDto) {
    return this.exampleService.listExample(query, param)
  }

  @ApiOperation({ summary: 'Atualiza meu exemplo' })
  @ApiBody({ type: ExampleUpdateDto, description: 'Meu body exemplo' })
  @Post(':param')
  @HttpCode(HttpStatus.OK)
  async updateExample(
    @Param('param') param: string,
    @Body('observation') observation: string,
    @Req() req,
  ) {
    return this.exampleService.updateExample(param, observation, req.headers.authorization)
  }
}
