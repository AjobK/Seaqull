import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { PostService } from '../services/post.service'
import { PostsResponsePayloadDTO } from '../dtos/posts-response-payload.dto'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'
import { AuthGuard } from '@nestjs/passport'
import { CreatePostDTO } from '../dtos/create-post.dto'
import { PostViewDTO } from '../dtos/post-view.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { PostCreationDTO } from '../dtos/post-creation.dto'

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get()
  public async getPosts(@Query('page') skipSize: string): Promise<PostsResponsePayloadDTO> {
    const posts = await this.postService.getPosts(skipSize)

    return posts
  }

  @Get('/:path')
  public async getPostByPath(
    @Param('path') path: string
  ): Promise<any> {
    const postDetailedPayload = await this.postService.getPostByPath(path, undefined)

    return postDetailedPayload
  }

  @Get('/:path/auth')
  @UseGuards(AuthGuard())
  public async getPostByPathWhileAuthorized(
    @Param('path') path: string,
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
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file', {
    limits: { fieldSize: 2 * 1024 * 1024 },
  }))
  public async createPost(
    @Body() createPostDTO: CreatePostDTO,
    @UploadedFile() file: Express.Multer.File,
    @AuthorizedUser() user: Account,
  ): Promise<PostCreationDTO> {
    const path = await this.postService.createPost(createPostDTO, file, user)

    return {
      message: 'Post added!',
      path
    }
  }

  @Post('/view')
  public async addViewToPost(@Body('path') postPath: string, @Ip() ipAddress: string): Promise<{ message: string}> {
    await this.postService.addViewToPost(postPath, ipAddress)

    return {
      message: 'Post viewed'
    }
  }

  @Put('/:path')
  public updatePost(): any {

  }

  @Put('/archive/:path')
  public archivePost(): any {

  }
}
