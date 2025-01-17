import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { Post } from '../entities/post.entity'
import { Comment } from '../entities/comment.entity'

require('dotenv').config()

const captcha = process.env.HCAPTCHA_TEST_TOKEN

chai.use(chaiHttp)

describe('Comment section', () => {
  const agent = chai.request.agent(process.env.BACKEND_TEST_URL)
  let post: Post

  before((done) => {
    agent
      .get('/post/owned-by/User')
      .end((err, res) => {
        post = res.body[0]
        done()
      })
  })

  describe('Comment functionalities as a guest', () => {
    it('Shouldn\'t post a new comment', (done) => {
      agent
        .post('/comment')
        .send({
          path: post.path,
          content: 'this is a comment to check if the comment section works',
          parrent_comment_id: 0
        })
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })
  })

  describe('Comment functionalities as a user', () => {
    let comment: Comment
    let post: Post

    before((done) => {
      agent
        .post('/login')
        .send({
          username: 'User',
          password: 'Qwerty123',
          captcha
        })
        .end(() => {
          agent
            .get('/post/owned-by/User')
            .end((err, res) => {
              post = res.body[0]

              agent
                .post('/comment')
                .send({
                  path: post.path,
                  content: 'this is a comment on a comment',
                })
                .end(() => {
                  agent
                    .get('/comment/' + post.path)
                    .send({
                      path: post.path,
                      content: 'this is a comment on a comment',
                    })
                    .end((err, res) => {
                      comment = res.body[0].comment
                      done()
                    })
                })
            })
        })
    })

    it('Should post a comment', (done) => {
      agent
        .post('/comment')
        .send({
          path: post.path,
          content: 'this is a comment on a comment',
        })
        .end((err, res) => {
          assert.equal(res.status, 201)
          done()
        })
    })

    it('Should reply on a comment', (done) => {
      agent
        .post('/comment')
        .send({
          path: post.path,
          content: 'this is a comment to check if the comment section works',
          parrent_comment_id: comment.id
        })
        .end((err, res) => {
          assert.equal(res.status, 201)
          done()
        })
    })

    it('Should delete a comment', (done) => {
      agent
        .delete('/comment/' + comment.id)
        .end((err, res) => {
          assert.equal(res.status, 200)

          agent
            .get('/comment/' + post.path)
            .end((err, res) => {
              let commentRemoved = true

              if (Array.isArray(res.body)) {
                for (let x = 0; x < res.body.length; x++) {
                  if (res.body[x].id == comment.id)
                    commentRemoved = false
                }
              }

              assert.equal(commentRemoved, true)
              done()
            })
        })
    })
  })
})
