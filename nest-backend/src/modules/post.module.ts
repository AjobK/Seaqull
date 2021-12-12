import { Module } from '@nestjs/common'
import { PostController } from '../controllers/post.controller'
import { PostService } from '../services/post.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostRepository } from '../repositories/post.repository'
import { AuthModule } from './auth.module'
import { PostLikeRepository } from '../repositories/post_like.repository'
import { PostViewRepository } from '../repositories/post_view.repository'
import { AccountRepository } from '../repositories/account.repository'
import { AttachmentRepository } from '../repositories/attachment.repository'
import { ArchivedPostRepository } from '../repositories/archived_post.repository'
import { RolePermissionRepository } from '../repositories/role_permission.repository'
import { FileService } from '../services/file.service'
import {RoleRepository} from "../repositories/role.repository";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      AccountRepository,
      PostRepository,
      RoleRepository,
      PostLikeRepository,
      PostViewRepository,
      AttachmentRepository,
      ArchivedPostRepository,
      RolePermissionRepository,
    ])
  ],
  controllers: [PostController],
  providers: [PostService, FileService]
})
export class PostModule {}
