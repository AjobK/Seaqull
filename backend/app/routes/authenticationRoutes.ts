import * as express from 'express'
import RouterBase from '../interfaces/RouterBase'
import AuthorizationController from '../controllers/authenticationController'

class AuthorizationRoutes implements RouterBase {
    public login = '/login'
    public loginVerify = '/login-verify'
    public logout = '/logout'
    public router = express.Router()
    private authController: AuthorizationController

    constructor() {
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
