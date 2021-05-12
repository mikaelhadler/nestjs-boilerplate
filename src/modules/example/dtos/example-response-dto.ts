import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ExampleDto {
  @ApiProperty()
  @IsString({ always: true })
  email: string

  @ApiProperty()
  @IsString({ always: true })
  reason: string
}
