const express = require('express')
const app = express()
const mysql = require('mysql')
const port = 3000

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seaqull'
})

db.connect( (err) => {
  if (err) {
    throw err
  }
  console.log('MySQL Connected...')
})

app.get('/post/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '127.0.0.1:8081')
  const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
  const query = db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.get('/posts', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '127.0.0.1:8081')
  const sql = `SELECT * FROM posts`
  const query = db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))