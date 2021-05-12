import { IsObject, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TokenDto {
  @ApiProperty()
  @IsString({ always: true })
  id_token: string

  @ApiProperty()
  @IsString({ always: true })
  email: string
}

export class CreateTokenDto {
  @ApiProperty()
  @IsString({ always: true })
  accessToken: string

  @ApiProperty()
  @IsString({ always: true })
  refreshToken: string
}

export class ProfileUser {
  @ApiProperty()
  @IsString({ always: true })
  email: string

  @ApiProperty()
  @IsString({ always: true })
  displayName: string

  @ApiProperty()
  @IsString({ always: true })
  picture: string

  @ApiProperty()
  @IsString({ always: true })
  fullName: string
}

export class TokenUser {
  @ApiProperty()
  @IsString({ always: true })
  id_token: string
}

export class TokenResponseDto {
  @ApiProperty()
  @IsObject()
  profile: ProfileUser

  @ApiProperty()
  @IsObject()
  token: TokenUser
}

export class UserResponseDto {
  @ApiProperty()
  @IsObject()
  user: TokenResponseDto
}
