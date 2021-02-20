/* eslint-disable indent */
import { Request, Response } from 'express';
import accountDao from '../dao/accountDao';
const jwt = require('jsonwebtoken');
const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME;
import * as bcrypt from 'bcrypt';

require('dotenv').config();

class PostService {
    private accountDao: accountDao;

    constructor() {
        this.accountDao = new accountDao();
    }

    public login = async (req: Request, res: Response): Promise<any> => {
        const { username, password } = req.body;

        if (typeof username != 'string') return res.status(400).json({ loggedIn: false });

        const account = await this.accountDao.getUserByUsername(username);
        try {
            if (username === account.user_name) {
                if (!bcrypt.compareSync(password, account.password)){
                    res.status(400);
                    return res.json({
                        error: 'Incorrect username or password'
                    });
                }
            } else {
                return res.status(400).json({
                    error: 'Incorrect username or password'
                });
            }
        } catch (error) {
            return res.status(500).json({ error });
        }

        const payload = {
            username: username,
            expiration: Date.now() + parseInt(expirationtimeInMs)
        };

        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

        return res
        .cookie('jwt',
            token, {
                httpOnly: true,
                secure: false //--> SET TO TRUE ON PRODUCTION
            }
        )
        .status(200)
        .json({ 'message': 'Login successful'});
    }

    public logout = (req: Request, res: Response): void => {
        if (req.cookies['jwt']) {
            res
            .clearCookie('jwt')
            .status(200)
            .json({
                message: 'You have logged out'
            });
        } else {
            res.status(401).json({
                error: 'Invalid jwt'
            });
        }
    }
}
export default PostService;