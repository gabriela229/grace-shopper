import express from 'express';
const Category = require('./db/models/Category');
const Product = require('./db/models/Product');

// This router is already mounted on /messages in server/app.js
const router = express.Router();

// get all categories
router.get('/', (req, res, next)=>{
    Category.findAll({include: [{all: true}]})
    .then(categories=> res.send(categories))
    .catch(next);
});

// get a category
router.get('/:id', (req, res, next)=>{
    Category.findOne({
            where : {
                id : req.params.id
            },
            include: [{all : true}]
        })
        .then(category=> res.send(category))
        .catch(next);
});

// create a category
router.post('/', (req, res, next)=> {
    Category.create(req.body)
        .then(category=> res.status(201).send(category))
})

// delete a category        // we might not need it
router.delete('/:id', (req, res, next)=> {
    Category.findById(req.params.id)
        .then(category=> category.destroy())
        .then( ()=> res.status(200).send())
        .catch(next);
})

export default router;