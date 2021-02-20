import { Request, Response } from 'express';
import PostDAO from '../dao/postDAO';

class PostService {
    private dao: PostDAO;

    constructor() {
        this.dao = new PostDAO();
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        const posts = await this.dao.getPosts();

        return res.status(200).json(posts);
    }

    public createPost = async (req: Request, res: Response): Promise<Response> => {
        await this.dao.createPost();

        return res;
    }
}
export default PostService;