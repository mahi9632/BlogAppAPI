import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/posts-dto';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('POSTS_SERVICE') private readonly postsServiceClient: ClientProxy,
  ) {}

  // Create a new post
  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsServiceClient.send({ cmd: 'create-post' }, createPostDto);
  }

  // Get all posts
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts() {
    return this.postsServiceClient.send({ cmd: 'get-posts' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPostById(@Param('id') id: bigint) {
    return this.postsServiceClient.send({ cmd: 'get-post-detail' }, id);
  }

  // Delete a post by ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsServiceClient.send({ cmd: 'delete-post' }, { id });
  }
}
