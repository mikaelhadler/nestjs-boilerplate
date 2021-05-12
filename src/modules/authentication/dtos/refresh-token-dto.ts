import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto {
  @ApiProperty()
  @IsString({ always: true })
  refreshToken: string
}
