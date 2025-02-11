import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  // Initiate Login
  async login(user: any) {
    try {
      const payload = { email: user.email };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error generating access token');
    }
  }

  // Validate User
  async validateUser(details: UserDetails) {
    try {
      const user = await this.userRepository.findOneBy({ email: details.email });
      if (user) return user;

      console.log('User not found. Creating...');
      const newUser = this.userRepository.create(details);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Error validating user');
    }
  }

  // Find User by Email
  async findUser(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving user');
    }
  }
}
