import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'

chai.use(chaiHttp)

describe('Testing banning a user', () => {
  const agent = chai.request.agent('http://localhost:8000/api')
  const userToShortBan = uuidv4()
  const userToLongBan = uuidv4()

  it('Creating a user so we can ban him', (done) => {
    agent
      .post('/profile/register')
      .send({
        username: userToShortBan,
        password: 'Qwerty123',
        email: userToShortBan + '@test.com'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking if the profile loads correctly', (done) => {
    agent
      .get('/profile/' + userToShortBan)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Login as user so we cant test if banning is blocked correctly', (done) => {
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

  it('Checking is request is not allowed', (done) => {
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

  it('Loging in as moderator so we can shortban users', (done) => {
    agent
      .post('/login')
      .send({
        username: 'Moderator',
        password: 'Qwerty123'
      })
      .end((err, res) => {
        console.log(err)
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking if we cant ban users longterm', (done) => {
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

  it('Checking if we can ban users for a short time', (done) => {
    agent
      .patch('/shortBan')
      .send({
        username: userToShortBan,
        days: '10',
        reason: 'being offensive'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking if the profile can not be found anymore', (done) => {
    agent
      .get('/profile/' + userToShortBan)
      .end((err, res) => {
        assert.equal(res.status, 403)
        done()
      })
  })

  it('Checking if the profile can not be found anymore', (done) => {
    agent
      .get('/profile/' + userToShortBan)
      .end((err, res) => {
        assert.equal(res.status, 403)
        done()
      })
  })

  it('Creating a user so we can ban him', (done) => {
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

  it('Login as admin so we can ban users', (done) => {
    agent
      .post('/login')
      .send({
        username: 'Admin',
        password: 'Qwerty123'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking if we can ban users longterm', (done) => {
    agent
      .patch('/ban')
      .send({
        username: userToLongBan,
        days: '35',
        reason: 'being offensive'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking if the profile loads correctly', (done) => {
    agent
      .get('/profile/' + userToLongBan)
      .end((err, res) => {
        assert.equal(res.status, 403)
        done()
      })
  })
})
