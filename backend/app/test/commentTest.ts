import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'

chai.use(chaiHttp)

describe('user login and register test', () => {
  const id = uuidv4()
  const agent = chai.request.agent('http://localhost:8000/api')

  it('Shouldn\'t create a new user because no number was included in the password', (done) => {
    agent
      .post('/profile/register')
      .send({
        username: 'test' + id,
        password: 'Qwerty',
        email: id + '@test.com'
      })
      .end((err, res) => {
        assert.equal(res.status, 401)
        done()
      })
  })
})
