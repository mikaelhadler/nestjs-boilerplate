import { Module, HttpModule } from '@nestjs/common'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'
import { LoggerModule } from '../logger/logger.module'
import { JwtStrategy } from './jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { GoogleStrategy } from './google.strategy'
import { jwtConstrants } from './constants'

@Module({
  imports: [
    HttpModule,
    LoggerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstrants.secret,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, GoogleStrategy],
})
export class AuthenticationModule {}
