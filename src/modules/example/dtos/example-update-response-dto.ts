import { IsBoolean, IsDate } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ExampleUpdateResponseDto {
  @ApiProperty()
  @IsBoolean()
  effected: boolean
}

