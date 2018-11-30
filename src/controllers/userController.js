const User = require ('../models/user.model');

// simple version, no filtering
// this is an example function, the exports.<function name here> is basicly the function itself

// users/test
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// users/create
exports.users_create = (req, res) => {

    // creating the user to send to the model
    let user = new User(
        {
            UserName: req.body.name,
            UserPass: req.body.password,
            UserEmail: req.body.email
        }
    );
    // sending (and catching the error of sending) the created user to the model for insertion
    user.save( (err) => {
        if (err) {
            return next(err);
        }
        // what it returns :D
        // note to self: figure out how to turn this to a nice html acceptable form of the return value of the created user
        res.send('User Created successfully')
    })
};

// read functionality
exports.users_details = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        res.send(user);
    })
}

// update functionality
exports.users_update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => {
        if (err) return next(err);
        res.send('User udpated.' + user);
    });
};

// delete functionality
exports.users_delete = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};