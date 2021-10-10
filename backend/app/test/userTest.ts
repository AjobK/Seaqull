import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'

chai.use(chaiHttp)

describe('user login and register test', () => {
  const id = uuidv4()
  const agent = chai.request.agent('http://localhost:8000/api')

  it('Check to see if you can create a new user when no number was included in the password', (done) => {
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

  it('Check to see if you can create a new user when no uppercase character was used', (done) => {
    agent
      .post('/profile/register')
      .send({
        username: 'test' + id,
        password: 'qwerty123',
        email: id + '@test.com'
      })
      .end((err, res) => {
        assert.equal(res.status, 401)
        done()
      })
  })

  it('Check if you can create a new user when the user already exists', (done) => {
    agent
      .post('/profile/register')
      .send({
        username: 'User',
        password: 'Qwerty123',
        email: id + '@test.com'
      })
      .end((err, res) => {
        assert.equal(res.body.errors.username, 'Username not available')
        done()
      })
  })

  it('Check if you can create a new user when the input value is valid', (done) => {
    agent
      .post('/profile/register')
      .send({
        username: 'test' + id,
        password: '123Qwerty',
        email: id + '@test.com'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Check if you can login when data is invalid', (done) => {
    agent
      .post('/login')
      .send({
        username: 'user',
        password: 'qwerty123'
      })
      .end((err, res) => {
        assert.equal(res.status, 403)
        done()
      })
  })

  it('Check if you can login because data is valid', (done) => {
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

  it('Check if you can verify a user is logged in', (done) => {
    agent
      .get('/login-verify')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Check if a user can logout', (done) => {
    agent
      .get('/logout')
      .end((err, res) => {
        assert.equal(res.status, 200)

        agent
          .get('/login-verify')
          .end((err, res) => {
            assert.equal(res.status, 401)
          })
        done()
      })
  })
})
