const express = require('express');
const Review = require('../db/models/Review');

const router = express.Router();

// get all reviews (and products + users)
router.get('/', (req, res, next) => {
  Review.findAll({ include: [{ all: true }] })
    .then(reviews => res.send(reviews))
    .catch(next);
});

// create a review
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(200).send(review))
    .catch(next);
});

module.exports = router;
