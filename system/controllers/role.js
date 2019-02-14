const express = require('express')
const router = express.Router()
const Model = require('../models/Model.class.js')
const Role = new Model('role')
const CheckClass = require('../checkTemplate.class.js')

const template = {
  id: {
    type: 'id',
    required: false
  },
  role: {
    type: 'string',
    required: false
  },
  created_at: {
    type: 'date',
    required: false
  },
  updated_at: {
    type: 'date',
    required: false
  }
}

const Check = new CheckClass()

router.get('/', (req, res) => {
  Role.selectAll(result => {
    res.send(result)
  })
})

router.get('/:id', (req, res) => {
  Role.selectOne(req.params.id, (result) => {
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
  Role.create(body, () => {
    res.status(201).send( { 'msg': 'Role has been created' } )
  })
})

router.put('/archive', (req, res) => {
  Role.archiveOne(req.params.id, (result) => {
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


module.exports = router
