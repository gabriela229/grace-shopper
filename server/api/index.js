const api = require('express').Router();

api.use('/products', require('./products'));
api.use('/categories', require('./categories'));
api.use('/user', require('./user'));
api.use('/auth', require('./auth'));


api.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

module.exports = api;
