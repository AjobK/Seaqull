const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const coockieParser = require('cookie-parser')
const session = require('express-session')
const port = process.env.BPORT || 3000

// Makes sure we can read the body and the cookies

app.use(bodyParser())
app.use(coockieParser())
app.use(session({
  name: 'seaqull-session',
  secret: process.env.SECRET_SESSION_KEY,
  saveUninitialized: false
}))

// Sets global headers

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['localhost'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

//Place routes under here

app.listen(port, () => console.log(`The api is available on port: ${port}!`))