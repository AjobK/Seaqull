import { Request, Response } from 'express';
import PostDao from '../dao/postDao';

class PostService {
    private dao: PostDao;

    constructor() {
        this.dao = new PostDao();
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        const posts = await this.dao.getPosts();
        res.status(200);
        res.json(posts);
        return res;
    }
}
export default PostService;