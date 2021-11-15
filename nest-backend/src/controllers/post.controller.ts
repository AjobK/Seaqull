import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { PostService } from '../services/post.service'
import { PostsResponsePayloadDTO } from '../dtos/posts-response-payload.dto'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async getPosts(@Query('page') skipSize: string): Promise<PostsResponsePayloadDTO> {
    const posts = await this.postService.getPosts(skipSize)

    return posts
  }

  @Get('/:path')
  public getPostByPath(): any {

  }

  @Get('/like/:path')
  public getPostLikes(): any {

  }

  @Get('/view/:path')
  public getPostViewCount(): any {

  }

  @Get('/owned-by/:username')
  public getOwnedPosts(): any {

  }

  @Get('/liked-by/recent/:username')
  public getRecentUserLikes(): any {

  }

  @Post()
  public createPost(): any {

  }

  @Post('/view')
  public addViewToPost(): any {

  }

  @Post('/like/:path')
  public likePost(): any {

  }

  @Put('/:path')
  public updatePost(): any {

  }

  @Put('/archive/:path')
  public archivePost(): any {

  }

  @Delete('/like/:path')
  public unlikePost(): any {

  }
}
