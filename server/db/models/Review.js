const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Review;
