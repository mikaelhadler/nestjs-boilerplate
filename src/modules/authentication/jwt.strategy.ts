import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { jwtConstrants } from './constants'
import messages from '../../common/messages'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstrants.secret,
    })
  }

  async validate(payload: any) {
    const { id_token } = payload
    try {
      await this.authService.verifyTokenGoogle(id_token)
      return { id: payload.sub, email: payload.email }
    } catch (error) {
      throw new UnauthorizedException(messages.authenticate.notHaveAuthorization)
    }
  }
}
