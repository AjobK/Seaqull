import fs = require('fs');
import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')

require('dotenv').config()

const captcha = process.env.HCAPTCHA_TEST_TOKEN

chai.use(chaiHttp)

describe('Profile page', () => {
  const agentAdmin = chai.request.agent('http://localhost:3000/api')
  const agentUser = chai.request.agent('http://localhost:3000/api')

  before((done) => {

    agentUser
      .post('/login')
      .send({
        username: 'User',
        password: 'Qwerty123',
        captcha
      })
      .end(() => {
        agentAdmin
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
  })

  describe('Profile following', () => {
    let amountOfFollowers = 0

    it('Should retrieve the current amount of followers', (done) => {
      agentAdmin
        .get('/profile/Admin/followers')
        .end((err, res) => {
          if (res.status == 200) {
            amountOfFollowers = res.body.followers.length
          } else {
            amountOfFollowers = 0
          }

          done()
        })
    })

    it('Should follow the admin', (done) => {
      agentUser
        .post('/profile/follow/Admin')
        .end((err, res) => {
          assert.equal(res.status, 201)

          agentAdmin
            .get('/profile/Admin/followers')
            .end((err, res) => {
              assert.equal(res.body.followers.length, (amountOfFollowers + 1))
              done()
            })
        })
    })

    it('Should unfollow the admin as user', (done) => {
      agentUser
        .post('/profile/follow/Admin')
        .end((err, res) => {
          assert.equal(res.status, 201)

          agentAdmin
            .get('/profile/Admin/followers')
            .end((err, res) => {
              amountOfFollowers = res.status == 200 ? res.body.followers.length : 0

              done()
            })
        })
    })
  })

  describe('Profile update functionalities', () => {
    let currentAvatar = ''
    let currentBanner = ''

    before((done) => {
      agentUser
        .get('/profile/User')
        .end((err, res) => {
          currentAvatar = res.body.profile.avatar
          currentBanner = res.body.profile.banner
          done()
        })
    })

    it('Should update user', (done) => {
      agentUser
        .put('/profile/User')
        .send({
          username: 'User',
          description: 'update user'
        })
        .end((err, res) => {
          assert.equal(res.status, 200)

          agentUser
            .get('/profile/User')
            .end((err, res) => {
              assert.equal(res.body.profile.description, 'update user')
              done()
            })
        })
    })

    it('Should update profile picture', (done) => {
      agentUser
        .put('/profile/avatar')
        .attach('file', fs.readFileSync(`${__dirname}/data/avatar.jpg`), 'avatar.jpg')
        .end((err, res) => {
          assert.notEqual(currentAvatar, res.body.url)
          done()
        })
    })

    it('Should update banner', (done) => {
      agentUser
        .put('/profile/banner')
        .attach('file', fs.readFileSync(`${__dirname}/data/banner.jpeg`), 'banner.jpeg')
        .end((err, res) => {
          assert.notEqual(currentBanner, res.body.url)
          done()
        })
    })
  })

  describe('Testing role functionalities', () => {
    it('Should retrieve role', ((done) => {
      agentUser
        .get('/role')
        .end((err, res) => {
          assert.equal(res.body.name, 'User')
          done()
        })
    }))
  })
})
