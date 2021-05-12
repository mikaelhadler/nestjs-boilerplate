import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { requestParam } from '../../../common/request-params'
import { ExampleQueryDto } from '../dtos/example-query-dto'

@Injectable()
export class ExampleReadableService {
  constructor(private readonly httpService: HttpService) { }

  listExample(query: ExampleQueryDto, param: string): Observable<any> {
    return this.httpService
      .get(`/${param}?${requestParam(query)}`)
      .pipe(map(data => data))
  }
}
