const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const createError = (message) => {
  const error = new Error(message);
  error.status = 401;
  return error;
};

User.findBySessionId = function(id){
  // if (!id){
  //   throw createError('No user found');
  // }
  return this.findById(id);
};

User.login = function(credentials){
  if (!credentials.email || !credentials.password){
    throw createError('Please complete all fields');
  }
  return this.findOne({
    where: credentials
  })
    .then( user => {
      if (!user){
        throw createError('Invalid credentials');
      }
      return user;
    });
};

module.exports = User;
