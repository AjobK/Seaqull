import { networkInterfaces } from 'os'

class NetworkService {
    public static getUserIp(): string {
        const ip = [].concat(...Object.values(networkInterfaces()))
            .filter(details => details.family === 'IPv4' && !details.internal)
            .pop().address

        return ip
    }
}

export default NetworkService