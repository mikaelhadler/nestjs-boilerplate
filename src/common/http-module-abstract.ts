import { HttpModule } from '@nestjs/common'

export const api: any = {
  port: 3000,
  host: 'localhost',
  secure: false,
}
const secure = api.secure.toString()
const protocol = secure === 'true' ? 'https' : 'http'
const port = api.port ? `:${api.port}` : ''
const host = `://${api.host}${port}`
const baseUrl = `${protocol}${host}`
const timeout = 30000

export const httpModuleAbstract = HttpModule.register({
  timeout: timeout,
  baseURL: baseUrl,
})
