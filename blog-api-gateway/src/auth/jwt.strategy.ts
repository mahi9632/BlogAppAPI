import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string; // user id
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Use your secret key from .env
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username }; // Return any necessary user data
  }
}
