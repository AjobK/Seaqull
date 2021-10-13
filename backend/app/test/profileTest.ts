import fs = require('fs');
import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')

chai.use(chaiHttp)

describe('Testing the different components used on the profile page', () => {
  const agentAdmin = chai.request.agent('http://localhost:8000/api')
  const agentUser = chai.request.agent('http://localhost:8000/api')
  let currentAvatar = ''
  let currentBanner = ''

  let amountOfFollowers = 0

  it('Login so we can test the profile page', (done) => {
    agentUser
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

  it('Updating user', (done) => {
    agentUser
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

  it('Checking if the description is updated', (done) => {
    agentUser
      .get('/profile/User')
      .end((err, res) => {
        assert.equal(res.body.profile.description, 'update user')
        done()
      })
  })

  it('Login as admin so we can check the amount of followers', (done) => {
    agentAdmin
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

  it('Getting the current amount of followers', (done) => {
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

  it('Following the admin as user', (done) => {
    agentUser
      .post('/profile/follow/Admin')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking followers count after following', (done) => {
    agentAdmin
      .get('/profile/Admin/followers')
      .end((err, res) => {
        assert.equal(res.body.followers.length, (amountOfFollowers + 1))
        done()
      })
  })

  it('Unfollowing the admin as user', (done) => {
    agentUser
      .post('/profile/follow/Admin')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('checking followers after unfollowing', (done) => {
    agentAdmin
      .get('/profile/Admin/followers')
      .end((err, res) => {
        if (res.status == 200) {
          assert.equal(res.body.followers.length, amountOfFollowers)
        } else if (res.status == 204) {
          assert.equal(Object.keys(res.body).length, amountOfFollowers)
        }

        done()
      })
  })

  it('checking if we can change our avatar', (done) => {
    agentUser
      .get('/profile/User')
      .end((err, res) => {
        currentAvatar = res.body.profile.avatar
        currentBanner = res.body.profile.banner
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking if we can update the avatar', ((done) => {
    agentUser
      .put('/profile/avatar')
      .attach('file', fs.readFileSync(`${__dirname}/data/avatar.jpg`), 'avatar.jpg')
      .end((err, res) => {
        assert.notEqual(currentAvatar, res.body.url)
        done()
      })
  }))

  it('Checking if we can update the banner', ((done) => {
    agentUser
      .put('/profile/avatar')
      .attach('file', fs.readFileSync(`${__dirname}/data/banner.jpeg`), 'banner.jpeg')
      .end((err, res) => {
        assert.notEqual(currentBanner, res.body.url)
        done()
      })
  }))

  it('Checking if we can get the role', ((done) => {
    agentUser
      .get('/role')
      .end((err, res) => {
        assert.equal(res.body.name, 'User')
        done()
      })
  }))
})
