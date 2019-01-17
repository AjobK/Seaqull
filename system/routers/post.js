const express = require('express')
const router = express.Router()
const functions = require('../functions')
// const bodyParser = require('body-parser')
// const http = require('http')

// router.use(bodyParser.json())

router.get('/', (req, res) => {
	res.send(functions('*', 'POSTS', 'id = 1'))
})

// router.get('/:id', (req, res) => {
// 	// const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
// 	// query(req, res, sql, 'GET')
// })

// router.post('/create', (req, res) => {
// 	// const body = req.body
// 	// const sql = `INSERT INTO POSTS (id, Title, Date) VALUES (NULL, '${body.Title}', NOW())`
// 	// query(req, res, sql, 'POST')
// })

// router.get('/archive/:id', (req, res) => {
// 	// const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
// 	// query(req, res, sql, 'ARCHIVE', 'POSTS')
// })

module.exports = router
