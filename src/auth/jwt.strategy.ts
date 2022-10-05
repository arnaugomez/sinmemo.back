import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiError } from 'src/api/ApiError';
import { AuthService } from 'src/auth/auth.service';
import { JwtContents } from '../users/api/JwtContents';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      ignoreExpiration: false,
      secretOrKey: 'My random secret key never let others',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(payload?: JwtContents) {
    if (!payload) {
      throw new UnauthorizedException('No JWT token');
    }
    try {
      await this.authService.validateJwtToken(payload);
    } catch (e) {
      if (e instanceof ApiError) {
        e.sendUnauthorized();
      } else throw e;
    }
    return payload.userId; // you can get it later as `req.user`
  }
}
