import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import serverConstructor from './serverConstructor'
import PostRoutes from './routes/postRoutes'
import AuthorizationRoutes from './routes/authorizationRoutes'
import CommentRoutes from './routes/commentRoutes'
import ProfileRoutes from './routes/profileRoutes'
import RoleRoutes from './routes/roleRoute'
import AdminRoutes from './routes/banRoutes'
import HealthRoutes from './routes/healthRoutes'

const cookieParser = require('cookie-parser')

require('dotenv').config()

const { FRONTEND_URL } = process.env
const LOCALHOST = 'http://localhost'

const backend = new serverConstructor({
  port: 8000,
  routes: [
    new HealthRoutes(),
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
      origin: [
        FRONTEND_URL,
        LOCALHOST,
        LOCALHOST + ':8080',
        LOCALHOST + ':3000'
      ],
      credentials: true
    }),
  ]
})

export default backend
