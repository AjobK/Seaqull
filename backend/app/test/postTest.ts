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

  it('Should create a post', (done) => {
    agent
      .post('/post')
      .send({
        title: id,
        description: 'This is a post to test if you can create a post',
        content: 'example text'
      })
      .end(() => {
        agent
          .get('/post/owned-by/User')
          .end((err, res) => {
            assert.equal(res.body[0].title, id)
            post = res.body[0]
            done()
          })
      })
  })

  it('Should update a post', (done) => {
    id = uuidv4()
    agent
      .put('/post/' + post.path)
      .send({
        title: id,
        description: 'This is a post to test if you can create a post',
        content: 'example text'
      })
      .end(() => {
        agent
          .get('/post/' + post.path)
          .end((err, res) => {
            assert.equal(res.body.post.title, id)
            done()
          })
      })
  })

  it('Should archive post', (done) => {
    agent
      .put('/post/archive/' + post.path)
      .end(() => {
        agent
          .get('/post/owned-by/User')
          .end((err, res) => {
            assert.notEqual(res.body[0].title, true)
            done()
          })
      })
  })
})
