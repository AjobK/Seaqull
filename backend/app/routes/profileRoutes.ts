import * as express from 'express'
import ProfileController from '../controllers/profileController'
import RoutesBase from '../interfaces/ControllerBase'

const auth = require('../middleware/isAuth.ts')

class ProfileRoutes implements RoutesBase {
    public profile = '/profile/:username?'
    public register = '/profile/register'
    public router = express.Router()
    public follow = '/profile/follow/:username?'
    private profileController: ProfileController

    constructor(){
        this.profileController = new ProfileController()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.post(this.register, this.profileController.register)
        this.router.put(this.profile, auth, this.profileController.updateProfile)
        this.router.get (this.profile, this.profileController.getProfile)
        this.router.post(this.follow, this.profileController.follow)
    }
}
export default ProfileRoutes