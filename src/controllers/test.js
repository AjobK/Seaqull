const test = require('../connection')

const connection = test.connection

export let selectAll = (table) => connection.connect(function(err) {
  if (err) throw err
  connection.query("SELECT * FROM " + table, function (err, result, fields) {
    if (err) throw err
    console.log(result)
  })
})
