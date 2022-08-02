import { Module } from '@nestjs/common'
import { PostLikeController } from '../controllers/post-like.controller'
import { PostLikeService } from '../services/post-like.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostLikeRepository } from '../repositories/post_like.repository'
import { PostRepository } from '../repositories/post.repository'
import { ProfileRepository } from '../repositories/profile.repository'
import { AuthModule } from './auth.module'
import { AccountRepository } from '../repositories/account.repository'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      PostLikeRepository,
      PostRepository,
      ProfileRepository,
      AccountRepository,
    ])],
  controllers: [PostLikeController],
  providers: [PostLikeService, ConfigService],
})
export class PostLikeModule {}
