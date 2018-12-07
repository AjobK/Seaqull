const path = require('path')
const express = require('express');
// const bodyParser = require('body-parser');
// const user = require ('./src/routes/user.route');

// Express Server
const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, './dist/index.html')
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

// SQL Connection
const sql = require('mysql');
const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });
  
// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import routes for users
// Place the functions (the route files) in here (the first slash, ex. `users`, `posts' etc. which access the functions within the corresponding 
// Controller via the second slash containing the function name ex. `test`)
app.use('/user', user);

// Host the server on port 8081
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Athena Development server is running!`)
    console.log('Server is hosted on url: http://localhost:8081')
    console.log(`Don't forget to commit & push and check the linter!`)
})
