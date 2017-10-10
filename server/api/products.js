const express = require('express');
const Product = require('../db/models/Product');

// This router is already mounted on /messages in server/app.js
const router = express.Router();

// get all products
router.get('/', (req, res, next)=>{
    Product.findAll()
    .then(products=> res.send(products))
    .catch(next);
});

// get a product
router.get('/:id', (req, res, next)=>{
    Product.findById(req.params.id)
        .then(product=> res.send(product))
        .catch(next);
});

// create a product
router.post("/", (req, res, next)=> {
    // const {title, description, quantity, price} = req.body;
    Product.create(req.body)
        .then(product=> res.status(200).send(product))
        .catch(next);
})

// update a product
router.put('/:id', (req, res, next)=> {
    const {quantity, price} = req.body;     // what do we want to update? may be price or quantity or both
    Product.findById(req.params.id)
        .then(product=> {
            return product.update({price, quantity});
        })
        .then( product=> res.status(200).send(product))
        .catch(next);
})

// delete a product
router.delete('/:id', (req, res, next)=> {
    Product.findById(req.params.id)
        .then(product=> product.destroy())
        .then( ()=> res.status(200).send())
        .catch(next);
})

module.exports = router;