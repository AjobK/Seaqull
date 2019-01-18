const db = require('../connection')

const create = (res, table, columns, values) => {
  const sql = `INSERT INTO ${table} (${columns}) VALUES (${values})`
  db.query(sql, (err, result) => {
    if (err) throw err
    res.status(201)
       .send({ status: 201, message: 'Item has been created!'})
  })
}

module.exports = create