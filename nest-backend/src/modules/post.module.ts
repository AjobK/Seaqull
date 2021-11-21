import { Module } from '@nestjs/common'
import { PostController } from '../controllers/post.controller'
import { PostService } from '../services/post.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostRepository } from '../repositories/post.repository'
import { AuthorizationModule } from './authorization.module'
import { PostLikeRepository } from '../repositories/post_like.repository'
import { PostViewRepository } from '../repositories/post_view.repository'
import { AccountRepository } from '../repositories/account.repository'

@Module({
  imports: [
    AuthorizationModule,
    TypeOrmModule.forFeature([
      AccountRepository,
      PostRepository,
      PostLikeRepository,
      PostViewRepository
    ])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
