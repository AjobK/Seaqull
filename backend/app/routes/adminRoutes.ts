import * as express from 'express'
import AdminController from '../controllers/adminController'
import RouterBase from '../interfaces/RouterBase'

const auth = require('../middlewares/isAuth.ts')
const hasPermission = require('../middlewares/hasPermission.ts')

class AdminRoutes implements RouterBase {
    public ban = '/ban'
    public router = express.Router()
    private adminController: AdminController

    constructor() {
        this.adminController = new AdminController()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.patch(this.ban, auth, hasPermission('BAN_USERS'), this.adminController.tempBanUser)
    }
}

export default AdminRoutes
