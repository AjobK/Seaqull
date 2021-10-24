import chai = require('chai')
import chaiHttp = require('chai-http')
import assert = require('assert')
import Post from '../entities/post'
import Comment from '../entities/comment'

chai.use(chaiHttp)

describe('Testing comment section on posts', () => {
  const agent = chai.request.agent('http://localhost:8000/api')
  let post: Post
  let comment: Comment

  it('requests post to comment on', (done) => {
    agent
      .get('/post/owned-by/User')
      .end((err, res) => {
        post = res.body[0]
        done()
      })
  })

  it('Checks if you can\'t post a comment without being logged in', (done) => {
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

  it('Checks if you can post a comment without being logged in', (done) => {
    agent
      .post('/comment')
      .send({
        path: post.path,
        content: 'this is a comment on a comment',
        parrent_comment_id: 0
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checks if you can request all comments on a post', (done) => {
    agent
      .get('/comment/' + post.path)
      .end((err, res) => {
        comment = res.body[0]
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checks if you can comment on a comment', (done) => {
    agent
      .post('/comment')
      .send({
        path: post.path,
        content: 'this is a comment to check if the comment section works',
        parrent_comment_id: comment.id
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checks if you can remove a comment', (done) => {
    agent
      .delete('/comment/' + comment.id)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
  })

  it('Checks if the comment is removed', (done) => {
    agent
      .get('/comment/' + post.path)
      .end((err, res) => {
        assert.equal(res.status, 200)

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
