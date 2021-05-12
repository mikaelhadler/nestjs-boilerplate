import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RolesDto {
  @ApiProperty()
  @IsString({ always: true })
  roles: string
}
