import * as express from 'express'
import RouterBase from '../interfaces/RouterBase'
import AuthController from '../controllers/authController'

class AuthorizationRoutes implements RouterBase {
    public login = '/login'
    public loginVerify = '/login-verify'
    public logout = '/logout'
    public router = express.Router()
    private authController: AuthController

    constructor() {
      this.authController = new AuthController()

      this.initRoutes()
    }

    public initRoutes(): void {
      this.router.get(this.loginVerify, this.authController.loginVerify)
      this.router.post(this.login, this.authController.login)
      this.router.get(this.logout, this.authController.logout)
    }
}

export default AuthorizationRoutes
