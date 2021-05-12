import { IsString, IsOptional, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PageDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page?: number

  @ApiProperty()
  @IsOptional()
  @IsString({ always: true })
  sort?: string

  @ApiProperty()
  @IsOptional()
  @IsString({ always: true })
  order?: string

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  size?: number
}
