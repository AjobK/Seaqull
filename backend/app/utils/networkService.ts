import { Request } from 'express'
class NetworkService {
    public static getUserIp(req: Request): string {
        const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        null;

        return ip[0]
    }
}

export default NetworkService