import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'

chai.use(chaiHttp)

describe('Testing banning a user', () => {
  const agent = chai.request.agent('http://localhost:8000/api')
  const userToShortBan = uuidv4()
  const userToLongBan = uuidv4()

  it('Should create a user so we can ban him', (done) => {
    agent
      .post('/profile/register')
      .send({
        username: userToShortBan,
        password: 'Qwerty123',
        email: userToShortBan + '@test.com'
      })
      .end(() => {
        agent
          .get('/profile/' + userToShortBan)
          .end((err, res) => {
            assert.equal(res.status, 200)
            done()
          })
      }

      )
  })

  it('Souldn\'t ban a user as a user', (done) => {
    agent
      .post('/login')
      .send({
        username: 'User',
        password: 'Qwerty123'
      })
      .end(() => {
        agent
          .patch('/shortBan')
          .send({
            username: userToShortBan,
            days: '10',
            reason: 'being offensive'
          })
          .end((err, res) => {
            assert.equal(res.status, 401)
            done()
          })
      })
  })

  it('Shouldn\'t long ban users as admin', (done) => {
    agent
      .post('/login')
      .send({
        username: 'Moderator',
        password: 'Qwerty123'
      })
      .end(() => {
        agent
          .patch('/ban')
          .send({
            username: userToLongBan,
            days: '35',
            reason: 'being offensive'
          })
          .end((err, res) => {
            assert.equal(res.status, 401)
            done()
          })
      })
  })

  it('Should short ban a user', (done) => {
    agent
      .patch('/shortBan')
      .send({
        username: userToShortBan,
        days: '10',
        reason: 'being offensive'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)

        agent
          .get('/profile/' + userToShortBan)
          .end((err, res) => {
            assert.equal(res.status, 403)
            done()
          })
      })
  })

  it('Should create a user so we can ban him', (done) => {
    agent
      .post('/profile/register')
      .send({
        username: userToLongBan,
        password: 'Qwerty123',
        email: userToLongBan + '@test.com'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Should long term ban a user as admin', (done) => {
    agent
      .post('/login')
      .send({
        username: 'Admin',
        password: 'Qwerty123'
      })
      .end(() => {
        agent
          .patch('/ban')
          .send({
            username: userToLongBan,
            days: '35',
            reason: 'being offensive'
          })
          .end(() => {
            agent
              .get('/profile/' + userToLongBan)
              .end((err, res) => {
                assert.equal(res.status, 403)
                done()
              })
          })
      })
  })
})
