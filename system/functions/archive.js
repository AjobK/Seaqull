const db = require('../connection')

const archive = (res, table, where) => {
  const sql = `SELECT * FROM ${table} WHERE ${where}`
  db.query(sql, (err, result) => {
    if (err) throw err
    if (result.length < 1) {
      res.status(404) 
      .send({ status: 404, message: 'Item cannot be found!'})
      return
    }
    const sql = `UPDATE ${table} SET Archive = 1 WHERE ${where}`
    db.query(sql, (err, result) => {
      if (err) throw err
      res.send({ satus: 200, message: 'Item has been updated!' })
    })
  })
}

module.exports = archive
