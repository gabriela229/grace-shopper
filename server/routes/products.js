import express from 'express';
import db from '../models';       //  models/index which exports 
const Product = db.model('product');

// This router is already mounted on /users in server/app.js
const router = express.Router();

// give all products
router.get('/', (req, res, next)=>{
    Product.findAll()
        .then(products=> res.send(products))
        .catch(next);
});

// give a product
router.get('/:id', (req, res, next)=>{
    Product.findById(req.params.id)
        .then(product=> res.send(product))
        .catch(next);
});

/*
* Product
* Must have title, description, price, and inventory quantity
* Must belong to at least one category
* If there is no photo, there must be a placeholder photo used
*/
// create a product
router.post('/', (req, res, next)=> {
    const {title, description, price, inventoryQuantity} = req.body;
    if(title && description && price && inventoryQuantity){
        Product.create(req.body)
            .then(product=> res.send(product))
            .catch(next);
    }
});

// update a product
router.put('/:id', (req, res, next)=> {
    // what will we update?   
    // may be price or quantity or both
    const {price, quantity} = req.body;
    Product.findById(req.params.id)
        .then(product=> {
            if(product){
                if(price && quantity){
                    return product.update({
                        price, quantity
                    })
                }
                else if(price){
                    return product.update({price})
                }
                else if(quantity){
                    return product.update({quantity})
                }
            }
        })
        .catch(next);
    
})

export default router;