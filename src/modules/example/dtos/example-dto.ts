import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ExampleUpdateDto {
  @ApiProperty()
  @IsString({ always: true })
  reason: string

  @ApiProperty()
  @IsString({ always: true })
  email: string
}