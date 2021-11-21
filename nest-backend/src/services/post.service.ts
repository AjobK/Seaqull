import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from '../repositories/post.repository'
import { PostsResponsePayloadDTO } from '../dtos/posts-response-payload.dto'
import { Account } from '../entities/account.entity'
import { PostLikeRepository } from '../repositories/post_like.repository'
import { PostDetailedPayloadDTO } from '../dtos/post-detailed-payload.dto'
import { PostViewRepository } from '../repositories/post_view.repository'
import { PostViewDTO } from '../dtos/post-view.dto'
import { Post } from '../entities/post.entity'
import { AccountRepository } from '../repositories/account.repository'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(PostLikeRepository) private readonly postLikeRepository: PostLikeRepository,
    @InjectRepository(PostViewRepository) private readonly postViewRepository: PostViewRepository,
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository
  ) {
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

  public async getPostByPath(path: string, account: Account | undefined): Promise<PostDetailedPayloadDTO> {
    const post = await this.postRepository.getPostByPathWithAttachment(path)

    if (!post) throw new NotFoundException(`No post found with path ${path}`)

    const postLikes = await this.postLikeRepository.getPostLikesById(post.id)
    const postLikesAmount = postLikes ? postLikes.length : 0

    let userLiked = false

    if (account) {
      userLiked = await this.postLikeRepository.findIfLikeByPostAndProfile(post, account.profile)
    }

    return { post, likes: postLikesAmount, isOwner: userLiked }
  }

  public async getPostViewsByPath(postPath: string): Promise<PostViewDTO> {
    const post = await this.postRepository.getPostByPath(postPath)

    if (!post) throw new NotFoundException({ message: 'Post not found' })

    const postViewCount = await this.postViewRepository.getPostViewCount(post)

    return { views: postViewCount }
  }

  public async getOwnedPostsByUsername(username: string): Promise<any[]> {
    const account = await this.accountRepository.getAccountByUsername(username)

    if (!account) throw new NotFoundException([])

    const posts = await this.postRepository.getPostsByProfile(account.profile) as any[]

    for (const post of posts) {
      post.thumbnail = await this.getPostThumbnailURL(post.id)
    }

    return posts
  }

  private async getPostThumbnailURL(postId: number): Promise<string> {
    const attachment = await this.postRepository.getPostAttachment(postId)

    return 'http://localhost:8000/' + attachment.path
  }
}
