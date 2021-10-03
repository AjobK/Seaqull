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

  it('Shouldn\'t create a new user because no uppercase character was used', (done) => {
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

  it('Shouldn\'t create a new user because the user already exists', (done) => {
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

  it('Should create a new user because the input value is valid', (done) => {
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

  it('Shouldn\'t login because data is invalid', (done) => {
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

  it('Should login because data is valid', (done) => {
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

  it('Should be able to verify a user is logged', (done) => {
    agent
      .get('/login-verify')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Should logout a user', (done) => {
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
