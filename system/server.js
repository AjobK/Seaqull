const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const port = process.env.BPORT || 3000
const user = require('./controllers/user.js')

// Makes sure we can read the body and the cookies

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: `${process.env.SECRET_SESSION_KEY}`,
  saveUninitialized: true,
  resave: false,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

// Sets global headers

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*')
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Place routes under here

app.use('/user', user)

app.listen(port, () => console.log(`The api is available on port: ${port}!`))
