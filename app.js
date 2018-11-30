// app.js

const express = require('express');
const bodyParser = require('body-parser');

const user = require ('./src/routes/user.route');
const app = express();

// initialize our express app

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://Crivian:floortje2001@ds119024.mlab.com:19024/athena_alpha'; // test url with mongoDB and mLab
let mongoDB = process.env.MONGODB_URI || dev_db_url; 
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// import routes for users
// place the functions (the route files) in here (the first slash, ex. `users`, `posts' etc. which acces the functions within the corresponding 
// controller via the second slash containing the function name ex. `test`)

app.use('/users', user);

// just a testing localhost thingy
app.listen(8080, () => {
    console.log('Server is up and running on port number 8080');
});
