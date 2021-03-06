const express = require('express');
const Product = require('../db/models/Product');

const router = express.Router();

// get all products (and reviews + users)
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

// get a product
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

// create a product
router.post('/', (req, res, next) => {
  // const {title, description, quantity, price} = req.body;
  Product.create(req.body)
    .then(product => res.status(200).send(product))
    .catch(next);
});

// update a product
router.put('/:id', (req, res, next) => {
  const { images } = req.body;
  Product.findById(req.params.id)
    .then(product => {
      return product.update({ image: images });
    })
    .then(product => {
      return res.status(200).send(product)
    })
    .catch(next);
});

// delete a product
router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.status(200).send())
    .catch(next);
});

module.exports = router;
