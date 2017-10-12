const express = require('express');
const Order = require('../db/models/Order');

const router = express.Router();

// add item to cart
router.post('/:id/lineItems', (req, res, next) => {
});

// remove item from cart
router.delete('/:orderId/lineItems/:id', (req, res, next) => {
});

// close cart (cart --> order)
router.put('/:id', (req, res, next) => {
});

// get cart
router.get('/:userId', (req, res, next) => {
    if(+req.params.userId === 0) {
        return res.send(Order.build())
    }
    Order.findAll()
        .then(orders => res.send(orders))
        .catch(next);
});

module.exports = router;