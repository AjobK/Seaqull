import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import { GuestAgentStore, UserAgentStore } from './utils/agents'
import { Post } from '../entities/post.entity'

require('dotenv').config()

chai.use(chaiHttp)

describe('Comment section', () => {
  let post: Post

  describe('Comment functionalities as a gues', () => {
    before((done) => {
      GuestAgentStore.agent
        .get('/post/owned-by/User')
        .end((err, res) => {
          post = res.body[0]

          done()
        })
    })

    describe('Comment functionalities as a guest', () => {
      it('Shouldn\'t post a new comment', (done) => {
        GuestAgentStore.agent
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
  })

  describe('Comment functionalities as a user', () => {
    let post: Post

    before((done) => {
      UserAgentStore.agent
        .get('/post/owned-by/User')
        .end((err, res) => {
          post = res.body[0]
          done()
        })
    })

    describe('Posting a comment', () => {
      let commentId

      it('Should post a comment', (done) => {
        UserAgentStore.agent
          .post('/comment')
          .send({
            path: post.path,
            content: 'this is a comment on a comment',
          })
          .end((err, res) => {
            assert.equal(res.status, 201)

            UserAgentStore.agent
              .get('/comment/' + post.path)
              .end((err, res) => {
                commentId = res.body[res.body.length - 1].comment.id
                done()
              })
          })
      })

      after((done) => {
        UserAgentStore.agent
          .delete('/comment/' + commentId)
          .end(() => {
            done()
          })
      })
    })

    describe('Should reply on a comment', () => {
      let commentId

      before((done) => {
        UserAgentStore.agent
          .post('/comment')
          .send({
            path: post.path,
            content: 'this is a comment on a comment',
          })
          .end(() => {
            UserAgentStore.agent
              .get('/comment/' + post.path)
              .end((err, res) => {
                commentId = res.body[res.body.length - 1].comment.id
                done()
              })
          })
      })

      it('Should reply on a comment', (done) => {
        UserAgentStore.agent
          .post('/comment')
          .send({
            path: post.path,
            content: 'this is a comment to check if the comment section works',
            parrent_comment_id: commentId
          })
          .end((err, res) => {
            assert.equal(res.status, 201)
            done()
          })
      })

      after((done) => {
        UserAgentStore.agent
          .delete('/comment/' + commentId)
          .end(() => {
            done()
          })
      })
    })

    describe('Should remove a comment', () => {
      let commentId

      before((done) => {
        UserAgentStore.agent
          .post('/comment')
          .send({
            path: post.path,
            content: 'this is a comment on a comment',
          })
          .end((err, res) => {
            assert.equal(res.status, 201)
            UserAgentStore.agent
              .get('/comment/' + post.path)
              .end((err, res) => {
                commentId = res.body[res.body.length - 1].comment.id
                done()
              })
          })
      })

      it('Deleting a comment', (done) => {
        UserAgentStore.agent
          .delete('/comment/' + commentId)
          .end((err, res) => {
            assert.equal(res.status, 200)

            UserAgentStore.agent
              .get('/comment/' + post.path)
              .end((err, res) => {
                let commentRemoved = true

                if (Array.isArray(res.body)) {
                  for (let x = 0; x < res.body.length; x++) {
                    if (res.body[x].id == commentId)
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
})
