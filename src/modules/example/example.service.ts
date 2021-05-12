import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { dispatchError } from '../../common/error'
import { FormatService } from '../format/format.service'
import { ExampleReadableService } from './api/example-readable.service'
import { ExampleUpdatableService } from './api/example-updatable.service'
import { ExampleQueryDto } from './dtos/example-query-dto'
import { ExampleDto } from './dtos/example-response-dto'
import { ExampleUpdateResponseDto } from './dtos/example-update-response-dto'
@Injectable()
export class ExampleService {
  constructor(
    private readonly formatService: FormatService,
    private readonly exampleUpdatableService: ExampleUpdatableService,
    private readonly exampleReadableService: ExampleReadableService,
    private readonly jwtService: JwtService,
  ) { }

  async listExample(query: ExampleQueryDto, customerId: string): Promise<ExampleDto[]> {
    try {
      const { data } = await this.exampleReadableService.listExample(query, customerId)
        .toPromise()
      return data
    } catch (error) {
      return dispatchError(error)
    }
  }

  async updateExample(
    param: string,
    observation: string,
    authorization: string,
  ): Promise<ExampleUpdateResponseDto> {
    try {
      const { email } = await this.verifyToken(authorization)
      const payload = {
        reason: observation,
        userName: email,
      }
      const { data } = await this.exampleUpdatableService.updateExample(param, payload).toPromise()
      return data
    } catch (error) {
      return dispatchError(error)
    }
  }

  async verifyToken(authorization: string) {
    try {
      const _token = authorization.split('Bearer ')[1]
      return this.jwtService.verify(_token)
    } catch (error) {
      return dispatchError(error)
    }
  }
}
