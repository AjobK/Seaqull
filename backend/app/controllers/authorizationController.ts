import ControllerBase from '../interfaces/ControllerBase';
import * as express from 'express';
import authorizationService from '../service/authorizationService';

class AuthorizationController implements ControllerBase{
    public login = '/login';
    public logout = '/logout';
    public router = express.Router();
    private authService: authorizationService;

    constructor(){
        this.authService = new authorizationService();
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post(this.login, this.authService.login);
        this.router.get(this.logout, this.authService.logout);
    }
}
export default AuthorizationController;