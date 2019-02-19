const express = require('express')
const router = express.Router()
const Model = require('../models/PostModel.class.js')
const Post = new Model('post')
const CheckClass = require('../globalFunctions/checkTemplate.class.js')

const template = {
  user_id: {
    type: 'id',
    required: false,
    foreign: {
      table: 'user',
      row: 'id'
    }
  },
  title: {
    type: 'string',
    required: false
  },
  content: {
    type: 'string',
    required: false
  },
  path: {
    type: 'string',
    required: true,
    unique: 'post'
  },
  description: {
    type: 'string',
    required: false
  }
}

const Check = new CheckClass()

router.get('/', (req, res) => {
  Post.selectAll(result => {
    res.send(result)
  })
})

router.get('/:id', (req, res) => {
  Post.selectOne(req.params.id, (result) => {
    if (typeof req.params.id !== 'string') {
      res.status(412).send( { 'msg': 'ID parameter must be a string' } )
    } else {
      if (result.length === 0) {
        res.status(404).send( { 'msg': `Post with id '${req.params.id}' can't be found` } )
      } else {
        res.send(result)
      }
    }
  })
})

router.get('/title/:title', (req, res) => {
  Post.selectName(req.params.title, result => {
    if (result.length > 0) {
      res.send(result)
    } else {
      res.status(404).send( { 'msg': `There is no post with the title: ${req.params.title}` } )
    }
  })
})

router.get('/:page/:limit', (req, res) => {
  const page = req.params.page - 1

  if (page < 0) {
    return res.status(412).send( { 'msg': 'page must be higher than 0'} )
  }

  const limit = req.params.limit
  const offset = page * limit

  Post.selectLimit(limit, offset, result => {
    res.send(result)
  })
})

router.post('/', async (req, res) => {
  const body = req.body
  const check = await Check.create(template, body)

  if (typeof check !== 'undefined') {
    return res.status(412).send(check)
  }
  Post.create(body, () => {
    res.status(201).send( { 'msg': 'Post has been created' } )
  })
})

router.post('/update', async (req, res) => {
  const body = req.body

  if (!body.id) {
    return res.status(412).send( { 'msg': 'ID has not been defined' } )
  }

  const check = await Check.update(template, body)

  if (typeof check !== 'undefined') {
    return res.status(412).send(check)
  }

  Post.update(body, () => {
    res.send( { 'msg': `Post with ID: ${body.id} has been updated` } )
  })
})

router.post('/archive', (req, res) => {
  const body = req.body

  if (!body.id) {
    return res.status(412).send( { 'msg': 'ID has not been defined' } )
  }

  Post.archive(body.id, () => {
    res.send( { 'msg': `User with ID: ${body.id} has been archived` } )
  })
})


module.exports = router
