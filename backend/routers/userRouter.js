const express = require('express');
const { usersRegister, loginUser, getUser } = require('../controller/userController');
const router = express.Router();

router.route('/register').post(usersRegister);
router.route('/login').post(loginUser);
router.route('/').get(getUser);

module.exports = router;