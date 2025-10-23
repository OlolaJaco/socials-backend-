import { CreatePostDto } from '@/post/dto/createPost.dto';
import { PostEntity } from '@/post/post.entity';
import { IPostResponse } from '@/post/types/postResponse.interface';
import { UserEntity } from '@/user/user.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

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

  async getSinglePost( slug: string ) : Promise<PostEntity> {
    const post = await this.findBySlug(slug);
    return post;
  }

  async deletePost( slug: string, currentUserId: number ) : Promise<DeleteResult> {
    const post = await this.findBySlug(slug);
    if (post.authorId !== currentUserId) {
        throw new HttpException('You are not authorized to delete this post for you\'re not the owner', HttpStatus.FORBIDDEN)
    }
    return this.postRepository.delete({ slug });
  }

  async findBySlug(slug: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
        where: { slug }
    })

    if (!post) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND)
    }

    return post;
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
