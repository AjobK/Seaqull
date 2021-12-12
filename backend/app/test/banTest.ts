import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'

require('dotenv').config()

const captcha = process.env.HCAPTCHA_TEST_TOKEN

chai.use(chaiHttp)

describe('Ban functionality', () => {
  const agent = chai.request.agent('http://localhost:8000/api')

  const shortBannedUser = uuidv4()
  const longBannedUser = uuidv4()

  before((done) => {
    agent
      .post('/profile/register')
      .send({
        username: shortBannedUser,
        password: 'Qwerty123',
        email: `${shortBannedUser}@test.com`,
        captcha
      })
      .end()

    agent
      .post('/profile/register')
      .send({
        username: longBannedUser,
        password: 'Qwerty123',
        email: `${longBannedUser}@test.com`,
        captcha
      })
      .end(() => {
        done()
      })
  })

  describe('Testing banning a user as user', () => {
    before((done) => {
      agent
        .post('/login')
        .send({
          username: 'User',
          password: 'Qwerty123',
          captcha
        })
        .end(() => {
          done()
        })
    })

    it('Shouldn\'t ban a user as a user', (done) => {
      agent
        .patch('/shortBan')
        .send({
          username: shortBannedUser,
          days: 10,
          reason: 'being offensive'
        })
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })
  })

  describe('Testing banning a user as modarator', () => {
    before((done) => {
      agent
        .post('/login')
        .send({
          username: 'Moderator',
          password: 'Qwerty123',
          captcha
        })
        .end(() => {
          done()
        })
    })

    it('Shouldn\'t longterm ban a user as a moderator', (done) => {
      agent
        .patch('/ban')
        .send({
          username: longBannedUser,
          days: 35,
          reason: 'being offensive'
        })
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })

    it('Should short ban a user', (done) => {
      agent
        .patch('/shortBan')
        .send({
          username: shortBannedUser,
          days: 10,
          reason: 'being offensive'
        })
        .end((err, res) => {
          assert.equal(res.status, 200)

          agent
            .get(`/profile/${shortBannedUser}`)
            .end((err, res) => {
              assert.equal(res.status, 403)
              done()
            })
        })
    })
  })

  describe('Testing banning a user as admin', () => {
    before((done) => {
      agent
        .post('/login')
        .send({
          username: 'Admin',
          password: 'Qwerty123',
          captcha
        })
        .end(() => {
          done()
        })
    })

    it('Should long term ban a user as admin', (done) => {
      agent
        .patch('/ban')
        .send({
          username: longBannedUser,
          days: 35,
          reason: 'being offensive'
        })
        .end(() => {
          agent
            .get(`/profile/'${longBannedUser}`)
            .end((err, res) => {
              assert.equal(res.status, 404)
              done()
            })
        })
    })
  })
})
