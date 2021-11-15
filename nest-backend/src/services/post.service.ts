import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from '../repositories/post.repository'
import { PostsResponsePayloadDTO } from '../dtos/posts-response-payload.dto'

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostRepository) private readonly postRepository: PostRepository) {
  }

  public async getPosts(skipSize: string): Promise<PostsResponsePayloadDTO> {
    let posts
    const skipAmount = 6

    if (skipSize) {
      posts = await this.postRepository.getPosts(String(skipSize), skipAmount)

      if (posts.length === 0) {
        throw new NotFoundException('You`ve reached the last post')
      }
    } else {
      posts = await this.postRepository.getPosts('0', skipAmount)
    }

    for (const post of posts) {
      post.thumbnail = await this.getPostThumbnailURL(post.id)
    }

    const count = await this.postRepository.getAmountPosts()
    const message: PostsResponsePayloadDTO = { posts: posts, totalPosts: count, per_page: skipAmount }

    return message
  }

  private getPostThumbnailURL = async (postId: number) => {
    const attachment = await this.postRepository.getPostAttachment(postId)

    return 'http://localhost:8000/' + attachment.path
  }
}
