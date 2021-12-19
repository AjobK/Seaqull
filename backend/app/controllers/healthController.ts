/*
  This controller is exclusively meant for API health functions such as punt, uptime, etc.
*/
class HealthController {
  public getPong = async (_req: Request, res: Response | any): Promise<Response> => {
    return res.status(200).json({ message: 'Pong!' })
  }
}

export default HealthController
