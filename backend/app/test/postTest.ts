import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'
import Post from '../entities/post'

chai.use(chaiHttp)

describe('testing crud post', () => {
  const agent = chai.request.agent('http://localhost:8000/api')
  let id = uuidv4()
  let post: Post

  it('Not creating a post when a user is not logged in', (done) => {
    agent
      .post('/post')
      .send({
        title: 'test post',
        description: 'This is a post to test if you can create a post',
        content: 'example text'
      })
      .end((err, res) => {
        assert.equal(res.status, 401)
        done()
      })
  })

  it('login so we can test the user crud', (done) => {
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

  it('creaing post', (done) => {
    agent
      .post('/post')
      .send({
        title: id,
        description: 'This is a post to test if you can create a post',
        content: 'example text'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Getting created posts and checking the post that was created last', (done) => {
    agent
      .get('/post/owned-by/User')
      .end((err, res) => {
        assert.equal(res.body[0].title, id)
        post = res.body[0]
        done()
      })
  })

  it('Updating post', (done) => {
    id = uuidv4()
    agent
      .put('/post/' + post.path)
      .send({
        title: id,
        description: 'This is a post to test if you can create a post',
        content: 'example text'
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Getting individual post', (done) => {
    agent
      .get('/post/' + post.path)
      .end((err, res) => {
        assert.equal(res.body.post.title, id)
        done()
      })
  })

  it('archiving post', (done) => {
    agent
      .put('/post/archive/' + post.path)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checking if post is removed', (done) => {
    agent
      .get('/post/owned-by/User')
      .end((err, res) => {
        assert.notEqual(res.body[0].title, true)
        done()
      })
  })
})
