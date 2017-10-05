const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api/products', productsRouter);

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, './index.html')));

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});



app.listen(process.env.PORT || 3000);
