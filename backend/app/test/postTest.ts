import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'
import Post from '../entities/post'

chai.use(chaiHttp)

describe('Testing the post crud', () => {
  const agent = chai.request.agent('http://localhost:8000/api')
  let id = uuidv4()
  let post: Post

  it('Checks if you can\'t create a post when a user is not logged in', (done) => {
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

  it('Login so we can test the user crud', (done) => {
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

  it('Checking if you can create a post', (done) => {
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

  it('Checking if the last created post can be found on the users page', (done) => {
    agent
      .get('/post/owned-by/User')
      .end((err, res) => {
        assert.equal(res.body[0].title, id)
        post = res.body[0]
        done()
      })
  })

  it('Checking if a user can update a post', (done) => {
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

  it('Checking if you can request the post and if the title is updated', (done) => {
    agent
      .get('/post/' + post.path)
      .end((err, res) => {
        assert.equal(res.body.post.title, id)
        done()
      })
  })

  it('Checking if you can archive a post', (done) => {
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
