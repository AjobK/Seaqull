const express = require('express')
const router = express.Router()
const RoleModel = require('../models/defaultModel.class.js')
const Role = new RoleModel('Role')
const CheckClass = require('../globalFunctions/checkTemplate.class.js')

const template = {
  name: {
    type: 'string',
    required: true,
    unique: 'role'
  }
}

const Check = new CheckClass()

router.get('/', (req, res) => {
  Role.selectAll(result => {
    res.send(result)
  })
})

router.get('/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(412).send({ 'msg': 'ID must be a string'})
  }
  Role.selectOne(req.params.id, result => {
    if (result.length === 0) {
      res.status(404).send( { 'msg': `There is no role with id: ${req.params.id}`})
    } else {
      res.send(result)
    }
  })
})

router.post('/', async (req, res) => {
  const body = req.body
  const check = await Check.create(template, body)

  if (typeof check !== 'undefined') {
    return res.status(412).send(check)
  }

  Role.create(body, () => {
    res.status(201).send( { 'msg': 'Role has been created' } )
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

  Role.update(body, () => {
    res.send( { 'msg': `Role with ID: ${body.id} has been updated` } )
  })
})

router.post('/archive', (req, res) => {
  const body = req.body

  if (!body.id) {
    return res.status(412).send( { 'msg': 'ID has not been defined' } )
  }

  Role.archive(body.id, () => {
    res.send( { 'msg': `User with ID: ${body.id} has been archived` } )
  })
})

module.exports = router
