const express = require('express')
const app = express()
const port = 3000
const posts = require('./routers/post')

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/post', posts)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
