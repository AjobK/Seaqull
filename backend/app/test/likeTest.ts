import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import Post from '../entities/post'

chai.use(chaiHttp)

describe('Like posts', () => {
  const agent = chai.request.agent('http://localhost:8000/api')
  let post: Post

  before((done) => {
    agent
      .get('/post/owned-by/Admin')
      .end((err, res) => {
        assert.equal(res.status, 200)

        post = res.body[0]
        done()
      })
  })

  describe('Like functionalities as guest', () => {
    before((done) => {
      agent
        .post('/login')
        .send({
          username: 'User',
          password: 'Qwerty123'
        })
        .end(() => {
          agent
            .post('/post/like/' + post.path)
            .end(() => {
              agent
                .get('/logout')
                .end(() => {
                  done()
                })
            })
        })
    })

    it('Shouldn\'t like a post', (done) => {
      agent
        .post('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })
  })

  describe('Like functionalities as user', () => {
    before((done) => {
      agent
        .post('/login')
        .send({
          username: 'User',
          password: 'Qwerty123'
        })
        .end(() => {
          done()
        })
    })

    it('Should like a post', (done) => {
      agent
        .post('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 400)
          done()
        })
    })

    it('Should delete a like', (done) => {
      agent
        .delete('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 200)
          agent
            .get('/post/liked-by/recent/User')
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
      agent
        .delete('/post/like/' + post.path)
        .end((err, res) => {
          assert.equal(res.status, 404)
          done()
        })
    })
  })
})