const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please provide a name.'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'This email is already in use.'
    },
    validate: {
      notEmpty: {
        msg: 'Please provide an email'
      },
      isEmail: {
        msg: 'Please provide a valid email'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please provide a password.'
      }
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
  const {email, password} = credentials;
  if (!credentials.email || !credentials.password){
    throw createError('Please complete all fields');
  }
  return this.findOne({
    where: {
      email
    }
  })
  .then( user => {
    return bcrypt.compare(password, user.password)
    .then( (res) => {
      if (!res){
        throw createError('Invalid credentials');
      }
      return user;
    });
  });
};

module.exports = User;
