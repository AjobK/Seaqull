import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'
import { GuestAgentStore } from './data/agents'

require('dotenv').config()

const captcha = process.env.HCAPTCHA_TEST_TOKEN

chai.use(chaiHttp)

describe('Testing the login/register', () => {
  const id = uuidv4()

  describe('Register tests', () => {
    it('Shouldn\'t register user because no numbers are present in the password', (done) => {
      GuestAgentStore.agent
        .post('/profile/register')
        .send({
          username: `test${id}`,
          password: 'Qwerty',
          email: id + '@test.com',
          captcha
        })
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })

    it('Shouldn\'t register user because no upper case characters are present in the password', (done) => {
      GuestAgentStore.agent
        .post('/profile/register')
        .send({
          username: `test${id}`,
          password: 'qwerty123',
          email: id + '@test.com',
          captcha
        })
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })

    it('Shouldn\'t register user because the user already exists', (done) => {
      GuestAgentStore.agent
        .post('/profile/register')
        .send({
          username: 'User',
          password: 'Qwerty123',
          email: id + '@test.com',
          captcha
        })
        .end((err, res) => {
          assert.equal(res.body.errors.username, 'Username not available')
          done()
        })
    })

    it('Should register a new user', (done) => {
      GuestAgentStore.agent
        .post('/profile/register')
        .send({
          username: `test${id}`,
          password: '123Qwerty',
          email: id + '@test.com',
          captcha
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
    })

    after(() => {
      GuestAgentStore.agent
        .get('/logout')
        .end()
    })
  })

  describe('Testing login functionalities', () => {
    it('Shouln\'t login with invalid username and password', (done) => {
      GuestAgentStore.agent
        .post('/login')
        .send({
          username: 'user',
          password: 'qwerty123',
          captcha
        })
        .end((err, res) => {
          assert.equal(res.status, 403)
          done()
        })
    })
  })
})
