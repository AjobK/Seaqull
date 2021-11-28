import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { PostLikeService } from '../services/post-like.service'
import { PostLike } from '../entities/post_like.entity'
import { AuthGuard } from '@nestjs/passport'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'

@Controller('post/like')
export class PostLikeController {

  constructor(
    private readonly postLikeService: PostLikeService,
  ) {
  }

  @Get('/:path')
  public async getPostLikes(@Param('path') path: string): Promise<PostLike[]> {
    const likes = await this.postLikeService.getPostLikes(path)

    return likes
  }

  @Get('/recent/:username')
  public async getRecentUserLikes(@Param('username') username: string): Promise<PostLike[]> {
    const recentUserLikes = await this.postLikeService.getRecentUserLikes(username)

    return recentUserLikes
  }

  @Post('/:path')
  @UseGuards(AuthGuard())
  public async likePost(@Param('path') path: string, @AuthorizedUser() user: Account): Promise<{ message: string }> {
    await this.postLikeService.likePost(path, user.profile)

    return {
      message: 'Post liked'
    }
  }

  @Delete('/:path')
  @UseGuards(AuthGuard())
  public async unlikePost(@Param('path') path: string, @AuthorizedUser() user: Account): Promise<{ message: string }> {
    await this.postLikeService.unlikePost(path, user.profile)

    return {
      message: 'Post like removed'
    }
  }
}
