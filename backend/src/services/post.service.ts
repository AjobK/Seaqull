import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { v4 as uuidv4 } from 'uuid'
import { ConfigService } from '@nestjs/config'
import { PostRepository } from '../repositories/post.repository'
import { PostsDTO } from '../dtos/response/posts.dto'
import { Account } from '../entities/account.entity'
import { PostLikeRepository } from '../repositories/post_like.repository'
import { PostDetailedPayloadDTO } from '../dtos/post-detailed-payload.dto'
import { PostViewRepository } from '../repositories/post_view.repository'
import { PostViewDTO } from '../dtos/post-view.dto'
import { AccountRepository } from '../repositories/account.repository'
import { CreatePostDTO } from '../dtos/create-post.dto'
import { FileService } from './file.service'
import { Post } from '../entities/post.entity'
import { AttachmentRepository } from '../repositories/attachment.repository'
import { PostView } from '../entities/post_view.entity'
import { ArchivedPost } from '../entities/archivedPost.entity'
import { ArchivedPostRepository } from '../repositories/archived_post.repository'
import { Attachment } from '../entities/attachment.entity'
import { RolePermissionRepository } from '../repositories/role_permission.repository'
import { ProfileRepository } from '../repositories/profile.repository'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(PostLikeRepository) private readonly postLikeRepository: PostLikeRepository,
    @InjectRepository(PostViewRepository) private readonly postViewRepository: PostViewRepository,
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository,
    @InjectRepository(AttachmentRepository) private readonly attachmentRepository: AttachmentRepository,
    @InjectRepository(ArchivedPostRepository) private readonly archivedPostRepository: ArchivedPostRepository,
    @InjectRepository(RolePermissionRepository) private readonly rolePermissionRepository: RolePermissionRepository,
    @InjectRepository(ProfileRepository) private readonly profileRepository: ProfileRepository,
    private readonly fileService: FileService,
    private readonly configService: ConfigService
  ) {
  }

  public async getPosts(page: number): Promise<PostsDTO> {
    const amount = 6
    const totalPosts = await this.postRepository.getAmountPosts()
    const totalPages = Math.ceil(totalPosts / amount)

    let posts = []

    if (isNaN(+page) || +page < 0)
      throw new UnprocessableEntityException('Invalid page number')

    page = ~~page
    posts = await this.postRepository.getPosts(+page, amount)

    const message = {
      currentPage: +page,
      totalPages: totalPages,
      postsPerPage: amount,
      posts: posts
    }

    return message
  }

  public async getPostByPath(
    path: string,
    account: Account | undefined,
    hostUrl: string
  ): Promise<PostDetailedPayloadDTO> {
    let post = await this.postRepository.getPostByPath(path) as any

    if (!post) throw new NotFoundException(`No post found with path ${ path }`)

    const attachments = await this.profileRepository.getProfileAttachments(post.profile.id)

    post.profile.avatar_attachment = attachments.avatar.path
    post.profile.banner_attachment = attachments.banner.path

    const postLikes = await this.postLikeRepository.getPostLikesById(post.id)
    const postLikesAmount = postLikes ? postLikes.length : 0

    let userLiked = false
    let isOwner = false

    if (account) {
      isOwner = post.profile.id === account.profile.id
      userLiked = await this.postLikeRepository.findIfLikeByPostAndProfile(post, account.profile)
    }

    const attachment = await this.postRepository.getPostAttachment(post.id)

    post = {
      ...post,
      thumbnail: `${ hostUrl }/${ attachment.path }`
    }

    return { post, likes: { amount: postLikesAmount, userLiked }, isOwner }
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

  public async addViewToPost(postPath: string, ipAddress: string): Promise<void> {
    const foundPost = await this.postRepository.getPostByPath(postPath)

    if (!foundPost) throw new NotFoundException({ message: 'Post not found' })

    const ipViewedPost = await this.postViewRepository.hasViewedPost(foundPost, ipAddress)

    if (ipViewedPost) return

    const postView = new PostView()
    postView.post = foundPost
    postView.ip = ipAddress

    await this.postViewRepository.addViewToPost(postView)
  }

  public async createPost(createPostDTO: CreatePostDTO, file: Express.Multer.File, user: Account): Promise<string> {
    if (!this.isAllowedToPost(user)) return null

    let thumbnailAttachment
    const NEW_POST = new Post()

    if (file) {
      const IS_IMAGE = this.fileService.isImage(file)

      if (!IS_IMAGE) throw new BadRequestException({ error: 'Only images are allowed' })

      thumbnailAttachment = await this.createThumbnailAttachment(file)
    } else {
      thumbnailAttachment = await this.attachmentRepository.getDefaultThumbnailAttachment()
    }

    NEW_POST.title = createPostDTO.title
    NEW_POST.description = createPostDTO.description
    NEW_POST.content = createPostDTO.content
    NEW_POST.published_at = new Date()
    NEW_POST.created_at = new Date()
    NEW_POST.thumbnail_attachment = thumbnailAttachment
    NEW_POST.profile = user.profile
    NEW_POST.path = uuidv4()

    await this.postRepository.createPost(NEW_POST)

    return NEW_POST.path
  }

  public async updatePost(path: string, createPostDTO: CreatePostDTO, display_name: string): Promise<void> {
    const post = await this.postRepository.getPostByPath(path)

    if (!post || display_name !== post.profile.display_name) {
      throw new ForbiddenException({
        message: 'The authorized requesting user does not have access to this resource'
      })
    }

    post.title = createPostDTO.title
    post.description = createPostDTO.description
    post.content = createPostDTO.content

    const result = await this.postRepository.updatePost(post)

    if (!result) throw new NotFoundException('Post was not found and could not be updated')
  }

  public async archivePost(path: string, user: Account): Promise<void> {
    const post = await this.postRepository.getPostByPath(path)

    if (
      !(post ||
      post.profile.display_name == user.profile.display_name ||
      (await this.hasRemovePostPermission(user)))
    ) {
      throw new ForbiddenException({
        message: 'The authorized requesting user does not have access to this resource'
      })
    }

    const currentDate = Date.now()
    post.archived_at = currentDate

    const archivedPost = new ArchivedPost()
    archivedPost.archived_at = currentDate
    archivedPost.archivist = user

    await this.archivedPostRepository.saveArchivedPost(archivedPost)

    const newPost = await this.postRepository.updatePost(post)

    if (!newPost) throw new NotFoundException('Post was not found and could not be updated')
  }

  public async getDefaultThumbnailAttachment(): Promise<string> {
    const foundAttachment = await this.attachmentRepository.getDefaultThumbnailAttachment()

    if (!foundAttachment) throw new NotFoundException('Attachment not found')

    const attachmentURL = `${ this.configService.get('BACKEND_URL') }/${ foundAttachment.path }`

    return attachmentURL
  }

  public async updatePostThumbnail(path: string, file: Express.Multer.File, user: Account): Promise<string> {
    const post = await this.postRepository.getPostByPath(path)

    if (!post || user.profile.display_name !== post.profile.display_name) {
      throw new ForbiddenException({
        message: 'The authorized requesting user does not have access to this resource'
      })
    }

    const IS_IMAGE = this.fileService.isImage(file)

    if (!IS_IMAGE) throw new BadRequestException('Only images are allowed')

    const BANNER = await this.updateThumbnailAttachment(post, file)

    return `${ this.configService.get('BACKEND_URL') }${ BANNER.path }`
  }

  public async isAllowedToPost(user: Account): Promise<{ allowedToPost: boolean, msDiff: number }> {
    const post = await this.postRepository.getLastPostByProfile(user.profile)
    const POST_TIMEOUT = 30000

    const MS_DIFFERENCE = post ? +(new Date()) - +post.created_at : 0
    const ALLOWED_TO_POST = MS_DIFFERENCE > POST_TIMEOUT || !post

    return { allowedToPost: ALLOWED_TO_POST, msDiff: MS_DIFFERENCE }
  }

  private async createThumbnailAttachment(file: Express.Multer.File) {
    const location = await this.fileService.storeImage(file, 'post/thumbnail')

    const attachment = await this.convertThumbnailToAttachment(location)

    return await this.attachmentRepository.saveAttachment(attachment)
  }

  private async updateThumbnailAttachment(post: Post, file: Express.Multer.File): Promise<Attachment> {
    let attachment = await this.postRepository.getPostAttachment(post.id)
    const location = await this.fileService.storeImage(file, 'post/thumbnail')

    const typeDefaultPath = 'default/defaultThumbnail.jpg'

    if (attachment.path !== typeDefaultPath) {
      return await this.deleteThumbnailAttachment(attachment, location)
    }

    attachment = await this.convertThumbnailToAttachment(location)

    post.thumbnail_attachment = await this.attachmentRepository.saveAttachment(attachment)

    await this.postRepository.updatePost(post)

    return post.thumbnail_attachment
  }

  private async convertThumbnailToAttachment(location: string) {
    const dimensions = { width: +(800 * (16 / 9)).toFixed(), height: 800 }

    await this.fileService.convertImage(location, dimensions)

    const attachment = new Attachment()
    attachment.path = location

    return attachment
  }

  private async getPostThumbnailURL(postId: number): Promise<string> {
    const attachment = await this.postRepository.getPostAttachment(postId)

    return `${ this.configService.get('BACKEND_URL') }/${ attachment.path }`
  }

  private async deleteThumbnailAttachment(attachment: Attachment, location: string) {
    this.fileService.deleteImage(attachment.path)
    attachment.path = location

    return await this.attachmentRepository.saveAttachment(attachment)
  }

  private async hasRemovePostPermission(user: Account): Promise<boolean> {
    const role = await this.accountRepository.getAccountRole(user.id)
    const permissions = await this.rolePermissionRepository.getRolePermissionsByRole(role.id)

    let hasPermission = false

    if (permissions.some((permission) => permission.permission.name === 'REMOVE_POSTS')) {
      hasPermission = true
    }

    return hasPermission
  }
}
