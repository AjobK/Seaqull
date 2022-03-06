import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { v4 as uuidv4 } from 'uuid'
import { UserAgentStore } from './utils/agents'
import { Post } from 'src/entities/post.entity'
import DatabaseConnector from './utils/databaseConnector'

require('dotenv').config()

chai.use(chaiHttp)

describe('Post functionalities', () => {
  let post: Post

  before((done) => {
    require('dotenv').config()

    UserAgentStore.agent
      .get('/post/owned-by/User')
      .end((err, res) => {
        post = res.body[0]
        done()
      })
  })

  it('Should create a post', (done) => {
    const id = uuidv4()

    UserAgentStore.agent
      .post('/post')
      .send({
        title: id,
        description: 'This is a post to test if you can create a post',
        content: 'example text'
      })
      .end(() => {
        UserAgentStore.agent
          .get('/post/owned-by/User')
          .end((err, res) => {
            assert.equal(res.body[0].title, id)
            done()
          })
      })
  })

  it('Should update a post', (done) => {
    const titleUuid = uuidv4()
    UserAgentStore.agent
      .put('/post/' + post.path)
      .send({
        title: titleUuid,
        description: 'This is a post to test if you can create a post',
        content: 'example text'
      })
      .end(() => {
        UserAgentStore.agent
          .get('/post/' + post.path)
          .end((err, res) => {
            assert.equal(res.body.post.title, titleUuid)
            done()
          })
      })
  })

  it('Should archive post', (done) => {
    UserAgentStore.agent
      .put('/post/archive/' + post.path)
      .end(() => {
        UserAgentStore.agent
          .get('/post/owned-by/User')
          .end((err, res) => {
            assert.notEqual(res.body[0].title, true)
            done()
          })
      })
  })

  after((done) => {
    DatabaseConnector.getRepository('Post').then((repo) => {
      repo.findOne({ where: { path: post.path } }).then((post) => {
        repo.delete(post).then((res) => {
          console.log(res)
          done()
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  })
})
