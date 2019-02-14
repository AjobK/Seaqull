const Connection = require('../connection.js')

class Model {
  constructor (table) {
    this.table = table
  }

  selectAll (callback) {
    const sql = 'SELECT * FROM ' + this.table

    Connection.query(sql, (err, result) => {
      if (err) throw err
      callback(result)
    })
  }

  selectOne (id, callback) {
    const sql = 'SELECT * FROM ' + this.table + ' WHERE id = ?'

    Connection.query(sql, [id], (err, result) => {
      if (err) throw err
      callback(result)
    })
  }

  create (body, callback) {
    const sql = 'INSERT INTO ' + this.table + ' (`id`, `user_id`, `title`, `content`, `path`, `description`, `thumbnail`, `created_at`, `updated_at`, `archived_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    Connection.query(sql, Object.values(body), (err, result) => {
      if (err) throw err
      callback()
    })
  }

  update (body, callback) {
    const values = Object.values(body)

    const names = Object.getOwnPropertyNames(body)

    const sql = 'UPDATE ' + this.table + ' SET ? , updated_at = NOW() WHERE id = ?'

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

  archiveOne (id, callback) {
    const d = new Date();
    const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    const sql = 'UPDATE `' + this.table + '` SET `archived_at` = ? WHERE `' + this.table + '`.`id` = ?'

    Connection.query(sql, [date, id], (err, result) => {
      if (err) throw err
      callback(result)
    })
  }
}



module.exports = Model
