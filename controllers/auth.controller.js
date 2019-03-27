// AuthController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// var User = require('../user/User');


var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');


const Customer = require('../models/Customer');


// router.post('/register', function(req, res) {
  
//   var hashedPassword = bcrypt.hashSync(req.body.password, 8);
//   exports.create = function (req, res) {
//     let customer = new Customer(
//         {
//             name: req.body.name,
//             phone: req.body.phone,
//             email: req.body.email,
//             password: hashedPassword,
//             image: req.body.image,
//             updateAt: req.body.updateAt
//         }
//     );

//     customer.save(function (err, customer) {
//         if (err) {
//             res.status(500, 'The is a problem creating your account').send(err);
//         }
//         var token = jwt.sign({ id: customer._id }, config.secret, {
// 	      expiresIn: 86400 // expires in 24 hours
// 	    });
//         res.status(200).send({ auth: true, token: token })
//     });
// }; 
// });



exports.register = function (req, res) {
	    // res.send('Greetings from the Test controller!');

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let customer = new Customer(
        {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPassword,
            image: req.body.image,
            updateAt: req.body.updateAt
        }
    );
	    // res.send('Greetings from the Test controller!'+hashedPassword);

    customer.save(function (err, customer) {
        if (err) {
            res.status(500, 'The is a problem creating your account').send(err);
        }
        var token = jwt.sign({ id: customer._id }, config.secret, {
	      expiresIn: 86400 // expires in 24 hours
	    });
        res.status(200).send({ auth: true, token: token })
    });
}; 




exports.me = function (req, res, next) {

 //    var token = req.headers['x-access-token'];
 //  if (!token)
 //  	return res.status(401).send({ auth: false, message: 'No token provided.' });
  
 //  	jwt.verify(token, config.secret, function(err, decoded) {
 //    if (err) 
 //    	return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
 //    Customer.findById(decoded.id, 
	//   { password: 0 }, // projection
	//   function (err, user) {
	//     if (err) return res.status(500).send("There was a problem finding the customer.");
	//     if (!user) return res.status(404).send("No customer found.");

	//     res.status(200).send(user);
	// });
 //  });

   Customer.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
};




exports.login =  function(req, res) {
  Customer.findOne({ phone: req.body.phone }, function (err, user) {
    if (err) 
    	return res.status(500).send('Error on the server.');
    if (!user)
    	return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
    	return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
};