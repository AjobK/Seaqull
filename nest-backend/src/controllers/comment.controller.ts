import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common'
import { CommentService } from '../services/comment.service'
import { Comment } from '../entities/comment.entity'
import { AuthGuard } from '@nestjs/passport'
import { CommentDTO } from '../dtos/comment.dto'
import { AuthorizedUser } from '../decorators/jwt.decorator'
import { Account } from '../entities/account.entity'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:postPath')
  public async getComments(@Param('postPath') postPath: string): Promise<Comment[]> {
    const comments = await this.commentService.getCommentsByPostPath(postPath)

    if (comments.length === 0) throw new NotFoundException({ message: 'No comments found on that path' })

    return comments
  }

  @UseGuards(AuthGuard())
  @Post()
  public async createComment(@Body() commentDTO: CommentDTO, @AuthorizedUser() user: Account): Promise<void> {
    await this.commentService.createComment(commentDTO, user.profile)
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  public async deleteComment(@Param('id') comment_id: number, @AuthorizedUser() user: Account): Promise<void> {
    await this.commentService.deleteComment(comment_id, user.profile)
  }
}
