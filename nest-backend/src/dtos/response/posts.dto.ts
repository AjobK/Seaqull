import { Post } from '../../entities/post.entity'

export class PostsDTO {
  currentPage: number
  totalPages: number
  postsPerPage: number
  posts: Post[]
}
