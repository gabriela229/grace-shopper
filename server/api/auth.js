const express = require('express');
const User = require('../db/models/User');
const router = express.Router();

router.get('/', (req, res, next) => {
    User.findBySessionId(req.session.userId)
      .then(user => res.send(user))
      .catch(next);
});

router.delete('/', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

router.post('/', (req, res, next) => {
  const credentials = req.body;
  User.login(credentials)
    .then(user => {
      req.session.userId = user.id;
      res.send(user);
    })
    .catch(next);
});


module.exports = router;
