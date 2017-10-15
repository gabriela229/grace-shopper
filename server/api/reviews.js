const express = require('express');
const Review = require('../db/models/Review');

const router = express.Router();

// get all reviews (and products + users (aliased as reviewers))
router.get('/', (req, res, next) => {
  Review.findAll({ include: [{ all: true }] })
    .then(reviews => res.send(reviews))
    .catch(next);
});

// get a review by ReviewId
router.get('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => res.send(review))
    .catch(next);
});

// // get reviews for a Product by ProductId
// router.get('/:productId', (req, res, next) => {
//   Review.getReviewsForProduct(req.params.productId)
//     .then(reviews => res.send(reviews))
//     .catch(next);
// });

// // get reviews for a User by UserId
// router.get('/:userId', (req, res, next) => {
//   Review.getReviewsForUser(req.params.userId)
//     .then(reviews => res.send(reviews))
//     .catch(next);
// });

// create a review
router.post('/', (req, res, next) => {
  // const {content, isVerified} = req.body;
  Review.create(req.body)
    .then(review => res.status(200).send(review))
    .catch(next);
});

// update a review (?)
router.put('/:id', (req, res, next) => {
  const {content, isVerified} = req.body;
  Review.findById(req.params.id)
    .then(review => {
      return review.update({content, isVerified});
    })
    .then(review => res.status(200).send(review))
    .catch(next);
});

// delete a review
router.delete('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.destroy())
    .then(() => res.status(200).send())
    .catch(next);
});

module.exports = router;
