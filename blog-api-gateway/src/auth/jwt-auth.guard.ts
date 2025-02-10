import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (
      request.path.includes('google/callback') ||
      request.path.includes('google/login')
    ) {
      return true; // Bypass JWT guard for Google login callback
    }
    return super.canActivate(context);
  }
}
