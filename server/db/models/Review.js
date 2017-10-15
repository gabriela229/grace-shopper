const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
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
