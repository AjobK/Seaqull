import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common'
import { PostService } from '../services/post.service'
import { PostsResponsePayloadDTO } from '../dtos/posts-response-payload.dto'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'
import { AuthGuard } from '@nestjs/passport'
import {CreatePostDTO} from "../dtos/create-post.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async getPosts(@Query('page') skipSize: string): Promise<PostsResponsePayloadDTO> {
    const posts = await this.postService.getPosts(skipSize)

    return posts
  }

  @Get('/:path')
  public async getPostByPath(
    @Param('path') path
  ): Promise<any> {
    const postDetailedPayload = await this.postService.getPostByPath(path, undefined)

    return postDetailedPayload
  }

  @Get('/:path/auth')
  @UseGuards(AuthGuard())
  public async getPostByPathWhileAuthorized(
    @Param('path') path,
    @AuthorizedUser() account: Account
  ): Promise<any> {
    const postDetailedPayload = await this.postService.getPostByPath(path, account)

    return postDetailedPayload
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
  public createPost(@Body() createPostDTO: CreatePostDTO): any {

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
