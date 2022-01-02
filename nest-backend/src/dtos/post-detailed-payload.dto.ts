import { Post } from '../entities/post.entity'
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class PostDetailedPayloadDTO {
  @IsNotEmpty()
  post: Post

  @IsNumber()
  likes: { amount: number, userLiked: boolean }

  @IsBoolean()
  isOwner: boolean
}
