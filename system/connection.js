const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'seaqull'
  })
  
db.connect(err => {
  if (err) {
    throw err
  }
})

module.exports = db
