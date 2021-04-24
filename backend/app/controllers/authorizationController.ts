import * as express from 'express'
import ControllerBase from '../interfaces/ControllerBase'
import authorizationService from '../service/authorizationService'

class AuthorizationController implements ControllerBase {
    public login = '/login'
    public loginVerify = '/login-verify'
    public logout = '/logout'
    public router = express.Router()
    private authService: authorizationService

    constructor(){
        this.authService = new authorizationService()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.get(this.loginVerify, this.authService.loginVerify)
        this.router.post(this.login, this.authService.login)
        this.router.get(this.logout, this.authService.logout)
    }
}
export default AuthorizationController