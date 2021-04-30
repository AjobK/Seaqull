import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import PostController from './routes/postRoutes'
import serverConstructor from './serverConstructor'
import AuthorizationController from './routes/authorizationRoutes'
import ProfileController from './routes/profileRoutes'
const cookieParser = require('cookie-parser')

const { FRONTEND_URL } = process.env

const backend = new serverConstructor({
    port: 8000,
    controllers: [
        new PostController(),
        new AuthorizationController(),
        new ProfileController()
    ],
    middleWares: [
        cookieParser(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors({
            origin: [FRONTEND_URL, 'http://localhost:8080', 'http://localhost:3000'],
            credentials: true
        }),
    ]
})

export default backend