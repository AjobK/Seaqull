import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import Post from '../entities/post'

chai.use(chaiHttp)

describe('testing liking posts', () => {
  const agent = chai.request.agent('http://localhost:8000/api')
  let post: Post

  it('Getting all posts on the home page', (done) => {
    agent
      .get('/post/owned-by/Admin')
      .end((err, res) => {
        assert.equal(res.status, 200)
        post = res.body[0]
        done()
      })
  })

  it('liking a post without being logged in', (done) => {
    agent
      .post('/post/like/' + post.path)
      .end((err, res) => {
        assert.equal(res.status, 401)
        done()
      })
  })

  it('login so we can test liking a post', (done) => {
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

  it('liking a post', (done) => {
    agent
      .post('/post/like/' + post.path)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Getting updated amount of likes', (done) => {
    agent
      .get('/post/liked-by/recent/User')
      .end((err, res) => {
        assert.equal(res.body[0].id, post.id)
        done()
      })
  })

  it('Trying to like a post twice', (done) => {
    agent
      .post('/post/like/' + post.path)
      .end((err, res) => {
        assert.equal(res.status, 400)
        done()
      })
  })

  it('deleting like on a post when the post is liked by the logged in user', (done) => {
    agent
      .delete('/post/like/' + post.path)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('checking if the like is deleted', (done) => {
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

  it('deleting like on a post when the post isn\'t liked by the logged in user', (done) => {
    agent
      .delete('/post/like/' + post.path)
      .end((err, res) => {
        assert.equal(res.status, 404)
        done()
      })
  })
})
