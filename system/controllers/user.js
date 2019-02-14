const express = require('express')
const router = express.Router()
const Model = require('../models/Model.class.js')
const User = new Model('user')
const CheckClass = require('../checkTemplate.class.js')

const template = {
  id: {
    type: 'id',
    required: true
  },
  role: {
    type: 'int',
    required: true
  },
  username: {
    type: 'string',
    required: true
  },
  display_name: {
    type: 'string',
    required: true
  },
  password: {
    type: 'hash',
    required: true
  },
  email: {
    type: 'email',
    required: true
  },
  level: {
    type: 'int',
    required: false
  },
  rows_scrolled: {
    type: 'int',
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
  User.selectAll(result => {
    res.send(result)
  })
})

router.get('/:id', (req, res) => {
  User.selectOne(req.params.id, (result) => {
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

router.post('/', (req, res) => {
  const body = req.body
  const check = Check.create(template, body)

  if (typeof check !== 'undefined') {
    return res.status(412).send(check)
  }
  User.create(body, () => {
    res.status(201).send( { 'msg': 'User has been created' } )
  })
})

router.post('/update', (req, res) => {
  const body = req.body

  if (!body.id) {
    return res.status(412).send( { 'msg': 'ID has not been defined' } )
  }
  const check = Check.update(template, body)

  if (typeof check !== 'undefined') {
    return res.status(412).send(check)
  }

  User.update(body, () => {
    res.send( { 'msg': `User with ID: ${body.id} has been updated` } )
  })
})

module.exports = router
