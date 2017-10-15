const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  content: {
    type: Sequelize.STRING,
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

module.exports = Review;
