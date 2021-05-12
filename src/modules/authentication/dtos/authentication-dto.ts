import { IsObject, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PasswordAuthenticationDto {
  @ApiProperty()
  @IsString({ always: true })
  dev: string

  @ApiProperty()
  @IsString({ always: true })
  prod: string
}

export class MockAuthenticationDto {
  @ApiProperty()
  @IsString({ always: true })
  username: string

  @ApiProperty()
  @IsObject({ always: true })
  password: PasswordAuthenticationDto
}

export class AuthenticationDto {
  @ApiProperty()
  @IsString({ always: true })
  email: string
}

export class GoogleAuth {
  @ApiProperty()
  @IsString({ always: true })
  user: string
}
