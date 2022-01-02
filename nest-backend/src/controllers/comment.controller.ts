import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommentService } from '../services/comment.service'
import { Comment } from '../entities/comment.entity'
import { CommentDTO } from '../dtos/comment.dto'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'
import { AllowAny } from '../decorators/allow-any.decorator'

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:postPath')
  public async getComments(@Param('postPath') postPath: string, @AuthorizedUser() user: Account): Promise<Comment[]> {
    const comments = await this.commentService.getCommentsByPostPath(postPath)

    if (comments.length === 0) return comments

    const payload = await this.commentService.getCommentsPayload(comments, user.profile)

    return payload
  }

  @Get('/:postPath/no-login')
  @AllowAny()
  public async getCommentsWithoutCredentials(@Param('postPath') postPath: string): Promise<Comment[]> {
    const comments = await this.commentService.getCommentsByPostPath(postPath)

    if (comments.length === 0) return []

    const payload = await this.commentService.getCommentsPayload(comments)

    return payload
  }

  @Post()
  public async createComment(@Body() commentDTO: CommentDTO, @AuthorizedUser() user: Account): Promise<void> {
    await this.commentService.createComment(commentDTO, user.profile)
  }

  @Post('/likes/:id')
  public async createCommentLike(@Param('id') id: number, @AuthorizedUser() user: Account): Promise<string> {
    const comment = await this.commentService.getCommentById(id)

    if (!comment) throw new NotFoundException('Comment was not found')

    await this.commentService.createCommentLike(comment, user.profile)

    return 'Successfully added commentLike'
  }

  @Patch('/:id/pin')
  public async pinComment(@Param('id') id: number, @AuthorizedUser() user: Account): Promise<string> {
    await this.commentService.pinComment(id, user.profile)

    return 'Successfully pinned comment'
  }

  @Patch('/:id/unpin')
  public async unpinComment(@Param('id') id: number, @AuthorizedUser() user: Account): Promise<string> {
    await this.commentService.unpinComment(id, user.profile)

    return 'Successfully unpinned comment'
  }

  @Delete('/:id')
  public async deleteComment(@Param('id') comment_id: number, @AuthorizedUser() user: Account): Promise<string> {
    await this.commentService.deleteComment(comment_id, user.profile)

    return 'Successfully deleted comment'
  }

  @Delete('/likes/:id')
  public async deleteCommentLike(@Param('id') id: number, @AuthorizedUser() user: Account): Promise<string> {
    await this.commentService.deleteCommentLike(id, user.profile)

    return 'Successfully removed commentLike'
  }
}
