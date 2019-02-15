const Connection = require('../connection.js')

const randomID = (table, length = 10) => {
  let id = ''
  const options = 'ZXCVBNMASDFGHJKLQWERTYUIOPzxcvbnmasdfghjklqwertyuiop1234567890!@#$%^&?'

  for (let x = 0; x < length; x++)
    id += options.charAt(Math.floor(Math.random() * options.length))

  Connection.query(`SELECT id FROM ${table} WHERE id = '${id}'`, [table, id], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      return randomID(table)
    }
  })

  return id
}

module.exports = randomID
