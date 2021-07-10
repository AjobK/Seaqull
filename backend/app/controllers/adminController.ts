import { Request, Response } from 'express'

class AdminController {

    constructor() {
        console.log('created admin')
    }

    public banUser = async (req: Request, res: Response): Promise<Response> => {

        return res.status(200)
    }
}

export default AdminController
