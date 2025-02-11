import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/posts-dto';
import { firstValueFrom, catchError } from 'rxjs';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('POSTS_SERVICE') private readonly postsServiceClient: ClientProxy,
  ) {}

  // Create a new post
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    try {
      if (!createPostDto.title || !createPostDto.content) {
        throw new BadRequestException('Title and content are required');
      }

      return await firstValueFrom(
        this.postsServiceClient
          .send({ cmd: 'create-post' }, createPostDto)
          .pipe(
            catchError((err) => {
              throw new InternalServerErrorException(
                err.message || 'Error creating post',
              );
            }),
          ),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all posts
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts() {
    try {
      return await firstValueFrom(
        this.postsServiceClient.send({ cmd: 'get-posts' }, {}).pipe(
          catchError((err) => {
            throw new InternalServerErrorException(
              err.message || 'Error retrieving posts',
            );
          }),
        ),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get a single post by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    try {
      if (!id) throw new BadRequestException('Post ID is required');

      const post = await firstValueFrom(
        this.postsServiceClient.send({ cmd: 'get-post-detail' }, id).pipe(
          catchError((err) => {
            throw new InternalServerErrorException(
              err.message || 'Error retrieving post',
            );
          }),
        ),
      );

      if (!post) throw new NotFoundException('Post not found');

      return post;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete a post by ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    try {
      if (!id) throw new BadRequestException('Post ID is required');

      const result = await firstValueFrom(
        this.postsServiceClient.send({ cmd: 'delete-post' }, { id }).pipe(
          catchError((err) => {
            throw new InternalServerErrorException(
              err.message || 'Error deleting post',
            );
          }),
        ),
      );

      if (!result) throw new NotFoundException('Post not found');

      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
