import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as EPost } from 'src/entities';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { PostService } from './post.service';

@ApiTags('posts') // put the name of the controller in swagger
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'create a post' })
  @ApiResponse({
    status: 201,
    type: PostResponseDto,
  })
  @Post('')
  create(@Body() body: CreatePostDto): Promise<EPost> {
    return this.postService.create(body);
  }
}
