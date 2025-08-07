// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigurationService } from '@/core/config/configuration.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.auth_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      profilePicture: payload.profilePicture,
      accessToken: payload.accessToken,
    };
  }
}
