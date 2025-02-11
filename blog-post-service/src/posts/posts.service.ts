import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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
    try {
      if (!createPostDto.title || !createPostDto.content) {
        throw new BadRequestException('Title and content are required');
      }

      const post = this.postsRepository.create(createPostDto);
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException('Error creating post');
    }
  }

  async findById(id: bigint): Promise<PostEntity> {
    try {
      if (!id) throw new BadRequestException('Post ID is required');

      const post = await this.postsRepository.findOneBy({ id });
      if (!post) throw new NotFoundException('Post not found');

      return post;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving post');
    }
  }

  async findAll(): Promise<PostEntity[]> {
    try {
      return await this.postsRepository
        .createQueryBuilder('post')
        .select(['post.title', 'post.id'])
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving posts');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      if (!id) throw new BadRequestException('Post ID is required');

      const deleteResult = await this.postsRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException('Post not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting post');
    }
  }
}
