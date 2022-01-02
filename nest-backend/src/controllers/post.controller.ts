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
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { PostService } from '../services/post.service'
import { PostsDTO } from '../dtos/response/posts.dto'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'
import { CreatePostDTO } from '../dtos/create-post.dto'
import { PostViewDTO } from '../dtos/post-view.dto'
import { PostCreationDTO } from '../dtos/post-creation.dto'
import { AllowAny } from '../decorators/allow-any.decorator'
import { ServerHost } from '../decorators/host.decorator'

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  @AllowAny()
  public async getPosts(@Query('page') skipSize: string): Promise<PostsDTO> {
    const posts = await this.postService.getPosts(skipSize)

    return posts
  }

  @Get('/:path')
  @AllowAny()
  public async getPostByPath(
    @Param('path') path: string,
    @AuthorizedUser() account: Account,
    @ServerHost() hostUrl: string
  ): Promise<any> {
    const postDetailedPayload = await this.postService.getPostByPath(path, account, hostUrl)

    return postDetailedPayload
  }

  @Get('/view/:path')
  @AllowAny()
  public async getPostViewCount(@Param('path') postPath: string): Promise<PostViewDTO> {
    const postViewCount = await this.postService.getPostViewsByPath(postPath)

    return postViewCount
  }

  @Get('/owned-by/:username')
  @AllowAny()
  public async getOwnedPosts(@Param('username') username: string): Promise<any[]> {
    const ownedPosts = await this.postService.getOwnedPostsByUsername(username)

    return ownedPosts
  }

  @Get('/thumbnail/default')
  @AllowAny()
  public async getPostDefaultThumbnailURL(): Promise<{ thumbnail: string }> {
    const attachmentURL = await this.postService.getDefaultThumbnailAttachment()

    return {
      thumbnail: attachmentURL
    }
  }

  @Post()
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
  @AllowAny()
  public async addViewToPost(@Body('path') postPath: string, @Ip() ipAddress: string): Promise<{ message: string}> {
    await this.postService.addViewToPost(postPath, ipAddress)

    return {
      message: 'Post viewed'
    }
  }

  @Put('/:path')
  public async updatePost(
    @Param('path') path: string,
    @Body() createPostDTO: CreatePostDTO,
    @AuthorizedUser() user: Account
  ): Promise<{ message: string }> {
    await this.postService.updatePost(path, createPostDTO, user.profile.display_name)

    return {
      message: 'Post has been updated!'
    }
  }

  @Put('/archive/:path')
  public async archivePost(
    @Param('path') path: string,
    @AuthorizedUser() user: Account
  ): Promise<{ message: string }> {
    await this.postService.archivePost(path, user)

    return {
      message: 'Post archived'
    }
  }

  @Put('/thumbnail/:path')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fieldSize: 2 * 1024 * 1024 },
  }))
  public async updatePostThumbnail(
    @Param('path') path: string,
    @UploadedFile() file: Express.Multer.File,
    @AuthorizedUser() user: Account,
  ): Promise<{ message: string, url: string }> {
    const url = await this.postService.updatePostThumbnail(path, file, user)

    return {
      message: 'success', url
    }
  }
}
