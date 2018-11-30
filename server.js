const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const user = require ('./src/routes/user.route');

// Express Server
const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

// Host the server on port 8080
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Athena Development server is running!`)
    console.log('Server is hosted on url: http://localhost:8080')
    console.log(`Don't forget to commit & push and check the linter!`)
})

// MongoDB Connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://Crivian:floortje2001@ds119024.mlab.com:19024/athena_alpha'; // Test url with mongoDB and mLab
let mongoDB = process.env.MONGODB_URI || dev_db_url; 
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import routes for users
// Place the functions (the route files) in here (the first slash, ex. `users`, `posts' etc. which access the functions within the corresponding 
// Controller via the second slash containing the function name ex. `test`)
