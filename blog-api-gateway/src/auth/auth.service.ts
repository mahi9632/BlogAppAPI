import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/Entities/User';
import { UserDetails } from '../utils/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //intiate Login
  async login(user: any) {
    const payload = { email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  //validate User
  async validateUser(details: UserDetails) {
    const user = await this.userRepository.findOneBy({ email: details.email });
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  //find the existance of User
  async findUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
