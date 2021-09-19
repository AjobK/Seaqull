import * as express from 'express'
import RouterBase from '../interfaces/RouterBase'
import AuthenticationController from '../controllers/authenticationController'

class AuthenticationRoutes implements RouterBase {
    public login = '/login'
    public loginVerify = '/login-verify'
    public logout = '/logout'
    public router = express.Router()
    private authController: AuthenticationController

    constructor() {
      this.authController = new AuthenticationController()
      this.initRoutes()
    }

    public initRoutes(): void {
      this.router.get(this.loginVerify, this.authController.loginVerify)
      this.router.post(this.login, this.authController.login)
      this.router.get(this.logout, this.authController.logout)
    }
}

export default AuthenticationRoutes
