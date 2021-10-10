import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')

chai.use(chaiHttp)

describe('testing retrieving and updating the update informatioin', () => {
  const agent = chai.request.agent('http://localhost:8000/api')

  it('Login so we can test the profile page', (done) => {
    agent
      .post('/login')
      .send({
        username: 'User',
        password: 'Qwerty123'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('updating user', (done) => {
    agent
      .put('/profile/User')
      .send({
        username: 'User',
        description: 'update user'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('checking if the description is updated', (done) => {
    agent
      .get('/profile/User')
      .end((err, res) => {
        assert.equal(res.body.profile.description, 'update user')
        done()
      })
  })

  it('checking followers', (done) => {
    agent
      .get('/profile/User/followers')
      .end((err, res) => {
        console.log(res)
        //assert.equal(res.body.description, 'update user')
        done()
      })
  })
})
