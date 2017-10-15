const express = require('express');
const User = require('../db/models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    User.findAll()
    .then(users => res.send(users))
    .catch(next);
});


router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next);
});

router.post('/', (req, res, next) => {
    bcrypt.genSalt(10)
        .then( salt => bcrypt.hash(req.body.password, salt))
        .then( hash => {
            req.body.password = hash;
            return User.create(req.body);
        })
        .then(user => res.status(200).send(user))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            return user.update(req.body);
        })
        .then( updatedUser => res.status(200).send(updatedUser))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.destroy())
        .then( ()=> res.status(200).send())
        .catch(next);
});

module.exports = router;
