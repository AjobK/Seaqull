import * as express from 'express'
import { Application } from 'express'
import * as http from 'http'

class serverConstructor {
    public app: Application
    public server: http.Server
    public port: number

    constructor(appInit: { port: number; middleWares: any; routes: any; }) {
        this.app = express()
        this.port = appInit.port
        this.middlewares(appInit.middleWares)
        this.routes(appInit.routes)
        this.listen()
    }
    private middlewares(middleWares) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }
    private routes(controllers) {
        controllers.forEach(controller => {
            this.app.use('/api/', controller.router)
        })
    }
    public listen(): void {
        this.server = this.app.listen(this.port, () => {
            console.log(`App listening on http://localhost:${this.port}`)
        })
    }
}

export default serverConstructor