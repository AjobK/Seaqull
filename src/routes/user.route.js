const express = require('express');
const router = express.Router();

// Require the controllers
// this is the file which contains all your functions (the crud of the API) that connect to the model
const UserController = require ('../controllers/userController');

// a simple test url to check that all of our files are communicating correctly.
// this is the second slash within the uri, it contains the name of the function (ex. `test`) and uses the corresponding function via the immported
// controller.
// the router.<request here> can be for ex. post or get
router.get('/test', UserController.test);
router.post('/create', UserController.users_create);

// the `:` infront of 'id' makes sure anything can go there, the `:` make sure its a param
router.get('/:id', UserController.users_details);

// updating an existing record
router.put('/:id/update', UserController.users_update);

// deleting an existing record
router.delete('/:id/delete', UserController.users_delete);


// export
module.exports = router;