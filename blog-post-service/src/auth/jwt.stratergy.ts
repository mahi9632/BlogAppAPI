import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Your JWT Secret Key
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
