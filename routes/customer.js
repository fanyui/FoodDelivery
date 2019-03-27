const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const customer_controller = require('../controllers/customer.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', customer_controller.test);
router.get('/', customer_controller.all);


router.post('/create', customer_controller.create);

router.get('/:id', customer_controller.details);


router.put('/:id', customer_controller.update);

router.delete('/:id', customer_controller.delete);


module.exports = router;