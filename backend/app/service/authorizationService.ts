/* eslint-disable indent */
import { Request, Response } from 'express';
import accountDao from '../dao/accountDao';
const jwt = require('jsonwebtoken');
const expirationtimeInMs = process.env.JWT_EXPIRATION_TIME;
import * as bcrypt from 'bcrypt';
import { account } from '../entity/account';

require('dotenv').config();
const { SECURE } = process.env;

class PostService {
    private accountDao: accountDao;

    constructor() {
        this.accountDao = new accountDao();
    }

    // main function user login
    public login = async (req: Request, res: Response): Promise<any> => {
        // extracting username and password from request body
        const { username, password } = req.body;

        // check if user filled in a password and username
        if (typeof username != 'string' || typeof username != 'string') return res.status(400).json({ loggedIn: false });

        // getting account from database
        let account = await this.accountDao.getUserByUsername(username);

        // check if account is locked if so return remaining wait time
        if(account.locked_to - Date.now() > 0){
            return res.status(400).send({
                error: ['cannot login yet'],
                remainingTime:  Math.floor((account.locked_to - Date.now())/1000)
            });
        }else {
            // check if username and password are correct if not return error
            const validation = this.validateAccountRequest(account,username,password);
            if(validation != null){
                return res.status(400).send(validation);
            }

            // creating payload for token
            const payload = {
                username: username,
                expiration: Date.now() + parseInt(expirationtimeInMs)
            };

            // creating token
            const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

            // remove unnecessary data
            account = this.cleanAccount(account);

            // set cookie header
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; ${ SECURE == 'true' ? 'Secure;' : '' } expires=${+new Date(new Date().getTime()+86409000).toUTCString()}; path=/`);
            res.status(200).json({
                user: account
            });
            res.send();
        }
    }

    private validateAccountRequest = (account: account, username, password): any => {
        try {
            // check username
            if (username === account.user_name) {
                //check password
                if (!bcrypt.compareSync(password, account.password)){
                    // check if the user attempted more then 3 logins
                    if(account.login_attempts_counts != 2){
                        account.login_attempts_counts++;
                        this.accountDao.updateAccount(account);
                        return { error: ['Incorrect username or password'] };
                    } else {
                        // lock account for 30 seconds
                        account.login_attempts_counts = null;
                        account.locked_to = Date.now()+30000;
                        this.accountDao.updateAccount(account);
                        return { error: ['Tried to many times to login'], remainingTime:  (account.locked_to - Date.now())/1000 };
                    }
                } else {
                    // if login is successful we return null
                    return null;
                }
            } else {
                return { error: ['Incorrect username or password'] };
            }
        } catch (error) {
            return { error: ['Incorrect username or password'] };
        }
    }

    // function removes all unnecessary data
    private cleanAccount = (account: account): account => {
        delete account.password;
        delete account.changed_pw_at;
        delete account.login_attempts_counts;
        delete account.last_ip;
        delete account.locked_to;

        return account;
    }

    // function user for logout
    public logout = (req: Request, res: Response): void => {
        // if cookie is there remove it
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