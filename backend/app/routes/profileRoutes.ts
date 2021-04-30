import * as express from 'express'
import ProfileController from '../controller/profileController'
import RoutesBase from '../interfaces/RoutesBase'
import FileService from '../service/fileService'


const auth = require('../middleware/isAuth.ts')

class ProfileRoutes implements RoutesBase {
    public profile = '/profile/:username?'
    public register = '/profile/register'
    public profilePicture = '/profile/picture'
    public router = express.Router()
    private profileController: ProfileController
    private upload

    constructor(){
        this.profileController = new ProfileController()
        this.upload = new FileService().getUpload()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.post(this.register, this.profileController.register)
        this.router.put(this.profilePicture, this.upload.single('file'), this.profileController.updateProfilePicture)
        this.router.put(this.profile, auth, this.profileController.updateProfile)
        this.router.get (this.profile, this.profileController.getProfile)
    }
}
export default ProfileRoutes