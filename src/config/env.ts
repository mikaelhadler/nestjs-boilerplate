interface EnvType {
  port: number
  urlDoMeuServico: string
  jwtSecret: string
  projectIdOauthGoogle: string
  secretOauthGoogle: string
  accessTokenDuration: string
  refreshTokenDuration: string
}

let variables: EnvType = {
  port: 3000,
  urlDoMeuServico: 'http://localhost:3000',
  jwtSecret: 'my-secret',
  projectIdOauthGoogle: 'id-oauth-google',
  secretOauthGoogle: 'secret-oauth-google',
  accessTokenDuration: '3600s',
  refreshTokenDuration: '24h',

}

export default {
  ...variables,
}
