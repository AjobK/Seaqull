import chai = require('chai')
import chaiHttp = require('chai-http')

const port = process.env.PORT
const captcha = process.env.HCAPTCHA_TEST_TOKEN

chai.use(chaiHttp)

class GuestAgentStore {
    public static getGuestAgent = chai.request.agent('http://localhost:' + port + '/api')
    public initalised = false

    getStore() {
      GuestAgentStore.getGuestAgent
        .post('/login')
        .send({
          username: 'Moderator',
          password: 'Qwerty123',
          captcha
        })
    }
}

class UserAgentStore {
    public static getUserAgent = chai.request.agent('http://localhost:' + port + '/api')

}

class ModeratorAgentStore {
    public static getModAgent = chai.request.agent('http://localhost:' + port + '/api')

}

class AdminAgentStore {
    public static getAdminAgent = chai.request.agent('http://localhost:' + port + '/api')

}
