import { Request, Response } from 'express'
import RoleDAO from '../daos/roleDAO'

class RoleController {
  private dao: RoleDAO

  constructor() {
    this.dao = new RoleDAO()
  }

  public getRoles = async (req: Request, res: Response): Promise<Response> => {
    const roles = await this.dao.getRoles()

    if (roles) {
      return res.status(200).json(roles)
    }

    return res.status(404).json({ message: 'No roles found.' })
  }

  public getRole = async (req: any, res: Response): Promise<Response> => {
    const role = await this.dao.getRoleById(req.decoded.role)

    return res.status(200).json(role)
  }
}

export default RoleController
