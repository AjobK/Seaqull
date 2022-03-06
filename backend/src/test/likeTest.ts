import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { GuestAgentStore, UserAgentStore } from './utils/agents'
import { Post } from '../entities/post.entity'

require('dotenv').config()

chai.use(chaiHttp)

describe('Like posts', () => {
  let post: Post

  before((done) => {
    UserAgentStore.agent
      .get('/post/owned-by/Admin')
      .end((err, res) => {
        assert.equal(res.status, 200)

        post = res.body[0]
        done()
      })
  })

  describe('Like functionalities as guest', () => {
    require('dotenv').config()

    it('Shouldn\'t like a post', (done) => {
      GuestAgentStore.agent
        .post('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })
  })

  describe('Like functionalities as user', () => {
    it('Should like a post', (done) => {
      UserAgentStore.agent
        .post('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 201)
          done()
        })
    })

    it('Should delete a like', (done) => {
      UserAgentStore.agent
        .delete('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 200)
          UserAgentStore.agent
            .get('/post/like/recent/User')
            .end((err, res) => {
              if (Array.isArray(res.body)) {
                assert.notEqual(res.body[0].id, post.id)
              } else {
                assert.equal(res.body.message, 'No likes found for that username')
              }

              done()
            })
        })
    })

    it('Shouln\'t unlike a post', (done) => {
      UserAgentStore.agent
        .delete('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })

})
