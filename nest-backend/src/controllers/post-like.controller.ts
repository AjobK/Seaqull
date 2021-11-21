import { Controller, Delete, Get, Post } from '@nestjs/common'
import { PostLikeService } from '../services/post-like.service'

@Controller('post/like')
export class PostLikeController {

  constructor(
    private readonly postLikeService: PostLikeService,
  ) {
  }

  @Get('/:path')
  public getPostLikes(): any {

  }

  @Get('/recent/:username')
  public getRecentUserLikes(): any {

  }

  @Post('/like/:path')
  public likePost(): any {

  }

  @Delete('/like/:path')
  public unlikePost(): any {

  }
}
