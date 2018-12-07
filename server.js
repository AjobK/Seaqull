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
