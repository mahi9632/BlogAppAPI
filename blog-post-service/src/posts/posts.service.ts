import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { CreatePostDto } from './dto/createPostDto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  async findById(id:bigint): Promise<PostEntity[]> {
    console.log("posrService search",id);
    
    return this.postsRepository.findBy({id})

  }
  

  async findAll(): Promise<PostEntity[]> {
    console.log("posrService search");
    
    return this.postsRepository.createQueryBuilder("post")
    .select(["post.title","post.id"])
    .getMany();;
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
