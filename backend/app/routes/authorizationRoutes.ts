import * as express from 'express'
import ControllerBase from '../interfaces/ControllerBase'
import AuthorizationController from '../controllers/authorizationController'

class AuthorizationRoutes implements ControllerBase {
    public login = '/login'
    public loginVerify = '/login-verify'
    public logout = '/logout'
    public router = express.Router()
    private authController: AuthorizationController

    constructor(){
        this.authController = new AuthorizationController()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.get(this.loginVerify, this.authController.loginVerify)
        this.router.post(this.login, this.authController.login)
        this.router.get(this.logout, this.authController.logout)
    }
}
export default AuthorizationRoutes