import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import env from '../../config/env'
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super(
      {
        clientID: env.projectIdOauthGoogle,
        clientSecret: env.secretOauthGoogle,
        callbackURL: '/authentication/redirect',
        scope: ['email', 'profile', 'openid'],
      },
      (accessToken: string, refreshToken: string, token, profile: any, done: VerifyCallback) => {
        done(null, {
          accessToken,
          refreshToken,
          token,
          profile,
        })
      },
    )
  }
}
