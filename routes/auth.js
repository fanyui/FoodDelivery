const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const auth_controller = require('../controllers/auth.controller');
// var VerifyToken = require('../controllers/VerifyToken')
// router.use(VerifyToken)


// a simple test url to check that all of our files are communicating correctly.
router.get('/', auth_controller.me);
router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);

module.exports = router;
