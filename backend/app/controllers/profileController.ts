import * as express from 'express'
import ProfileService from '../service/profileService'
import ControllerBase from '../interfaces/ControllerBase'

const auth = require('../middleware/isAuth.ts')

class ProfileController implements ControllerBase{
    public profile = '/profile/:username?'
    public register = '/profile/register'
    public router = express.Router()
    private profileService: ProfileService

    constructor(){
        this.profileService = new ProfileService()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.post(this.register, this.profileService.register)
        this.router.put(this.profile, auth, this.profileService.updateProfile)
        this.router.get (this.profile, this.profileService.getProfile)
    }
}
export default ProfileController