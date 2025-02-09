
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/Entities/User';
import { UserDetails } from '../utils/types';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}


  async login(user: any) {
   console.log("logging in: ",user);
   
   const payload = { email: user.email };
   return {
     accessToken: this.jwtService.sign(payload),
   };
 }

  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userRepository.findOneBy({ email: details.email });
    console.log(user);
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }


  async findUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
