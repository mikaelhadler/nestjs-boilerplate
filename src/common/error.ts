import { HttpException } from '@nestjs/common'

export const dispatchError = error => {
  let data = null
  let status = 500
  const { response } = error || { response: {} }
  if (response) {
    data = response.data
    status = response.status
  }
  throw new HttpException((data && data.message) || error, status || 500)
}
