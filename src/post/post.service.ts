import { CreatePostDto } from '@/post/dto/createPost.dto';
import { PostEntity } from '@/post/post.entity';
import { IPostResponse } from '@/post/types/postResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    const post = new PostEntity();

    Object.assign(post, createPostDto);

    if (!post.tagList) {
      post.tagList = [];
    }

    post.slug = this.generateSlug(createPostDto.title);
    post.authorId = userId;

    // Save the post first
    const savedPost = await this.postRepository.save(post);

    // Return post with author populated
    const postWithAuthor = await this.postRepository.findOne({
      where: { id: savedPost.id },
      relations: ['author'],
    });

    if (!postWithAuthor) {
      throw new NotFoundException('Post not found after creation');
    }

    return postWithAuthor;
  }

  generatePostResponse(post: PostEntity): IPostResponse {
    return { post };
  } 

  private generateSlug(title: string): string {
    return (
      title
        .toLowerCase()
        .replace(/[^\w\w]/gi, '')
        .replace(/\s+/g, '-')
        .trim() +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
