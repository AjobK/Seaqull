import { Post } from '../entities/post.entity'

export class PostsResponsePayloadDTO {
  posts: Post[]

  totalPosts: number

  per_page: number
}
