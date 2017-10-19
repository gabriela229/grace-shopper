const express = require('express');
const Order = require('../db/models/Order');

const router = express.Router();

// add item to cart
router.post('/:id/lineItems', (req, res, next) => {
    Order.addProductToCart(req.params.id, req.body.productId)
        .then(order => {
            res.sendStatus(204);
        });
});

// remove item from cart
router.delete('/:orderId/lineItems/:id', (req, res, next) => {
});

// close cart (cart --> order)
router.put('/:id', (req, res, next) => {
});

// get cart
router.get('/getCart', (req, res, next) => {
    if (!req.session.userId){
        res.send({lineItems: []});
    } else {
        Order.getCart(req.session.userId)
            .then(cart => res.send(cart));
    }
});

module.exports = router;
