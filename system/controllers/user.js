const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel.class.js')
const User = new UserModel()

router.use('/', (req, res) => {
  User.selectAll(result => {
    res.send(result)
  })
})

module.exports = router
