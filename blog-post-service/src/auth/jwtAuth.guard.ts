import { Injectable } from '@nestjs/common';
import { JwtStrategy } from './jwt.stratergy';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
