const express = require('express');
const { adminRegister, loginAdmin } = require('../controller/adminController');
const router = express.Router();

router.route('/register').post(adminRegister);
router.route('/login').post(loginAdmin);


module.exports = router;