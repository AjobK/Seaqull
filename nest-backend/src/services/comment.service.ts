import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { Comment } from '../entities/comment.entity'
import { CommentRepository } from '../repositories/comment.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from '../repositories/post.repository'
import { CommentDTO } from '../dtos/comment.dto'
import { Profile } from '../entities/profile.entity'
import { ProfileCommentLikeRepository } from '../repositories/profile_comment_like.repository'

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentRepository) private readonly commentRespository: CommentRepository,
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(ProfileCommentLikeRepository)
    private readonly profileCommentLikeRepository: ProfileCommentLikeRepository,
  ) {}

  public async getCommentById(id: number): Promise<Comment> {
    const comment = this.commentRespository.getCommentById(id)

    return comment
  }

  public async getCommentsByPostPath(postPath: string): Promise<Comment[]> {
    const post = await this.postRepository.getPostByPath(postPath)

    if (!post) throw new BadRequestException({ error: `No post with path ${postPath} found` })

    const comments = await this.commentRespository.getCommentsByPost(post)

    return comments
  }

  public async getCommentsPayload(comments: Comment[], profile?: Profile): Promise<any> {
    const responsePayload = []

    for (const comment of comments) {
      const commentLikePayload = []
      const commentLikes = await this.profileCommentLikeRepository.getCommentLikes(comment.id)
      let profileHasLikedComment = false

      commentLikes.forEach((commentLike) => {
        if (commentLike.profile.id === profile.id) profileHasLikedComment = true
        commentLikePayload.push(commentLike)
      })

      responsePayload.push({ comment, commentLikePayload, profileHasLikedComment })
    }

    return responsePayload
  }

  public async createComment(commentDTO: CommentDTO, profile: Profile): Promise<void> {
    const comment = new Comment()
    const { path, content, parent_comment_id } = commentDTO

    const post = await this.postRepository.getPostByPath(path)

    if (!post) throw new NotFoundException(`No post found with path ${path}`)

    comment.profile = profile
    comment.post = post
    comment.content = content
    comment.parent_comment_id =
      parent_comment_id ? await this.commentRespository.getCommentById(parent_comment_id) : undefined
    comment.created_at = new Date()
    comment.updated_at = new Date()

    await this.commentRespository.createComment(comment)
  }

  public async createCommentLike(comment: Comment, profile: Profile): Promise<void> {
    await this.profileCommentLikeRepository.createCommentLike(comment, profile)
  }

  public async pinComment(id: number, profile: Profile): Promise<void> {
    const post = await this.commentRespository.getPostByCommentId(id)

    if (!post) throw new NotFoundException('Comment or post not found')

    if (post.profile.id !== profile.id) {
      throw new ForbiddenException('Cannot pin comments under posts which do not belong to you')
    }

    await this.commentRespository.pinCommentById(id)
  }

  public async unpinComment(id: number, profile: Profile): Promise<void> {
    const post = await this.commentRespository.getPostByCommentId(id)

    if (!post) throw new NotFoundException('Comment or post not found')

    if (post.profile.id !== profile.id) {
      throw new ForbiddenException('Cannot pin comments under posts which do not belong to you')
    }

    await this.commentRespository.unpinCommentById(id)
  }

  public async deleteComment(comment_id: number, profile: Profile): Promise<void> {
    const comment = await this.commentRespository.getCommentById(comment_id)

    if (!comment) throw new NotFoundException(`Comment to delete not found with id ${comment_id}`)

    const commentProfile = await this.commentRespository.getCommentProfileById(comment.id)

    if (!(commentProfile.display_name === profile.display_name)) {
      throw new ForbiddenException('Forbidden resource')
    }

    const archivedDate = new Date()

    const children = await this.commentRespository.getCommentChildren(comment_id)

    comment.archived_at = archivedDate

    if (children) {
      for (const child of children) {
        await this.commentRespository.archiveComment(child, archivedDate)
      }
    }

    await this.commentRespository.archiveComment(comment, archivedDate)
  }

  public async deleteCommentLike(id: number, profile: Profile): Promise<void> {
    const comment = await this.commentRespository.getCommentById(id)

    if (!comment) throw new NotFoundException('Comment was not found')

    await this.profileCommentLikeRepository.deleteCommentLike(profile, comment)
  }
}
