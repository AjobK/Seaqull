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
    // INSERT INTO `user` (`id`, `role`, `username`, `display_name`, `password`, `email`, `level`, `rows_scrolled`, `created_at`, `updated_at`, `archived_at`) VALUES ('', '', '', '', '', '', '', '', '', '', NULL)
    const sql = 'INSERT INTO User (`id`, `role`, `username`, `display_name`, `password`, `email`, `level`, `rows_scrolled`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

    Connection.query(sql, Object.values(body), (err, result) => {
      if (err) throw err
      callback()
    })
  }
}

module.exports = UserModel
