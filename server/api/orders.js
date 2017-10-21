const express = require('express');
const Order = require('../db/models/Order');
const nodemailer = require('nodemailer');
require('dotenv').config();   // process.env now available 

const router = express.Router();

// update line item
router.post('/:id/lineItems', (req, res, next) => {
    Order.updateLineItem(req.params.id, req.body.quantity, req.body.productId)
        .then(order => {
            res.sendStatus(204);
        });
});

// close cart (cart --> order)
router.put('/:id', (req, res, next) => {
});

/*
// will be useful to set up on gmail and password as system env variable
heroku config:set GITHUB_USERNAME=joesmith
Adding config vars and restarting myapp... done, v12
GITHUB_USERNAME: joesmith

$ heroku config
GITHUB_USERNAME: joesmith
OTHER_VAR:    production

$ heroku config:get GITHUB_USERNAME
joesmith

$ heroku config:unset GITHUB_USERNAME
Unsetting GITHUB_USERNAME and restarting myapp... done, v13
create reusable transporter object using the default SMTP transport
*/
let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.AUNG_GMAIL,
        pass: process.env.AUNG_GMAIL_PASSWORD
    }
});

// for non-log-in user order
router.post('/', (req, res, next) => {
    const { customerInfo, lineItems,  } = req.body;
    const { email } = customerInfo;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.AUNG_GMAIL,
            pass: process.env.AUNG_GMAIL_PASSWORD
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Amazing donuts makers team 👻" <eaungkyawching@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Order confirmation', // Subject line
        text: `Hello ${customerInfo.firstName}, 
            Thanks for buying our products. You have ordered ${lineItems.reduce((total, item) => { return total + item.quantity; }, 0)} donuts.
            Best,
            Your delicious donuts makers!!`,
        // html: `<b></b>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("Email has been sent to", mailOptions.to);
            res.sendStatus(201);
        }
    });
})

// get cart
router.get('/getCart', (req, res, next) => {
    if (!req.session.userId) {
        res.send({ lineItems: [] });
    } else {
        Order.getCart(req.session.userId)
            .then(cart => res.send(cart));
    }
});

module.exports = router;
