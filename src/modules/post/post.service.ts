import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/domain/entities';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private userRepository: Repository<Post>,
  ) {}

  async create(createUserDto: CreatePostDto): Promise<void> {
    console.log(createUserDto);
  }
}
