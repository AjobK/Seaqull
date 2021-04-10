import * as express from 'express'
import ProfileService from '../service/profileService'
import RoutesBase from '../interfaces/ControllerBase'

const auth = require('../middleware/isAuth.ts')

class ProfileRoutes implements RoutesBase {
    public profile = '/profile/:username?'
    public register = '/profile/register'
    public follow = '/profile/follow/:username?'
    public router = express.Router()
    private profileService: ProfileService

    constructor(){
        this.profileService = new ProfileService()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.post(this.register, this.profileService.register)
        this.router.put(this.profile, auth, this.profileService.updateProfile)
        this.router.get(this.profile, this.profileService.getProfile)
        this.router.post(this.follow, this.profileService.follow)
    }
}
export default ProfileRoutes