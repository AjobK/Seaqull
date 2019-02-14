const Connection = require('../connection.js')

/**
 *
 * @param {string} table table where to find row
 * @param {string} row what row must be unique
 * @param {string} value what is is given value
 */
const checkUnique = (table, row, value) => {
  return new Promise(resolve => {
    Connection.query(`SELECT ${row} FROM ${table} WHERE ${row} = ?`, value, (err, result) => {
      if (err) throw err

      resolve(result)
    })
  })
}

module.exports = checkUnique
