import * as express from 'express'
import AdminController from '../controllers/adminController'
import RouterBase from '../interfaces/RouterBase'

class AdminRoutes implements RouterBase {
    public ban = '/ban'
    public router = express.Router()
    private adminController: AdminController

    constructor() {
        this.adminController = new AdminController()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.patch(this.ban, this.adminController.banUser)
    }
}

export default AdminRoutes
