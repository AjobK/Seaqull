const express = require('express')
const router = express.Router()
const Model = require('../models/Model.class.js')
const Post = new Model('post')
const CheckClass = require('../checkTemplate.class.js')

const template = {
  id: {
    type: 'id',
    required: false
  },
  user_id: {
    type: 'id',
    required: false
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
    required: false
  },
  description: {
    type: 'string',
    required: false
  },
  thumbnail: {
    type: 'int',
    required: false
  },
  created_at: {
    type: 'date',
    required: false
  },
  updated_at: {
    type: 'date',
    required: false
  },
  archived_at: {
    type: 'date',
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
    if (typeof req.params.id === 'string') {
      res.status(412).send( { 'msg': 'ID parameter must be an integer' } )
    } else {
      if (result.length === 0) {
        res.status(404).send( { 'msg': `User with id '${req.params.id}' can't be found` } )
      } else {
        res.send(result)
      }
    }
  })
})

router.post('/', (req, res) => {
  const body = req.body
  const check = Check.create(template, body)

  if (typeof check !== 'undefined') {
    return res.status(412).send(check)
  }
  Post.create(body, () => {
    res.status(201).send( { 'msg': 'Post has been created' } )
  })
})

router.put('/archive', (req, res) => {
  Post.archiveOne(req.params.id, (result) => {
    if (typeof req.params.id === 'string') {
      res.status(412).send( { 'msg': 'ID parameter must be an integer' } )
    } else {
      if (result.length === 0) {
        res.status(404).send( { 'msg': `User with id '${req.params.id}' can't be found` } )
      } else {
        res.send(result)
      }
    }
  })
})


module.exports = router
