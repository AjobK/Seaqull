const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'seaqull'
  })
  
db.getConnection(err => {
  if (err) {
    throw err
  }
})

const query = sql => {
  const queryResult = db.query(sql, (err, result) => {
    if (err) throw err
    return result
  })
  console.log(queryResult)
}

const select = (what, table, where) => {
  if (typeof what === 'undefined' || typeof table === 'undefined') {
    const Message = { status: 400, message: 'Please check your function!' }
    return Message
  }
  const sql = `SELECT ${what} FROM ${table} ${where ? `WHERE ${where}`: ''}`
  return query(sql)
}

const update = (table, what, where) => {
  if (typeof what === 'undefined' || typeof table === 'undefined' || typeof table === 'undefined') {
    const Message = { status: 400, message: 'Please check your function!' }
    return Message
  }
  const sql = `UPDATE ${table} SET ${what} WHERE ${where}`
  return query(sql)
}

module.exports = select