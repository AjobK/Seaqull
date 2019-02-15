const Connection = require('../connection.js')
const randomID = require('../globalFunctions/randomId.js')

class Model {
  constructor (table) {
    this.table = table
  }

  selectAll (callback) {
    const sql = `SELECT * FROM ${this.table}`

    Connection.query(sql, (err, result) => {
      if (err) throw err
      callback(result)
    })
  }

  selectOne (id, callback) {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`

    Connection.query(sql, id, (err, result) => {
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
    const sql = `INSERT INTO ${this.table} (id, ${names}) VALUES ('${randomID('user')}' ${question})`

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

    const sql = `UPDATE ${this.table} SET ${update}, updated_at = NOW() WHERE id = ?`

    Connection.query(sql, body.id, err => {
      if (err) throw err
      callback()
    })
  }

  archive (id, callback) {
    Connection.query(`UPDATE ${this.table} SET archived_at = NOW() WHERE id = ?`, id, err => {
      if (err) throw err
      callback()
    })
  }

  delete (id, callback) {
    Connection.query(`DELETE FROM ${this.table} WHERE id = ?`, id, err => {
      if (err) throw err
      callback()
    })
  }
}

module.exports = Model
