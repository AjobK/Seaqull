import chai = require('chai')
import chaiHttp = require('chai-http')

const port = process.env.PORT
const captcha = process.env.HCAPTCHA_TEST_TOKEN
const url = process.env.BACKEND_TEST_URL

chai.use(chaiHttp)

export class GuestAgentStore {
    public static agent = chai.request.agent(url)
}

export class UserAgentStore {
    public static agent = chai.request.agent(url)
    private static initalised = false

    static initAgent (): void {
      if (!UserAgentStore.initalised) {
        UserAgentStore.agent
          .post('/login')
          .send({
            username: 'User',
            password: 'Qwerty123',
            captcha
          }).end(() => {
            UserAgentStore.initalised = true
          })
      }
    }
}

export class ModAgentStore {
    public static agent = chai.request.agent(url)
    private static initalised = false

    static initAgent (): void {
      if (!ModAgentStore.initalised) {
        ModAgentStore.agent
          .post('/login')
          .send({
            username: 'Moderator',
            password: 'Qwerty123',
            captcha
          }).end(() => {
            ModAgentStore.initalised = true
          })
      }
    }
}

export class AdminAgentStore {
    public static agent = chai.request.agent('http://localhost:' + port + '/api')
    private static initalised = false

    static initAgent (): void {
      if (!AdminAgentStore.initalised) {
        AdminAgentStore.agent
          .post('/login')
          .send({
            username: 'Admin',
            password: 'Qwerty123',
            captcha
          }).end(() => {
            AdminAgentStore.initalised = true
          })
      }
    }
}
