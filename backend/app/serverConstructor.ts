import * as express from 'express'
import { Express } from 'express'
import * as http from 'http'
import * as expressOasGenerator from 'express-oas-generator'
import { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator'

class serverConstructor {
    public app: Express
    public server: http.Server
    public port: number

    constructor(appInit: { port: number; middleWares: any; routes: any; }) {
      this.app = express()
      this.swagger()
      this.port = appInit.port
      this.middlewares(appInit.middleWares)
      this.routes(appInit.routes)
      this.app.set('trust proxy', true)
      expressOasGenerator.handleRequests()
      this.listen()
    }

    private middlewares(middleWares) {
      middleWares.forEach((middleWare) => {
        this.app.use(middleWare)
      })
      this.app.use(express.static(__dirname + '/public'))

    }

    private routes(controllers) {
      controllers.forEach((controller) => {
        this.app.use('/api/', controller.router)
      })
    }

    private swagger() {
      expressOasGenerator.handleResponses(this.app, {
        swaggerUiServePath: 'swagger',
        specOutputPath: null,
        predefinedSpec: function(spec) { return spec },
        specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
        swaggerDocumentOptions: null
      })
    }

    public listen(): void {
      this.server = this.app.listen(this.port, () => {
        console.log(`App listening on http://localhost:${this.port}`)

        if (process.env.NODE_ENV === 'development') {
          console.log(`Documentation available on http://localhost:${this.port}/swagger`)
        }

      })

    }
}

export default serverConstructor
