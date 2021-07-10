import * as express from 'express'
import RouterBase from '../interfaces/RouterBase'

class AdminRoutes implements RouterBase {
    public ban = '/ban'
    public router = express.Router()
    private authController: AuthorizationController

    constructor() {
        this.authController = new AuthorizationController()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.patch(this.ban, this.authController.loginVerify)
    }
}

export default AuthorizationRoutes
