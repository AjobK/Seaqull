import { Controller, Delete, Get, Post } from '@nestjs/common'
import { CommentService } from '../services/comment.service'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:path')
  public getComments(): any {

  }

  @Get('/likes/:id')
  public getCommentLikes(): any {

  }

  @Post()
  public createComment(): any {

  }

  @Post('/likes/:id')
  public createCommentLike(): any {

  }

  @Delete('/:id')
  public deleteComment(): any {

  }

  @Delete('/likes/:id')
  public deleteCommentLike(): any {

  }
}
