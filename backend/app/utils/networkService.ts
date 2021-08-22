import { Request } from 'express'
class NetworkService {
    public static getUserIp(req: Request): string {
        // const ip = (req.headers['x-forwarded-for'])?.toString().split(',').pop().trim() ||
        // req.socket.remoteAddress
        // null;

        const ip = req.ip ||
        req.socket.remoteAddress
        null;

        console.log(req.ip)

        return ip.toString()
    }
}

export default NetworkService