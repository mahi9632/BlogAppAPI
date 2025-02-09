import { Injectable,Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
) {    
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    try {
      console.log("lgg7",profile);
      
      const { name, emails, displayName } = profile;
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        displayName: displayName
      };
      const newUser = await this.authService.validateUser(user);
      done(null, newUser);
    } catch (err) {
      console.error('Error during validation:', err);
      done(err, false);
    }
  }
  
}
