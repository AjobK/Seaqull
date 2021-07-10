const jwt = require('jsonwebtoken')
require('dotenv').config()

const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {

    if (!req.cookies) return res.status(401).send('Not authorized')

    const { token } = req.cookies

    if (!token) return res.status(401).send('Not authorized')

    let decodedToken = ''

    try{
        decodedToken = jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return res.status(422).send('Token invalid')
    }

    req.decoded = decodedToken

    next()
}
