const express = require('express')
const router = express.Router()
const select = require('../functions/select')
const create = require('../functions/create')
const update = require('../functions/update')
const archive = require('../functions/archive')
const bodyParser = require('body-parser')

const table = 'Users'

router.use(bodyParser.json())

router.get('/', (req, res) => {
	select(res, '*', table)
})

router.get('/:id', (req, res) => {
	select(res, '*', table, `id = ${req.params.id}`)
})

router.post('/', (req, res) => {
	const body = req.body
	create(res, )
})

router.post('/update', (req, res) => {
	const body = req.body
	if (!body.id) {
		return res.send({ status: 412, message: 'ID has not been defined!' })
	}
	const id = body.id
  let set

	update(res, table, set, `id = ${id}`)
})
 
router.get('archive/:id', (req, res) => {
	archive(res, table, `id = ${req.params.id}`)
})

module.exports = router
