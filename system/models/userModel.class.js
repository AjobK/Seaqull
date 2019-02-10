const Connection = require('../connection.js')

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
    const sql = 'INSERT INTO User (`id`, `role`, `username`, `display_name`, `password`, `email`, `level`, `rows_scrolled`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

    Connection.query(sql, Object.values(body), (err, result) => {
      if (err) throw err
      callback()
    })
  }

  update (body, callback) {
    const values = Object.values(body)
    const names = Object.getOwnPropertyNames(body)
    const sql = 'UPDATE User SET ? , updated_at = NOW() WHERE id = ?'
    let update = []

    for(let x = 1; x < names.length; x++) {
      const item = '"' + names[x] + '"' + ' = ' + '"' + values[x] + '"'

      update.push(item)
    }

    update = update.join(', ')

    console.log(update)

    Connection.query(sql, [update, body.id], (err, result) => {
      if (err) throw err
      callback()
    })
  }
}

module.exports = UserModel
