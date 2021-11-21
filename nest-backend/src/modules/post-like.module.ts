import { Module } from '@nestjs/common'
import { PostLikeController } from '../controllers/post-like.controller'
import { PostLikeService } from '../services/post-like.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostLikeRepository } from '../repositories/post_like.repository'
import { PostRepository } from '../repositories/post.repository'

@Module({
  imports: [TypeOrmModule.forFeature([
    PostLikeRepository,
    PostRepository
  ])],
  controllers: [PostLikeController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
