import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'
import messages from '../../common/messages'
import env from '../../config/env'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dtos/refresh-token-dto'
import { TokenDto, CreateTokenDto, TokenResponseDto } from './dtos/token-dto'

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) { }

  async refreshToken(request: RefreshTokenDto): Promise<CreateTokenDto> {
    try {
      const { email, id_token } = await this.refreshTokenIsValid(request.refreshToken)
      return this.createToken({ email: email, id_token: id_token })
    } catch (error) {
      throw new UnauthorizedException(messages.authenticate.invalidToken)
    }
  }

  async refreshTokenIsValid(refreshToken: string) {
    return this.jwtService.verifyAsync(refreshToken)
  }

  async createToken(payload: TokenDto): Promise<CreateTokenDto> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: `${env.accessTokenDuration}`,
    })
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${env.refreshTokenDuration}`,
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async googleLogin(req): Promise<any> {
    try {
      await this.verifyTokenGoogle(req.user.token.id_token)
      req.user.token = await this.createToken({ id_token: req.user.token.id_token, email: req.user.profile.email })
      return req.user
    } catch (error) {
      throw new UnauthorizedException(messages.authenticate.notHaveAuthorization)
    }
  }

  async saveToken(body): Promise<TokenResponseDto> {
    try {
      const user = await this.googleLogin(body)

      const { profile, token } = user

      const email = profile.email
      const picture = profile.imageUrl
      const displayName = profile.name
      const fullName = `${profile.givenName} ${profile.familyName}`

      return {
        token,
        profile: {
          picture,
          displayName,
          email,
          fullName,
        },
      }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async verifyTokenGoogle(token: any): Promise<any> {
    const CLIENT_ID = env.projectIdOauthGoogle
    const client = new OAuth2Client(CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })

    return ticket.getPayload()
  }
}
