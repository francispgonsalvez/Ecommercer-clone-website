const express = require('express');
const { createCheckoutSession, retrieveCheckoutSession } = require('../controller/paymentController');
const router = express.Router();

router.route('/checkout-session').post(createCheckoutSession);
router.route('/retrive-checkout-session/:id/:userId').get(retrieveCheckoutSession);

module.exports = router;