import {Body, Controller, Get, Ip, Param, Post, Put, Query, UseGuards} from '@nestjs/common'
import { PostService } from '../services/post.service'
import { PostsResponsePayloadDTO } from '../dtos/posts-response-payload.dto'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'
import { AuthGuard } from '@nestjs/passport'
import { CreatePostDTO } from '../dtos/create-post.dto'
import { PostViewDTO } from '../dtos/post-view.dto'

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

  @Get('/view/:path')
  public async getPostViewCount(@Param('path') postPath: string): Promise<PostViewDTO> {
    const postViewCount = await this.postService.getPostViewsByPath(postPath)

    return postViewCount
  }

  @Get('/owned-by/:username')
  public async getOwnedPosts(@Param('username') username: string): Promise<any[]> {
    const ownedPosts = await this.postService.getOwnedPostsByUsername(username)

    return ownedPosts
  }

  @Post()
  public createPost(@Body() createPostDTO: CreatePostDTO): any {

  }

  @Post('/view')
  public addViewToPost(@Body('path') postPath: string, @Ip() ipAddress: string): any {

  }

  @Put('/:path')
  public updatePost(): any {

  }

  @Put('/archive/:path')
  public archivePost(): any {

  }
}
