const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const order_controller = require('../controllers/order.controller');


// returns all orders in the platform 
// router.get('/', order_controller.all);

//  create and order
router.post('/:cust/create', order_controller.create);

// returns details of a particular order
router.get('/:id', order_controller.details);

// update and order
router.put('/:id', order_controller.update);

// delete and order 
router.delete('/:id', order_controller.delete);

/*****     TODO ****
	1. Add routes for querrying all orders for a particular date range
	2. Add routes for querrying all orders for a particular product.
	3. Add routes for querrying all orders for a particulare customer.
	order.
		.find({ customer : customer._id })
		.exec(function (err, stories) {
		  if (err) return handleError(err);
		  // returns all stories that have Bob's id as their author.
		});

	4. Add routes for querrying top ordered products.


	//Add functionality for archiving treated orders. so they can leeave the order list.
*/

module.exports = router;