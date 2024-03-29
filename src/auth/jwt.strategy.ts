import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './';
import { ConfigService } from './../config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY')
    });
  }

  async validate(payload: JwtPayload) {
    const timeDiff = payload.exp - payload.iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
