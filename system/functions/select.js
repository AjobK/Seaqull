const db = require('../connection')

const select = (res, what, table, where) => {
  const sql = `SELECT ${what} FROM ${table} ${where ? `WHERE ${where}`: ''}`
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
}

module.exports = select
