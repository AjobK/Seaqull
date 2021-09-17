import * as express from 'express'
import BanController from '../controllers/banController'
import RouterBase from '../interfaces/RouterBase'

const auth = require('../middlewares/isAuth.ts')
const hasPermission = require('../middlewares/hasPermission.ts')

class BanRoutes implements RouterBase {
    public ban = '/ban'
    public shortBan = '/shortBan'
    public router = express.Router()
    private banController: BanController

    constructor() {
      this.banController = new BanController()

      this.initRoutes()
    }

    public initRoutes(): void {
      this.router.patch(this.ban, auth, hasPermission('BAN_USERS'), this.banController.longBanUser)
      this.router.patch(this.shortBan, auth, hasPermission('SHORT_BAN_USERS'), this.banController.shortBanUser)
    }
}

export default BanRoutes
