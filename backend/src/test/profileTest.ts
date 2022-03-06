import fs = require('fs');
import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { AdminAgentStore, UserAgentStore } from './utils/agents'
import DatabaseConnector from './utils/databaseConnector'

require('dotenv').config()

chai.use(chaiHttp)

describe('Profile page', () => {
  describe('Profile following', () => {
    let amountOfFollowers = 0

    it('Should retrieve the current amount of followers', (done) => {
      AdminAgentStore.agent
        .get('/profile/Admin/followers')
        .end((err, res) => {
          if (res.status == 201) {
            amountOfFollowers = res.body.followers.length
          } else {
            amountOfFollowers = 0
          }

          done()
        })
    })

    it('Should follow the admin', (done) => {
      UserAgentStore.agent
        .post('/profile/follow/Admin')
        .end((err, res) => {
          assert.equal(res.status, 201)

          UserAgentStore.agent
            .get('/profile/Admin/followers')
            .end((err, res) => {
              assert.equal(res.body.followers.length, (amountOfFollowers + 1))
              done()
            })
        })
    })

    it('Should unfollow the admin as user', (done) => {
      UserAgentStore.agent
        .post('/profile/follow/Admin')
        .end((err, res) => {
          assert.equal(res.status, 201)

          UserAgentStore.agent
            .get('/profile/Admin/followers')
            .end((err, res) => {
              amountOfFollowers = res.status == 201 ? res.body.followers.length : 0

              done()
            })
        })
    })
  })

  describe('Profile update functionalities', () => {
    let currentAvatar = ''
    let currentBanner = ''

    before((done) => {
      UserAgentStore.agent
        .get('/profile/User')
        .end((err, res) => {
          currentAvatar = res.body.profile.avatar
          currentBanner = res.body.profile.banner
          done()
        })
    })

    it('Should update user', (done) => {
      UserAgentStore.agent
        .put('/profile')
        .send({
          username: 'User',
          description: 'update user'
        })
        .end((err, res) => {
          assert.equal(res.status, 200)

          UserAgentStore.agent
            .get('/profile/User')
            .end((err, res) => {
              assert.equal(res.body.profile.description, 'update user')
              done()
            })
        })
    })

    it('Should update profile picture', (done) => {
      UserAgentStore.agent
        .put('/profile/avatar')
        .attach('file', fs.readFileSync(`${__dirname}/data/avatar.jpg`), 'avatar.jpg')
        .end((err, res) => {
          assert.notEqual(currentAvatar, res.body.url)
          done()
        })
    })

    it('Should update banner', (done) => {
      UserAgentStore.agent
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
      UserAgentStore.agent
        .get('/role')
        .end((err, res) => {
          assert.equal(res.body.name, 'User')
          done()
        })
    }))
  })

  after((done) => {
    UserAgentStore.agent
      .put('/profile')
      .send({
        username: 'User',
        description: 'Welkom to my profile!'
      })
      .end()

    UserAgentStore.agent
      .get('/profile')
      .send()
      .end((err, res) => {
        const profile = res.body.profile

        DatabaseConnector.getRepository('Profile').then((repo) => {
          repo.findOne(
            { where: { display_name: profile.username },
              relations: ['avatar_attachment', 'banner_attachment'] }).then((res) => {
            const avatar = res.avatar_attachment
            const banner = res.banner_attachment

            avatar.path = 'default/defaultAvatar.png'
            banner.path = 'default/defaultBanner.jpg'

            DatabaseConnector.getRepository('Attachment').then((repoAttachment) => {
              repoAttachment.update(avatar).then(() => {
                console.log('test')
                repoAttachment.update(banner).then(() => {
                  done()
                })
              }).catch((err) => {
                console.log(err)
              })
            })
          }).catch((err) => {
            console.log(err)
          })
        })
      })
  })
})
