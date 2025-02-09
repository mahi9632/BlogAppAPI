import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern({ cmd: 'create-post' })
  async createPost(@Payload() createPostDto: CreatePostDto) {
    console.log("PostService : ",createPostDto);
    
    return this.postsService.create(createPostDto);
  }

  @MessagePattern({ cmd: 'get-posts' })
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @MessagePattern({ cmd: 'delete-post' })
  async deletePost(@Payload() data: { id: string }) {
    return this.postsService.remove(data.id);
  }
}
