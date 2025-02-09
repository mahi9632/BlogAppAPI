import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/Entities/User";
import { DatabaseModule } from "src/database/database.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
    secret: process.env.JWT_SECRET, // Your secret key
    signOptions: { expiresIn: '1h' }, // Set token expiration as needed
  })],
  controllers:[AuthController],
  providers: [GoogleStrategy, GoogleAuthGuard,JwtStrategy,    {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  }],
  exports: [GoogleAuthGuard,TypeOrmModule,DatabaseModule],
})
export class AuthModule {}
