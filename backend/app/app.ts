import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import serverConstructor from './serverConstructor'
import PostRoutes from './routes/postRoutes'
import AuthorizationRoutes from './routes/authenticationRoutes'
import CommentRoutes from './routes/commentRoutes'
import ProfileRoutes from './routes/profileRoutes'
import RoleRoutes from './routes/roleRoute'
import AdminRoutes from './routes/banRoutes'
const cookieParser = require('cookie-parser')

const { FRONTEND_URL, PORT } = process.env

const backend = new serverConstructor({
    port: parseInt(PORT),
    routes: [
        new PostRoutes(),
        new AuthorizationRoutes(),
        new CommentRoutes(),
        new ProfileRoutes(),
        new RoleRoutes(),
        new AdminRoutes()
    ],
    middleWares: [
        cookieParser(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors({
            origin: [FRONTEND_URL],
            credentials: true
        }),
    ]
})

export default backend
