const mysql = require('mysql')

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
})

db.connect(err => {
  if (err) throw err
})

module.exports = db
