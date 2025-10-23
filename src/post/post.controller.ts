import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from '@/post/dto/createPost.dto';
import { PostEntity } from '@/post/post.entity';
import { PostService } from '@/post/post.service';
import { AuthGuard } from '@/user/guards/auth.guard';
import { AuthRequest } from '@/types/expressRequest.interface';
import { IPostResponse } from '@/post/types/postResponse.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createPost(
    @Req() request: AuthRequest,
    @Body() createPostDto: CreatePostDto,
  ): Promise<IPostResponse> {
    if (!request.user || request.user.sub === undefined) {
      throw new HttpException(
        'User not authenticated',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newPost = await this.postService.createPost(request.user.sub, createPostDto);

    return this.postService.generatePostResponse(newPost);
  }
}
