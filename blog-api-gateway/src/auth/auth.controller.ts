import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Inject,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { GoogleAuthGuard } from './google-auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private client: ClientProxy;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 8081 },
    });
  }
  // app.useGlobalGuards(new GoogleAuthGuard())

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user);
    res.redirect(`http://localhost:3000?token=${response.accessToken}`);
  }
}
