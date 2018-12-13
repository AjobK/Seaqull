const Connection = require('../connection')

// Import the connection method from ../connection.js
const connection = Connection.connection

const Select = Query => {
  // Makes sure you can't select all
  // It will be extended and improved
  if (Query.includes("*") || Query.includes("all") || Query.includes("ALL") || Query.includes(".")){
    console.log('Can\'t select all')
  } else {
    connection.connect(function(err) {
    if (err) throw err
    connection.query(Query, function (err, result) {
      if (err) throw err
      console.log(JSON.parse(JSON.stringify(result)))
      // I want to be able to return the result and work with it outside of the function
    });
    }
  )}
}

// Want to be able to export this function to different files. So all I have to do is send the query
Select("SELECT * FROM User")
