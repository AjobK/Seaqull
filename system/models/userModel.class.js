const Connection = require('../connection.js')

class UserModel {
  constructor () {
    this.user = {
      id: {
        type: 'int',
        required: true
      },
      username: {
        type: 'string',
        required: true
      }
    }
  }

  selectAll (callback) {
    const sql = 'SELECT * FROM User'
    const test = []

    Connection.query(sql, (err, result) => {
      if (err) throw err
      const user = Object.getOwnPropertyNames(this.user)

      user.forEach(element => {
        test.push(result[0][element])
      })
      callback(result)
    })
  }
}

module.exports = UserModel
