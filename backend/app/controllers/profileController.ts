import ControllerBase from '../interfaces/ControllerBase'
import * as express from 'express'
import ProfileService from '../service/profileService'

class profileController implements ControllerBase{
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
        this.router.get (this.profile, this.profileService.getProfile)
    }
}
export default profileController