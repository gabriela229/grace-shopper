const api = require('express').Router();

api.use('/auth', require('./auth'));
api.use('/categories', require('./categories'));
api.use('/orders', require('./orders'));
api.use('/products', require('./products'));
api.use('/reviews', require('./reviews'));
api.use('/user', require('./user'));

api.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

module.exports = api;
