import { Request, Response } from 'express';
import TitleDAO from '../dao/titleDao';
import UserDao from '../dao/userDao';
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('../util/passport')(passport);

class UserService {
    private dao: UserDao;
    private titleDAO: TitleDAO;

    constructor() {
        this.dao = new UserDao();
        this.titleDAO = new TitleDAO();
    }

    public getProfile = async (req: Request, res: Response): Promise<Response> => {
        // extracting token
        const { token } = req.cookies;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // getting username from parameters
        let username = req.params.username;

        // check if username is precent in the paramenters
        if(!username){
            // check if a username is present in payload
            console.log(!decodedToken.username);
            if(decodedToken.username){
                // if there is no username in params then use one in the jwt
                username = decodedToken.username;
            } else {
                // no username was found in payload nor was it found in the params
                return res.status(404).json({ error: 'No username was given' });
            }
        }

        // get user with username
        const user = await this.dao.getUserByUsername(decodedToken.username);
        // get users title
        const title = await this.titleDAO.getTitleById(user.title_id);

        // creating payload
        const payload = {
            isOwner: false,
            username: username,
            experience: user.experience,
            title: title,
            posts: ''
        };

        // check if user is the owner
        if(decodedToken.username == username) {
            // check if jwt is valid
            passport.authenticate('jwt', { session: false });
            // set owner in payload
            payload.isOwner = true;
        }

        res.status(200);
        res.json({ 'profile': payload });
        return res;
    }
}
export default UserService;