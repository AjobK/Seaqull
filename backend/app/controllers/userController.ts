import ControllerBase from '../interfaces/ControllerBase';
import * as express from 'express';
import UserService from '../service/userService';
const passport = require('passport');

require('../util/passport')(passport);

class UserController implements ControllerBase{
    public profile = '/profile/:username?'
    public register = '/profile/register'
    public router = express.Router()
    private profileService: UserService

    constructor(){
        this.profileService = new UserService();
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post(this.register, this.profileService.register);
        this.router.get (this.profile, this.profileService.getProfile);
    }
}
export default UserController;