import { Module } from '@nestjs/common'
import { CommentController } from '../controllers/comment.controller'
import { CommentService } from '../services/comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentRepository } from '../repositories/comment.repository'
import { PostRepository } from '../repositories/post.repository'
import { AuthorizationModule } from './authorization.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      PostRepository
    ]),
    AuthorizationModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
