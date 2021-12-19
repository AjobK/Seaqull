import * as express from 'express'
import RouterBase from '../interfaces/RouterBase'
import HealthController from '../controllers/healthController'

class HealthRoutes implements RouterBase {
    public prefix = '/health'
    public pingRoute = '/ping'
    public router = express.Router()
    private healthController: HealthController = new HealthController()

    constructor() {
      this.initRoutes()
    }

    public initRoutes(): void {
      this.router.get(`${this.prefix}${this.pingRoute}`, this.healthController.getPong)
    }
}

export default HealthRoutes
