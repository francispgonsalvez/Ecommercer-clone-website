const express = require('express');
const { addToCart, removeFromCart, getUserBuyingCarts, updateQuantity } = require('../controller/cartController');
const router = express.Router();

router.route('/').post(addToCart);
router.route('/:userId/:productId').delete(removeFromCart);
router.route('/:id').get(getUserBuyingCarts);
router.route("/:userId/:productId").put(updateQuantity);

module.exports = router;