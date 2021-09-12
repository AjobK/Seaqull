import * as express from 'express'
import RoleController from '../controllers/roleController'
import RouterBase from '../interfaces/RouterBase'

const auth = require('../middlewares/isAuth.ts')

class RoleRoutes implements RouterBase {
    public route = '/role'
    public router = express.Router()
    public roleController: RoleController

    constructor() {
      this.roleController = new RoleController()
      this.initRoutes()
    }

    public initRoutes(): void {
      this.router.get (this.route, auth, this.roleController.getRole)
    }
}

export default RoleRoutes
