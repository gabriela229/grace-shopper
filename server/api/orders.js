const express = require('express');
const Order = require('../db/models/Order');

const router = express.Router();

// update line item
router.post('/:id/lineItems', (req, res, next) => {
    Order.updateLineItem(req.params.id, req.body.quantity, req.body.productId)
        .then(order => {
            res.sendStatus(204);
        });
});

// close cart (cart --> order)
router.put('/:id', (req, res, next) => {
});

// get cart
router.get('/getCart', (req, res, next) => {
    if (typeof req.session.userId === 'undefined'){
        res.send({lineItems: []});
    } else {
        Order.getCart(req.session.userId)
            .then(cart => res.send(cart));
    }
});

module.exports = router;
