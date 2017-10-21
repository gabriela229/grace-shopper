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
    if (!req.session.userId){
        res.send({lineItems: []});
    } else {
        Order.getCart(req.session.userId)
            .then(cart => res.send(cart));
    }
});

router.get('/', (req, res, next) => {
    Order.findAll({
        where: {
            isCart: false
        },
        include: [{all: true, nested: true}]
    })
    .then(orders => res.send(orders))
    .catch(next);
});

module.exports = router;
