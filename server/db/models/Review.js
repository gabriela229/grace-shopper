const Sequelize = require('sequelize');
const db = require('../db');

// const Product = require('./Product');
// const User = require('./User');

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [5, 500],
      msg: 'Your review must be AT LEAST 5 characters, and NO MORE than 500 characters.'
    }
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Review.getReviewsForProduct = function(productId) {
  return Review.getProducts({
    where: { productId: productId }
  })
    .then(reviews => {
      return reviews;
    });
};

// Review.getReviewsForUser = function(userId) {
//   return Review.getUsers({
//     where: { userId: userId }
//   })
//     .then(reviews => {
//       console.log("getReviewsForUser: reviews = ", reviews);
//       return reviews;
//     });
// };

module.exports = Review;
