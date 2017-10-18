const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');

const createError = (message) => {
  const error = new Error(message);
  error.status = 401;
  return error;
};

function saltPassword(user){
  return bcrypt.genSalt(10)
  .then( salt => {
    return bcrypt.hash(user.password, salt);
  })
  .then( hash => {
      user.password = hash;
      user.save();
  });
}

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
  passwordExpired: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      saltPassword(user);
    }
  }
});


User.findBySessionId = function(id){
  // if (!id){
  //   throw createError('No user found');
  // }
  return this.findById(id);
};

User.prototype.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
  .then( (res) => {
    if (!res){
      throw createError('Invalid credentials');
    }
    return this;
  });
};

User.prototype.checkNewPasswords = function(newPassword, newPasswordCheck){
  if (newPassword === newPasswordCheck) {
    this.password = newPassword;
    this.passwordExpired = false;
    saltPassword(this);
    this.save();
    return this;
  } else {
    throw createError('New password fields do not match');
  }
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
    return user.validatePassword(password);
  });
};

module.exports = User;
