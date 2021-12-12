import { Module } from '@nestjs/common'
import { CommentController } from '../controllers/comment.controller'
import { CommentService } from '../services/comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentRepository } from '../repositories/comment.repository'
import { PostRepository } from '../repositories/post.repository'
import { AuthModule } from './auth.module'
import { ProfileCommentLikeRepository } from '../repositories/profile_comment_like.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      PostRepository,
      ProfileCommentLikeRepository
    ]),
    AuthModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
