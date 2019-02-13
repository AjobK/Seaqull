const express = require('express')
const router = express.Router()
const Model = require('../models/Model.class.js')
const Post = new Model('post')
const CheckClass = require('../checkTemplate.class.js')

const template = {
  id: {
    type: 'id',
    required: true
  },
  user_id: {
    type: 'id',
    required: true
  },
  title: {
    type: 'string',
    required: true
  },
  content: {
    type: 'string',
    required: true
  },
  path: {
    tye: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true
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
    if (isNaN(req.params.id)) {
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