const Connection = require('../connection.js')

class Model {
  constructor (table) {
    // const mysql = require('mysql')

    // require('dotenv').config();

    // this.db = mysql.createConnection({
    //   host: process.env.DB_HOST,
    //   database: process.env.DB_DATABASE,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS
    // })

    // this.db.connect(err => {
    //   if (err) throw err
    // })

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
    const sql = 'INSERT INTO ' + this.table + ' (`id`, `role`, `username`, `display_name`, `password`, `email`, `level`, `rows_scrolled`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

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
}

module.exports = Model
