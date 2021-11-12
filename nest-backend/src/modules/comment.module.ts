import { Module } from '@nestjs/common'
import { CommentController } from '../controllers/comment.controller'
import { CommentService } from '../services/comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentRepository } from '../repositories/comment.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository
    ])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
