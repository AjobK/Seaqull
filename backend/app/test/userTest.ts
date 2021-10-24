import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'

chai.use(chaiHttp)

describe('Testing the login/register', () => {
  const id = uuidv4()
  const agent = chai.request.agent('http://localhost:8000/api')

  it('Shouldn\'t register user because no numbers are present in the password', (done) => {
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

  it('Shouldn\'t register user because no capitol are present in the password', (done) => {
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

  it('Shouldn\'t register user because the user already exists', (done) => {
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

  it('Should create a new user', (done) => {
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

  it('Shouln\'t login because username and password are incorrect', (done) => {
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

  it('Should login', (done) => {
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

  it('Should verify the user is logged in', (done) => {
    agent
      .get('/login-verify')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Should logout user', (done) => {
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
