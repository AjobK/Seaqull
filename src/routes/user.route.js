const express = require('express');
const router = express.Router();

// Require the controllers
// This is the file which contains all your functions (the crud of the API) that connect to the model
const UserController = require ('../controllers/userController');

// A simple test url to check that all of our files are communicating correctly.
// This is the second slash within the uri, it contains the name of the function (ex. `test`) and uses the corresponding function via the immported
// controller.
// The router.<request here> can be for ex. post or get
router.get('/test', UserController.test);
router.post('/create', UserController.users_create);

// The `:` infront of 'id' makes sure anything can go there, the `:` make sure its a param
router.get('/:id', UserController.users_details);

// Updating an existing record
router.put('/:id/update', UserController.users_update);

// Deleting an existing record
router.delete('/:id/delete', UserController.users_delete);


// Export
module.exports = router;
