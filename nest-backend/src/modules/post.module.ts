import { Module } from '@nestjs/common'
import { PostController } from '../controllers/post.controller'
import { PostService } from '../services/post.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostRepository } from '../repositories/post.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository
    ])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
