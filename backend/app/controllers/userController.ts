import ControllerBase from '../interfaces/ControllerBase';
import * as express from 'express';
import UserService from '../service/userService';
const passport = require('passport');

require('../util/passport')(passport);

class UserController implements ControllerBase{
    public profile = '/profile/:username'
    public router = express.Router()
    private profileService: UserService

    constructor(){
        this.profileService = new UserService();
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.get (this.profile,
            //passport.authenticate('jwt', { session: false }),
            this.profileService.getProfile);
    }
}
export default UserController;