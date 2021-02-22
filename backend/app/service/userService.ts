import { Request, Response } from 'express';
const url = require('url');
import UserDao from '../dao/userDao';

class UserService {
    private dao: UserDao;

    constructor() {
        this.dao = new UserDao();
    }

    public getProfile = async (req: Request, res: Response): Promise<Response> => {
        const username = url.parse(req.url,true);
        const profile = await this.dao.getUserByUsername(username);
        res.status(200);
        res.json(profile);
        return res;
    }
}
export default UserService;