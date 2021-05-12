import { IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SORT, ORDER } from '../enum/example-limit-enum'

export class ExampleQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ always: true })
  page?: number

  @ApiProperty()
  @IsOptional()
  @IsString({ always: true })
  size?: number

  @ApiProperty()
  @IsOptional()
  @IsString({ always: true })
  direction?: SORT

  @ApiProperty()
  @IsOptional()
  @IsString({ always: true })
  order?: ORDER
}
