import { Request } from 'express'
class NetworkService {
    public static getUserIp(req: Request): string {
        const ip = req.ip ||
        req.socket.remoteAddress
        null;

        return ip.toString()
    }
}

export default NetworkService