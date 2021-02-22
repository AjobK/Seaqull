import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import PostController from './controllers/postController';
import serverConstructor from './serverConstructor';
import AuthorizationController from './controllers/authorizationController';
import UserController from './controllers/userController';
const cookieParser = require('cookie-parser');

const { FRONTEND_URL } = process.env;

const backend = new serverConstructor({
    port: 8000,
    controllers: [
        new PostController(),
        new AuthorizationController(),
        new UserController()
    ],
    middleWares: [
        cookieParser(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors({
            origin: [FRONTEND_URL, 'http://localhost:8080'],
            credentials: true
        }),
    ]
});

export default backend;