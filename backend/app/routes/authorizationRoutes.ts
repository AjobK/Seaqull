import * as express from 'express'
import RoutesBase from '../interfaces/RoutesBase'
import authorizationService from '../controller/authorizationController'

class AuthorizationController implements RoutesBase {
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