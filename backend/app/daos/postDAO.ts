import DatabaseConnector from '../utils/databaseConnector'
import { Post } from '../entities/post'
import Profile from '../entities/profile'
import { PostLike } from '../entities/post_like'
import { PostView } from '../entities/post_view'
import { IsNull } from 'typeorm'

class PostDAO {
    private postViewRepository = 'PostView'

    public async getPosts(skipSize: string, amount: number): Promise<Post[]> {
      const repository = await DatabaseConnector.getRepository('Post')
      const skipAmount = parseInt(skipSize) * amount
      const postList = repository.find({ where: { archived_at: IsNull() }, take : amount, skip: skipAmount })

      return postList
    }

    public async getAmountPosts(): Promise<number> {
      const repository = await DatabaseConnector.getRepository('Post')

      return await repository.count()
    }

    public async getOwnedPosts(profile: Profile): Promise<Post[]> {
      const repository = await DatabaseConnector.getRepository('Post')
      const postList = await repository.find({
        where: { profile: profile, archived_at: IsNull() },
        relations: ['profile']
      })

      return postList
    }

    public async getPostByPath(path: string): Promise<Post> {
      const repository = await DatabaseConnector.getRepository('Post')
      const foundPost = await repository.findOne({
        where: { path: path, archived_at: IsNull() },
        relations: ['profile']
      })

      if (!foundPost) return foundPost

      const profileRepository = await DatabaseConnector.getRepository('Profile')
      const foundProfile = await profileRepository.findOne({
        where: { id: foundPost.profile.id },
        relations: ['avatar_attachment', 'title']
      })

      if (foundProfile) {
        foundPost.profile.avatar_attachment = foundProfile.avatar_attachment ?
          foundProfile.avatar_attachment.path : null
        foundPost.profile.title = foundProfile.title ? foundProfile.title.name : null
      }

      return foundPost
    }

    public async createPost(newPost: Post): Promise<any> {
      const repository = await DatabaseConnector.getRepository('Post')

      return repository.save(newPost)
    }

    public async updatePost(post: Post): Promise<any> {
      const repository = await DatabaseConnector.getRepository('Post')
      const newPost = await repository.save(post)

      return newPost
    }

    public async likePost(like: PostLike): Promise<any> {
      const repository = await DatabaseConnector.getRepository('PostLike')

      return await repository.save(like)
    }

    public async unlikePost(like: PostLike): Promise<any> {
      const repository = await DatabaseConnector.getRepository('PostLike')

      return await repository.delete(like)
    }

    public async getPostLikesById(id: number): Promise<any> {
      if (!id) return null
      const repository = await DatabaseConnector.getRepository('PostLike')

      // TODO add profile.banner_attachment
      return await repository.find({
        where: { post: id },
        relations: ['post', 'profile', 'profile.avatar_attachment', 'profile.title']
      })
    }

    public async getRecentUserLikesByProfileId(profileId: number, limit: number): Promise<any> {
      if (!profileId)
        return null

      const repository = await DatabaseConnector.getRepository('PostLike')
      const likes = await repository.find({
        where: { profile: profileId },
        relations: ['post', 'profile'],
        take: limit
      })

      if (!likes || likes.length <= 0) return

      return likes.sort((like1, like2) => {
        return like2.liked_at - like1.liked_at
      })
    }

    public async findLikeByPostAndProfile(post: Post, profile: Profile): Promise<any> {
      if (!profile || !post)
        return false

      const repository = await DatabaseConnector.getRepository('PostLike')

      return await repository.findOne({ where: { post: post.id, profile: profile.id }, relations: ['post', 'profile'] })
    }

    public async addViewToPost(postView: PostView): Promise<any> {
      const repository = await DatabaseConnector.getRepository(this.postViewRepository)

      const result = await repository.save(postView).catch(() => {
        return { error: 'already_viewed' }
      })

      return result
    }

    public async getPostViewCount(post: Post): Promise<any> {
      const repository = await DatabaseConnector.getRepository(this.postViewRepository)
      const viewCount = await repository.count({ where: { post: post } })

      return viewCount
    }
}

export default PostDAO
