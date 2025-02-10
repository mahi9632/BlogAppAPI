import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern({ cmd: 'create-post' })
  async createPost(@Payload() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @MessagePattern({ cmd: 'get-posts' })
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @MessagePattern({ cmd: 'get-post-detail' })
  async getPostById(id) {
    return this.postsService.findById(id);
  }
  @MessagePattern({ cmd: 'delete-post' })
  async deletePost(@Payload() data: { id: string }) {
    return this.postsService.remove(data.id);
  }
}
