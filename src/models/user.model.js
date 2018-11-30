const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a database table
let UserSchema = new Schema({
    UserName: {type: String, required: true, max: 25},
    UserPass: {type: String, required: true, max: 100},
    UserEmail: {type: String, required: true, max: 30},
});

// Export
module.exports = mongoose.model('user', UserSchema);

// MVC is eigenlijk gewoon 1 groot bestand (app.js) uit elkaar trekken en het MVC gedeelte is eigenlijk gewoon de structuur van 
// 1 groote functionaliteit gestructureerd verdelen over meerdere bestanden, dus MVC is de manier om deze te ordenen en bij te houden
