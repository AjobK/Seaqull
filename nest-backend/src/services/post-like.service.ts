import { PostLikeRepository } from '../repositories/post_like.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from '../repositories/post.repository'
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common'
import { PostLike } from '../entities/post_like.entity'
import { ProfileRepository } from '../repositories/profile.repository'
import { Profile } from '../entities/profile.entity'
import { AccountRepository } from '../repositories/account.repository'
import { Post } from '../entities/post.entity'

export class PostLikeService {
  constructor(
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(PostLikeRepository) private readonly postLikeRepository: PostLikeRepository,
    @InjectRepository(ProfileRepository) private readonly profileRepository: ProfileRepository,
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository,
  ) {
  }

  public async getPostLikes(path: string): Promise<PostLike[]> {
    const post = await this.postRepository.getPostByPath(path)

    if (!post) throw new NotFoundException('Post not found')

    const postLikes = await this.postLikeRepository.getPostLikesById(post.id)

    return postLikes
  }

  public async getRecentUserLikes(username: string): Promise<Post[]> {
    const profile = await this.accountRepository.getProfileByUsername(username)

    if (!profile) throw new NotFoundException('User not found')

    const likes = await this.postLikeRepository.getUserLikesByProfileId(profile.id, 8)

    const posts = []

    likes.forEach((like) => {
      posts.push(like.post)
    })

    return posts
  }

  async likePost(path: string, profile: Profile): Promise<void> {
    const post = await this.postRepository.getPostByPath(path)

    if (!post) throw new NotFoundException('Post not found')

    if (profile.id === post.profile.id) throw new ForbiddenException('Post owners cannot like their posts')

    const postLike = new PostLike()
    postLike.profile = profile
    postLike.post = post
    postLike.liked_at = new Date()

    try {
      await this.postLikeRepository.likePost(postLike)
    } catch (e) {
      throw new BadRequestException('Post already liked')
    }
  }

  async unlikePost(path: string, profile: Profile): Promise<void> {
    const post = await this.postRepository.getPostByPath(path)

    if (!post) throw new NotFoundException('Post not found')

    const postLike = await this.postLikeRepository.findLikeByPostAndProfile(post, profile)

    if (!postLike) throw new NotFoundException('Like to remove was not found')

    await this.postLikeRepository.unlikePost(postLike)
  }
}
