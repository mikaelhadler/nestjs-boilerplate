import { Injectable, HttpService } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class ExampleUpdatableService {
  constructor(private readonly httpService: HttpService) { }

  updateExample(
    param: string,
    payload
  ): Observable<any> {
    return this.httpService
      .post(`/${param}`, payload)
      .pipe(map(data => data))
  }
}
