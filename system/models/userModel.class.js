const Connection = require('../connection.js')
const randomID = require('../globalFunctions/randomId.js')

class UserModel {
  selectAll (callback) {
    const sql = 'SELECT * FROM User'

    Connection.query(sql, (err, result) => {
      if (err) throw err
      callback(result)
    })
  }

  selectOne (id, callback) {
    const sql = 'SELECT * FROM User WHERE id = ?'

    Connection.query(sql, [id], (err, result) => {
      if (err) throw err
      callback(result)
    })
  }

  create (body, callback) {
    let names = Object.getOwnPropertyNames(body)
    const values = Object.values(body)
    let question = ''

    for (let x = 0; x < values.length; x++) {
      question += ', ?'
    }

    names = names.join(', ')
    const sql = `INSERT INTO User (id, ${names}) VALUES ('${randomID('user')}' ${question})`

    Connection.query(sql, Object.values(body), err => {
      if (err) throw err
      callback()
    })
  }

  update (body, callback) {
    const values = Object.values(body)
    const names = Object.getOwnPropertyNames(body)
    let update = []

    for(let x = 1; x < names.length; x++) {
      const item = names[x] + ' = "' + values[x] + '"'

      update.push(item)
    }

    update = update.join(', ')

    const sql = `UPDATE User SET ${update}, updated_at = NOW() WHERE id = ?`

    Connection.query(sql, body.id, err => {
      if (err) throw err
      callback()
    })
  }
}

module.exports = UserModel
